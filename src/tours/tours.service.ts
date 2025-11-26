import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tour } from './schemas/tour.schema';
import { Model } from 'mongoose';

@Injectable()
export class ToursService {
  constructor(@InjectModel(Tour.name) private tourModel: Model<Tour>) {}

  async findAll(): Promise<Tour[]> {
    return this.tourModel.find().exec();
  }
}
