import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tour } from './schemas/tour.schema';

@Injectable()
export class ToursService {
  constructor(@InjectModel(Tour.name) private tourModel: Model<Tour>) {}

  async findAll(): Promise<Tour[]> {
    return this.tourModel.find().exec();
  }

  async findOne(id: string): Promise<Tour> {
    const tour = await this.tourModel.findById(id);
    if (!tour) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'No tour found with that id!',
      });
    }
    return tour;
  }
}
