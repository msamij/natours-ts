import { Logger as NestLogger } from '@nestjs/common';
import fs from 'fs';
import mongoose from 'mongoose';
import path from 'path';

const DB = process.env.DATABASE_URI as string;

const connectWith = async () => {
  try {
    await mongoose.connect(DB);
    NestLogger.log(`Database connection successfull 🚀`);
  } catch (error) {
    NestLogger.error(`Database connection failed 🚨`, error);
  }
};

const __dirname = path.resolve();

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours.json`, 'utf-8'));

connectWith();
