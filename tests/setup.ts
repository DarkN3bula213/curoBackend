import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import {config} from 'dotenv';

config({ path: './tests/.env.test' });
let mongo: any;
beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();
  return mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (const collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongo.stop();
});

import dotenv from 'dotenv';
dotenv.config({ path: './tests/.env.test' });

test('MongoDB connects successfully', async () => {
  const connectionState = mongoose.connection.readyState;
  expect(connectionState).toBe(1); // 1 for connected
});
