import createHttpError from 'http-errors';
import { Note } from '../models/note.js';

const applyFilters = (query, { tag, search }) => {
  if (tag) {
    query = query.where({ tag });
  }

  if (search) {
    query = query.where({
      $or: [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
      ],
    });
  }

  return query;
};

export const getAllNotes = async (req, res, next) => {
  try {
    const { page, perPage, tag, search } = req.query;

    const notesQuery = applyFilters(Note.find(), { tag, search });
    const countQuery = applyFilters(Note.countDocuments(), { tag, search });

    const [notes, totalNotes] = await Promise.all([
      notesQuery
        .skip((page - 1) * perPage)
        .limit(perPage),
      countQuery,
    ]);

    const totalPages = Math.ceil(totalNotes / perPage);

    res.status(200).json({
      page,
      perPage,
      totalNotes,
      totalPages,
      notes,
    });
  } catch (error) {
    next(error);
  }
};

export const getNoteById = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.noteId);

    if (!note) {
      throw createHttpError(404, 'Note not found');
    }

    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

export const createNote = async (req, res, next) => {
  try {
    const note = await Note.create(req.body);
    res.status(201).json(note);
  } catch (error) {
    next(error);
  }
};

export const deleteNote = async (req, res, next) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.noteId);

    if (!note) {
      throw createHttpError(404, 'Note not found');
    }

    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

export const updateNote = async (req, res, next) => {
  try {
    const note = await Note.findByIdAndUpdate(req.params.noteId, req.body, {
      returnDocument: 'after',
      runValidators: true,
    });

    if (!note) {
      throw createHttpError(404, 'Note not found');
    }

    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};
