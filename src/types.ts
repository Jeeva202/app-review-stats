export interface DummyJsonComment {
  id: number;
  body: string;
  postId?: number;
  likes?: number;
  user?: {
    id: number;
    username: string;
  };
}

export interface Review {
  id: number | string;
  body: string;
  user: string;
  rating: number; // 1-5
  createdAt: string; // ISO timestamp
}

export interface ReviewStats {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    [key: number]: number;
  };
}

export interface CommentCreateRequest {
  body: string;
  user: string;
  rating: number;
}

export interface CommentCreateResponse {
  success: boolean;
  message: string;
  data?: Review;
}
