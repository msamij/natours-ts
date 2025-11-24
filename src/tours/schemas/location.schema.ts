import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Location {
  @Prop({ type: String, default: 'Point', enum: ['Point'] })
  type: string;

  @Prop([Number])
  coordinates: number[];

  @Prop()
  address: string;

  @Prop()
  day: number;
}

export const LocationSchema = SchemaFactory.createForClass(Location);
