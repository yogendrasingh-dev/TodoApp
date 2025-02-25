import { Router } from 'express';
import { create, getAllNotes, getSingleNote, removeSingleNote, updateNote } from '../controllers/note';

const router = Router();

router.post('/create', create);

router.patch('/:noteId', updateNote);

router.delete('/:noteId', removeSingleNote);

router.get('/', getAllNotes);

router.get('/:id', getSingleNote);

export default router;
