import { Router, Request, Response, NextFunction } from 'express';
import { reviewService } from '../services/reviewService';
import { CommentCreateRequest } from '../types';
import { logger } from '../utils/logger';

const router = Router();

/**
 * GET /api/reviews/stats
 * Returns comprehensive review statistics including average rating and distribution
 */
router.get('/stats', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const stats = await reviewService.getReviewStats();
    res.json(stats);
  } catch (error) {
    logger.error('Error in /stats endpoint', error);
    next(error);
  }
});

/**
 * GET /api/reviews/average
 * Returns the average rating across all reviews
 */
router.get('/average', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const averageRating = await reviewService.getAverageRating();
    res.json({ averageRating });
  } catch (error) {
    logger.error('Error in /average endpoint', error);
    next(error);
  }
});

/**
 * GET /api/reviews/latest
 * Returns the 10 most recent comments with their ratings
 * Query parameter: limit (optional, default: 10)
 */
router.get('/latest', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const limit = Math.min(Math.max(1, parseInt(req.query.limit as string) || 10), 100); // Limit between 1-100
    const latestComments = await reviewService.getLatestComments(limit);
    res.json({
      count: latestComments.length,
      comments: latestComments,
    });
  } catch (error) {
    logger.error('Error in /latest endpoint', error);
    next(error);
  }
});

/**
 * POST /api/reviews
 * Create a new comment/review
 * Body: { body: string, user: string, rating: number (1-5) }
 */
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body, user, rating } = req.body as CommentCreateRequest;

    // Validate required fields
    if (!body || !user || rating === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: body, user, rating',
      });
    }

    const newComment = await reviewService.addComment({
      body,
      user,
      rating,
    });

    res.status(201).json({
      success: true,
      message: 'Comment created successfully',
      data: newComment,
    });
  } catch (error: any) {
    logger.error('Error in POST /reviews endpoint', error);
    
    // Handle validation errors
    if (error.message.includes('required') || error.message.includes('between')) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    next(error);
  }
});

export default router;
