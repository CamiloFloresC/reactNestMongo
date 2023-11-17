import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Application } from './applications.schemas';

@Schema({
  timestamps: true,
})
export class Group {
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

  @Prop({ type: [mongoose.Types.ObjectId], ref: 'Application' })
  applications: Application[];
}

export const GroupSchema = SchemaFactory.createForClass(Group);
