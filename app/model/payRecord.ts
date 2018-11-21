import { Application } from 'egg';

export default (app: Application) => {
  const { mongoose } = app;
  const { Schema } = mongoose;
  const { ObjectId } = Schema.Types;

  const payRecord = new Schema({
    userId: ObjectId,
    itemId: ObjectId,
    paid: { type: Boolean, default: false },

    orders: [{
      _id: String,
      payType: String,
      payAccount: String,
      payDate: Date,
    }],
  });

  payRecord.index({ userId: 1, itemId: 1 }, { unique: true });
  payRecord.index({ 'orders._id': 1 }, { unique: true });

  return mongoose.model('PayRecord', payRecord);
};
