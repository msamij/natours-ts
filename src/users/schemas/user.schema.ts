import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import crypto from 'crypto';
import mongoose, { HydratedDocument } from 'mongoose';
import bcrypt from 'node_modules/bcryptjs';
import validator from 'validator';

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ required: [true, 'Please tell us your name'] })
  name: string;

  @Prop({
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  })
  email: string;

  @Prop()
  photo: string;

  @Prop({
    type: String,
    enum: ['user', 'guide', 'lead-guide', 'admin'],
    default: 'user',
  })
  role: string;

  @Prop({
    type: String,
    select: false,
    minLength: 8,
    required: [true, 'Please provide a password'],
  })
  password: string;

  @Prop({
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function (val: string) {
        return this.password === val;
      },
      message: 'Passwords are not the same!',
    },
  })
  passwordConfirm: string;

  @Prop({ type: Date, select: false })
  passwordChangedAt: Date;

  @Prop({ type: Date, select: false })
  passwordResetToken: string;

  @Prop({ type: Date, select: false })
  passwordResetExpires: Date;

  @Prop({
    type: Boolean,
    default: true,
    select: false,
  })
  active: boolean;

  async correctedPassword(candidatePassword: string, userPassword: string): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, userPassword);
  }

  changedPasswordAt(JWTTimestamp: number): boolean {
    if (this.passwordChangedAt) {
      const changedTimestamp = parseInt((this.passwordChangedAt.getTime() / 1000).toString(), 10);
      return JWTTimestamp < changedTimestamp;
    }
    return false;
  }

  createPasswordResetToken(): string {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetExpires = (Date.now() + 10 * 60 * 1000) as unknown as Date;
    return resetToken;
  }
}

export const UserSchema = SchemaFactory.createForClass(User);

type UserDocument = HydratedDocument<User>;
type UserQueryContext = mongoose.Query<any, any, UserDocument>;

UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();
  this.passwordConfirm = undefined as unknown as string;
  next();
});

UserSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = (Date.now() - 1000) as unknown as Date;
  next();
});

UserSchema.pre<UserQueryContext>(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});
