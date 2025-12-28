// export const getAllNotes = (req, res) => {
//   res.status(200).send("You just fetched the notes");
// };

import Note from "../models/Note.js";

// normal function

export async function getAllNotes(_, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 }); // -1 will sort in desc. order (newest first)
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getAllNotes controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getNoteById(req, res) {
  try {
    const noteId = req.params.id;
    const note = await Note.findById(noteId);
    if (!note) return res.status(404).json({ message: "note not found.." });

    res.status(200).json({ note });
  } catch (error) {
    console.error("Error in finding the note in getNoteById controller", error);
    res
      .status(500)
      .json({ message: "Internal server error in finding the note" });
  }
}

export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    // console.log(title, content); //you can't access these value without middleware app.use(express.json()) -- this one
    // const newNote = new Note({ title: title, content: content }); //we are making new content and by making a new note by calling the modle like objects and classes in java
    const note = new Note({ title, content }); //since the key and value are the same that's why we are not doing title: title

    // await newNote.save();
    const savedNote = await note.save();

    res.status(201).json(savedNote);
  } catch (error) {
    console.error("Error in creating new note", error);
    res.status(500).json({ message: "Internal server error 😔" });
  }
}
export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(updatedNote);
  } catch (error) {
    console.error("Error in updating controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
export async function deleteNote(req, res) {
  try {
    const { title, content } = req.body;
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deleteNote) return res.status(404).json({ message: "Note not found" });
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error(
      "Error in deleteing the node in delete noteController",
      error
    );
    res
      .status(500)
      .json({ message: "Internal server error in deleting the node " });
  }
}
