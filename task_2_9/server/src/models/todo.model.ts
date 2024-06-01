import mongoose, { Schema } from "mongoose";

const ToDo = new Schema({
  isDone: {
    type: Boolean,
    default: false,
  },
  text: String,
});

export default mongoose.model("Todo", ToDo);
