import { Application } from 'egg';

export default (app: Application) => {
  const { mongoose } = app;
  const { Schema } = mongoose;

  const examInfo = new Schema({
    _id: String,
    data: {
      first1: Array,
      first2: Array,
      second: Array,
      third: Array,
    },
  });

  return mongoose.model('ExamInfo', examInfo);
};
