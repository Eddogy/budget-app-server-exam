const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Schema
const userSchema = mongoose.Schema(
  {
    firstname: {
      required: [true, "First name is required"],
      type: String,
    },
    lastname: {
      required: [true, "Last name is required"],
      type: String,
    },
    email: {
      required: [true, "Email is required"],
      type: String,
    },
    password: {
      required: [true, "Password is required"],
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password
userSchema.pre('save', async function(next) {
  if(!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password =  await bcrypt.hash(this.password, salt);
  next();
  // A salt is a random string that makes the hash unpredictable
  // https://heynode.com/blog/2020-04/salt-and-hash-passwords-bcrypt/
})

// Verify passwords
userSchema.methods.isPasswordMatch = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
  // Comparing the entered password with the hash password
}

// Compile schema into model
const User = mongoose.model("User", userSchema);
module.exports = User;