import { Application } from 'egg';

export default (app: Application) => {
  const { mongoose } = app;
  const { Schema } = mongoose;

  const major = new Schema({
    name: String,
    children: [{ name: String }],
  });

  return mongoose.model('Major', major);
};
