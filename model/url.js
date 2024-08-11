const mongoose = require("mongoose");

mongoose.connect(`mongodb://localhost:27017/custom-URl`).then(() => {
  console.log("Connected to MongoDB successfully");
});

const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      require: true,
      unique: true,
    },

    redirectUrl: {
      type: String,
      require: true,
    },
    visitHistory: [{ timestamp: { type: Number } }],
  },
  { timestamps: true }
);

const URL = mongoose.model("url", urlSchema);

module.exports = URL;
