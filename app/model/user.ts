import { Application } from 'egg';

export default (app: Application) => {
  const { mongoose } = app;
  const { Schema } = mongoose;

  const user = new Schema({
    phoneNumber: String,
    password: String,
    submitted: { type: Boolean, default: false },

    name: String,
    sex: String,
    birthday: Date,
    nation: String,
    politics: String,
    hometown: Array,
    school: String,
    provinceExamNo: { type: String, default: '' },
    collegeExamNo: { type: String, default: '' },
    phoneNumber2: String,
    postcode: String,
    address: String,
    receiver: String,
    receiverContact: String,
    family: [{
      name: String,
      relationship: String,
      politics: String,
      company: String,
      phoneNumber: String,
    }],

    credentialType: String,
    credentialNumber: String,
    credentialFile: { type: String, default: '' },
    photoFile: { type: String, default: '' },

    major: Array,
    examInfo: {
      first1: Array,
      first2: Array,
      second: Array,
      third: Array,
    },
  });

  user.index({ phoneNumber: 1 }, { unique: true });

  return mongoose.model('User', user);
};
