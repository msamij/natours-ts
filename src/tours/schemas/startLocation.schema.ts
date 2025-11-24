import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ id: false })
export class StartLocation {
  @Prop({ type: String, enum: ['Point'] })
  type: 'Point';

  @Prop([Number])
  coordinates: number[];

  @Prop()
  address: string;

  @Prop()
  description: string;
}

export const StartLocationSchema = SchemaFactory.createForClass(StartLocation);
