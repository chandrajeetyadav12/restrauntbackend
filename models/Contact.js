const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },

    phone: {
      type: String,
      required: true,
      trim: true,
      match: [/^[0-9]{10,15}$/, "Invalid phone number"],
    },

    subject: {
      type: String,
      required: true,
      enum: [
        "complain",
        "greetings",
        "date",
        "price",
        "order"
      ], // dropdown options for Next.js
    },

    message: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 5000,
    },

    acceptTerms: {
      type: Boolean,
      required: true,  // checkbox must be ticked
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);
