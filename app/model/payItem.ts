import { Application } from 'egg';

export default (app: Application) => {
  const { mongoose } = app;
  const { Schema } = mongoose;

  const payItem = new Schema({
    name: String,
    stage: String,
    amount: Number,
    enabled: Boolean,
  }, { toJSON: { virtuals: true } });

  payItem.virtual('record');

  return mongoose.model('PayItem', payItem);
};
