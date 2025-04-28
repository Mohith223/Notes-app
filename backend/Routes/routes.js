// Notes-app/backend/routes/routes.js
import express from 'express'
import { Notes } from '../NotesModel/model.js'

const router = express.Router()

// Create a new note
router.post('/', async (req, resp) => {
  try {
    const { topic, status, notes } = req.body
    if (!topic || !status || !notes) {
      return resp.status(400).json({ message: 'Enter all details!' })
    }
    const saved = await Notes.create({ topic, status, notes })
    return resp.status(201).json(saved)
  } catch (error) {
    console.error(error)
    return resp.status(500).json({ message: error.message })
  }
})

// Get all notes
router.get('/', async (req, resp) => {
  try {
    const all = await Notes.find({})
    return resp.status(200).json({ count: all.length, data: all })
  } catch (error) {
    console.error(error)
    return resp.status(400).json({ message: error.message })
  }
})

// Get one note
router.get('/:id', async (req, resp) => {
  try {
    const note = await Notes.findById(req.params.id)
    return resp.status(200).json(note)
  } catch (error) {
    console.error(error)
    return resp.status(500).json({ message: error.message })
  }
})

// Update a note
router.put('/:id', async (req, resp) => {
  try {
    const { topic, status, notes } = req.body
    if (!topic || !status || !notes) {
      return resp.status(400).json({ message: 'Send all the required details!' })
    }
    const updated = await Notes.findByIdAndUpdate(
      req.params.id,
      { topic, status, notes },
      { new: true }
    )
    if (!updated) {
      return resp.status(404).json({ message: 'Note not found!' })
    }
    return resp.status(200).json({ message: 'Note updated successfully', updated })
  } catch (error) {
    console.error(error)
    return resp.status(500).json({ message: error.message })
  }
})

// Bulk-delete notes
// DELETE /notes/bulk
// Body: { ids: ['<id1>', '<id2>', …] }
router.delete('/bulk', async (req, resp) => {
  try {
    const { ids } = req.body
    if (!Array.isArray(ids) || ids.length === 0) {
      return resp.status(400).json({ message: 'No IDs provided for deletion' })
    }
    const result = await Notes.deleteMany({ _id: { $in: ids } })
    return resp.status(200).json({ deleted: result.deletedCount })
  } catch (error) {
    console.error('Bulk delete failed:', error)
    return resp.status(500).json({ message: 'Bulk delete failed', error: error.message })
  }
})

// Delete one note
router.delete('/:id', async (req, resp) => {
  try {
    const deleted = await Notes.findByIdAndDelete(req.params.id)
    if (!deleted) {
      return resp.status(404).json({ message: 'Note could not be deleted!' })
    }
    return resp.status(200).json({ message: 'Note deleted successfully!' })
  } catch (error) {
    console.error(error)
    return resp.status(500).json({ message: error.message })
  }
})

export default router
