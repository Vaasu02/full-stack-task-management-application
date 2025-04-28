const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const taskController = require('../controllers/taskController');
const auth = require('../middleware/auth');

// All routes are protected
router.use(auth);

// Get all tasks
router.get('/', taskController.getTasks);

// Create task
router.post(
  '/',
  [
    check('title', 'Title is required').not().isEmpty(),
    check('priority', 'Priority must be low, medium, or high').isIn(['low', 'medium', 'high'])
  ],
  taskController.createTask
);

// Update task
router.put(
  '/:id',
  [
    check('priority', 'Priority must be low, medium, or high').optional().isIn(['low', 'medium', 'high']),
    check('status', 'Status must be active or completed').optional().isIn(['active', 'completed'])
  ],
  taskController.updateTask
);

// Delete task
router.delete('/:id', taskController.deleteTask);

module.exports = router; 