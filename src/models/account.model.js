import mongoose from "mongoose";

const accountSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    status: {
      type: String,
      enum: {
        values: ["ACTIVE", "FROZEN", "CLOSED"],
        message: "Status can be either ACTIVE, FROZEN or CLOSED",
      },
      default: "ACTIVE",
    },

    currency: {
      type: String,
      required: true,
      default: "INR",
    },
  },
  { timestamps: true }
);

const Account = mongoose.model("Account", accountSchema);

export default Account;