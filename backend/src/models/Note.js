import mongoose from "mongoose";

// 1st step: You need to create a schema
const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } //mongodb deta hai -- createdAt, updatedAt
);

// 2nd step: You would create a model based off of that schema
const Note = mongoose.model("Note", noteSchema);

export default Note;
