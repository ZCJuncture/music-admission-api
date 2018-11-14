import { Application } from 'egg';

export default (app: Application) => {
  const { mongoose } = app;
  const { Schema } = mongoose;

  const news = new Schema({
    title: String,
    publisher: String,
    content: String,
    attachments: [{ name: String, url: String }],
    createDate: { type: Date, default: Date.now },
  });

  news.index({ createDate: -1 });

  return mongoose.model('News', news);
};
