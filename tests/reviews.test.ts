import request from 'supertest';
import app from '../src/server';

describe('Reviews API - Minimal Tests', () => {
  it('GET /api/reviews/stats should return statistics', async () => {
    const response = await request(app).get('/api/reviews/stats').expect(200);
    expect(response.body).toHaveProperty('averageRating');
    expect(response.body).toHaveProperty('totalReviews');
  });

  it('GET /api/reviews/average should return average rating', async () => {
    const response = await request(app).get('/api/reviews/average').expect(200);
    expect(response.body).toHaveProperty('averageRating');
  });

  it('GET /api/reviews/latest should return comments', async () => {
    const response = await request(app).get('/api/reviews/latest').expect(200);
    expect(response.body).toHaveProperty('comments');
    expect(Array.isArray(response.body.comments)).toBe(true);
  });

  it('POST /api/reviews should create comment', async () => {
    const response = await request(app)
      .post('/api/reviews')
      .send({ body: 'Great!', user: 'test', rating: 5 })
      .expect(201);
    expect(response.body).toHaveProperty('success', true);
  });

  it('POST /api/reviews should validate input', async () => {
    const response = await request(app)
      .post('/api/reviews')
      .send({ body: 'Test' })
      .expect(400);
    expect(response.body).toHaveProperty('success', false);
  });
});
