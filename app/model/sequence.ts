import { Application } from 'egg';

export default (app: Application) => {
  const { mongoose } = app;
  const { Schema } = mongoose;

  const sequence = new Schema({
    _id: String,
    counter: { type: Number, default: 1 },
  });

  return mongoose.model('Sequence', sequence);
};
