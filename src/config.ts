import * as dotenv from 'dotenv';

dotenv.config();

export const config = {
  server: {
    port: parseInt(process.env.PORT || '3000', 10),
    nodeEnv: process.env.NODE_ENV || 'development',
  },
  dataSource: {
    dummyjsonApiUrl: process.env.DUMMYJSON_API_URL || 'https://dummyjson.com',
    productId: parseInt(process.env.DUMMYJSON_PRODUCT_ID || '1', 10),
  },
  logging: {
    level: process.env.LOG_LEVEL || 'info',
  },
};
