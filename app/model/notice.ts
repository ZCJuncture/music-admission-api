import { Application } from 'egg';

export default (app: Application) => {
  const { mongoose } = app;
  const { Schema } = mongoose;
  const { ObjectId } = Schema.Types;

  const notice = new Schema({
    userId: ObjectId,
    content: String,
    publisher: String,
    createDate: { type: Date, default: Date.now },
  });

  notice.index({ userId: 1, createDate: -1 });

  return mongoose.model('Notice', notice);
};
