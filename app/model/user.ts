import { Application } from 'egg';

export default (app: Application) => {
  const { mongoose } = app;
  const { Schema } = mongoose;

  const user = new Schema({
    phoneNumber: { type: String },
    password: { type: String },
  });

  user.index({ phoneNumber: 1 }, { unique: true });

  return mongoose.model('User', user);
};
