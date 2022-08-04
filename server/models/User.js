/* eslint-disable func-names */
/* eslint-disable no-return-await */

// user model
const mongoose = require('mongoose');

const { Schema } = mongoose;

const bcrypt = require('bcrypt');
const Order = require('./Order');

const userSchema = new Schema({
  userType: {
    type: String,
    enum: ['Artist', 'Non-Artist'],
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
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
    unique: true,
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
    required: true,

    validate: {
      validator(value) {
        // https://www.ocpsoft.org/tutorials/regular-expressions/password-regular-expression/
        return /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*?><]).{8,32}$/.test(
          value
        );
      },
      message:
        'Password must be between 8-16 characters and must include at least one character from each of the following categories: uppercase, lowercase, number, special character '
    }
  },
  // https://stackoverflow.com/questions/59410507/date-of-birth-in-mongoose-schema/59410609#59410609
  birthday: {
    type: Date,
    required: true
  },
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  merch: [{ type: Schema.Types.ObjectId, ref: 'Merch' }],
  likedPosts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
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
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
