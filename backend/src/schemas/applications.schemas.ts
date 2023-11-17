import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Application {
  @Prop({
    unique: true,
    required: true,
    trim: true,
  })
  name: string;

  @Prop({
    trim: true,
  })
  description: string;

  @Prop({
    default: false,
  })
  grouped: boolean;
}

export const ApplicationSchema = SchemaFactory.createForClass(Application);
