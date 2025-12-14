import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { createNote, getNotes, getNote, updateNote, deleteNote } from '../controllers/notesControllers.js';

const router = express.Router();

// All routes are protected (require authentication)
router.route('/')
  .post(protect, createNote)   // Create Note
  .get(protect, getNotes);     // Get All Notes for Logged-in User

router.route('/:id')
  .get(protect, getNote)       // Get Note by ID
  .put(protect, updateNote)    // Update Note
  .delete(protect, deleteNote); // Delete Note  

export default router;
