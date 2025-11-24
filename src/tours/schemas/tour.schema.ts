import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { StartLocation } from './startLocation.schema';

@Schema({ timestamps: true })
export class Tour {
  @Prop({
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
    trim: true,
    maxlength: [40, 'A tour must have less or equal than 40 characters'],
    minlength: [10, 'A tour more or equal than 10 characters'],
  })
  name: string;

  @Prop()
  slug: string;

  @Prop({ type: String, required: [true, 'A tour must have a duration'] })
  duration: string;

  @Prop({ type: Number, required: [true, 'A tour must have a group size'] })
  maxGroupSize: number;

  @Prop({
    type: String,
    required: [true, 'A tour must have a difficulty'],
    enum: {
      values: ['easy', 'medium', 'difficult'],
      message: 'Difficulty is either: easy, medium or difficult',
    },
  })
  difficulty: string;

  @Prop({
    type: Number,
    default: 4.5,
    min: [1, 'Rating must be above 1.0'],
    max: [5, 'Rating must be below 5.0'],
  })
  ratingsAverage: Number;

  @Prop({ type: Number, default: 0 })
  ratingsQuantity: Number;

  @Prop({ type: Number, required: [true, 'A tour must have a price'] })
  price: Number;

  @Prop({
    type: Number,
    validate: {
      validator: function (val: string) {
        return val < this.price;
      },
      message: 'Discount price ({VALUE}) should be be below regular price.',
    },
  })
  priceDiscount: Number;

  @Prop({
    type: String,
    trim: true,
    required: [true, 'A tour must have a description'],
  })
  summary: string;

  @Prop({ type: String, trim: true })
  description: string;

  @Prop({ type: String, required: [true, 'A tour must have a cover image'] })
  imageCover: string;

  @Prop([String])
  images: string[];

  @Prop({ type: Date, default: Date.now(), select: false })
  createdAt: Date;

  @Prop([Date])
  startDates: Date[];

  @Prop({ type: Boolean, default: false })
  secretTour: boolean;

  @Prop({ type: StartLocation })
  startLocation: StartLocation;
}

export const TourSchema = SchemaFactory.createForClass(Tour);
