const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const bloglistSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    uniqueCaseInsensitive: true,
  },
  bodyText: {
    type: String,
    required: true,
    uniqueCaseInsensitive: true,
  },
  timeframe: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
  },
  comment: [
    {
      content: {
        type: String,
        required: true,
        uniqueCaseInsensitive: true,
      },
      timeframe: {
        type: String,
        required: true,
      },
      likes: {
        type: Number,
      },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
bloglistSchema.plugin(uniqueValidator);

bloglistSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Bloglist = mongoose.model("Bloglist", bloglistSchema);
module.exports = Bloglist;
