import dns from 'node:dns';
import mongoose from 'mongoose';

export const connectMongoDB = async () => {
  try {
    dns.setServers(['8.8.8.8', '8.8.4.4']);

    await mongoose.connect(process.env.MONGO_URL, {
      family: 4,
    });
    console.log('✅ MongoDB connection established successfully');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error.message);
    process.exit(1);
  }
};
