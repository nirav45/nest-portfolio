import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;
@Schema()
export class User {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: false })
  phoneNumber: string;

  @Prop({ required: false })
  name: string;

  @Prop({ required: false, default: false })
  isDeleted: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
