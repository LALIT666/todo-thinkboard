import express from "express";
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
} from "../controllers/notesControllers.js";

const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id", getNoteById);

router.post("/", createNote);

router.put("/:id", updateNote);

router.delete("/:id", deleteNote);

export default router;

// mongodb+srv://laluchaudhary2003_db_user:6bn7b3FfMEOf20vq@cluster0.w0ihu2n.mongodb.net/?appName=Cluster0
