const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
    first_name: {
      type: String,
      required: false,
      default: '',
    },
    last_name: {
      type: String,
      required: false,
      default: '',
    },
    email: {
      type: String,
      required: [true, 'Please enter an email'],
      unique: true,
      validate: [isEmail, 'Please enter a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Please enter a password'],
      minlength: [6, 'Minimum password length is 6 characters'],
    },
    created: { type: Date, default: Date.now },
  }, { collection: 'users' },
);

UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw new Error('Incorrect Email or Password');
  }
  throw new Error('Incorrect Email or Password');
};

module.exports = mongoose.model('User', UserSchema);
