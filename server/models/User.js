// user
const mongoose = require('mongoose');

const { Schema } = mongoose;

const bcrypt = require('bcrypt');
const Order = require('./Order');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    uniqe: true,
    lowercase: true,
    validate: {
      // Custom validation for email https://stackoverflow.com/questions/18022365/mongoose-validate-email-syntax

      validator(value) {
        // eslint-disable-next-line no-useless-escape
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
      },
      message: (props) => `${props.value} is not a valid email.`
    }
  },
  password: {
    type: String,
    required: true
    // find regex for password validation
  },
  orders: [Order.schema]
});

// Set up for pre-save middleware to create a password for user

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// Compare password input with hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  // eslint-disable-next-line no-return-await
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
