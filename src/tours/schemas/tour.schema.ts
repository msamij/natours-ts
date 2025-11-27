import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Location } from './location.schema';
import { StartLocation } from './startLocation.schema';

@Schema({ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })
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

  @Prop({ type: Number, required: [true, 'A tour must have a duration'] })
  duration: number;

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
  ratingsAverage: number;

  @Prop({ type: Number, default: 0 })
  ratingsQuantity: number;

  @Prop({ type: Number, required: [true, 'A tour must have a price'] })
  price: number;

  @Prop({
    type: Number,
    validate: {
      validator: function (val: number) {
        return val < (this as unknown as Tour).price;
      },
      message: 'Discount price ({VALUE}) should be be below regular price.',
    },
  })
  priceDiscount: number;

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

  @Prop([Location])
  location: Location[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  })
  guides: mongoose.Types.ObjectId[];
}

export const TourSchema = SchemaFactory.createForClass(Tour);

TourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});
