import axios, { AxiosInstance } from 'axios';
import { Review, ReviewStats, CommentCreateRequest, DummyJsonComment } from '../types';
import { logger } from '../utils/logger';
import { config } from '../config';


/**
 * ReviewService handles all business logic for review/comment operations
 */
export class ReviewService {
  private client: AxiosInstance;
  private comments: Review[] = [];

  constructor() {
    this.client = axios.create({
      baseURL: config.dataSource.dummyjsonApiUrl,
      timeout: 10000,
    });
  }

  private async getComments(): Promise<Review[]> {
    try {
      if (this.comments.length === 0) {
        await this.fetchCommentsFromApi();
      }
      return this.comments;
    } catch (error) {
      logger.error('Failed to fetch comments', error);
      throw new Error('Unable to fetch comments from data source');
    }
  }

  private async fetchCommentsFromApi(): Promise<void> {
    try {
      const response = await this.client.get('/comments');

      if (response.data && response.data.comments) {
        this.comments = response.data.comments.map(
          (comment: DummyJsonComment, index: number) => ({
            id: comment.id,
            body: comment.body,
            user: comment.user?.username || `User${index}`,
            rating: this.extractRating(comment),
            createdAt: new Date(
              Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
            ).toISOString(),
          })
        );
        logger.info(`Loaded ${this.comments.length} comments from DummyJSON`);
      }
    } catch (error) {
      logger.error('Error fetching comments from API', error);
      throw error;
    }
  }

  private extractRating(comment: DummyJsonComment): number {
    if (comment.likes !== undefined) {
      return Math.max(1, Math.min(5, Math.round(1 + (comment.likes % 4))));
    }
    return Math.floor(Math.random() * 5) + 1;
  }

  /**
   * Get the average rating across all reviews
   */
  async getAverageRating(): Promise<number> {
    try {
      const comments = await this.getComments();
      
      if (comments.length === 0) {
        return 0;
      }

      const totalRating = comments.reduce((sum: number, comment: Review) => sum + comment.rating, 0);
      const average = totalRating / comments.length;

      logger.info(`Calculated average rating: ${average.toFixed(2)}`);
      return parseFloat(average.toFixed(2));
    } catch (error) {
      logger.error('Error calculating average rating', error);
      throw error;
    }
  }

  /**
   * Get the 10 most recent comments with their ratings
   */
  async getLatestComments(limit: number = 10): Promise<Review[]> {
    try {
      const comments = await this.getComments();

      const sorted = [...comments].sort((a, b) => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });

      const latest = sorted.slice(0, limit);
      logger.info(`Retrieved ${latest.length} latest comments`);

      return latest;
    } catch (error) {
      logger.error('Error retrieving latest comments', error);
      throw error;
    }
  }

  /**
   * Add a new comment/review
   */
  async addComment(commentData: CommentCreateRequest): Promise<Review> {
    try {
      // Validate input
      if (!commentData.body || commentData.body.trim().length === 0) {
        throw new Error('Comment body is required');
      }

      if (!commentData.user || commentData.user.trim().length === 0) {
        throw new Error('User is required');
      }

      if (
        !commentData.rating ||
        commentData.rating < 1 ||
        commentData.rating > 5
      ) {
        throw new Error('Rating must be between 1 and 5');
      }

      const newComment: Review = {
        id: this.comments.length + 1,
        body: commentData.body,
        user: commentData.user,
        rating: commentData.rating,
        createdAt: new Date().toISOString(),
      };

      this.comments.unshift(newComment);
      logger.info(`New comment added with ID: ${newComment.id}`);

      return newComment;
    } catch (error) {
      logger.error('Error adding comment', error);
      throw error;
    }
  }

  /**
   * Get comprehensive review statistics
   */
  async getReviewStats(): Promise<ReviewStats> {
    try {
      const comments = await this.getComments();

      if (comments.length === 0) {
        return {
          averageRating: 0,
          totalReviews: 0,
          ratingDistribution: {},
        };
      }

      // Calculate average rating
      const totalRating = comments.reduce((sum: number, comment: Review) => sum + comment.rating, 0);
      const averageRating = parseFloat((totalRating / comments.length).toFixed(2));

      // Calculate rating distribution
      const ratingDistribution: { [key: number]: number } = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
      };

      comments.forEach((comment: Review) => {
        ratingDistribution[comment.rating]++;
      });

      const stats: ReviewStats = {
        averageRating,
        totalReviews: comments.length,
        ratingDistribution,
      };

      logger.info(`Review stats calculated: ${JSON.stringify(stats)}`);
      return stats;
    } catch (error) {
      logger.error('Error calculating review statistics', error);
      throw error;
    }
  }
}

export const reviewService = new ReviewService();
