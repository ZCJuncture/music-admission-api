import { Application } from 'egg';

export default (app: Application) => {
  const { mongoose } = app;
  const { Schema } = mongoose;

  const user = new Schema({
    phoneNumber: String,
    password: String,

    name: String,
    sex: String,
    birthday: Date,
    nation: String,
    politics: String,
    hometown: Array,
    school: String,
    provinceExamNo: String,
    collegeExamNo: String,
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
    credentialFile: String,
    photoFile: String,

    major: Array,
    examInfo: { type: Map, of: Array },
  });

  user.index({ phoneNumber: 1 }, { unique: true });

  return mongoose.model('User', user);
};
