const { validationResult } = require('express-validator');
const Task = require('../models/Task');

// Get All Tasks
exports.getTasks = async (req, res) => {
  try {
    const { status, priority } = req.query;
    const query = { userId: req.user._id };

    if (status) query.status = status;
    if (priority) query.priority = priority;

    const tasks = await Task.find(query).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: tasks
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: {
        message: 'Server Error',
        code: 'SERVER_ERROR'
      }
    });
  }
};

// Create Task
exports.createTask = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Validation Error',
          code: 'VALIDATION_ERROR',
          details: errors.array()
        }
      });
    }

    const { title, description, priority } = req.body;

    const task = new Task({
      title,
      description,
      priority,
      userId: req.user._id
    });

    await task.save();

    res.status(201).json({
      success: true,
      data: task
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: {
        message: 'Server Error',
        code: 'SERVER_ERROR'
      }
    });
  }
};

// Update Task
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, priority } = req.body;

    let task = await Task.findById(id);
    
    if (!task) {
      return res.status(404).json({
        success: false,
        error: {
          message: 'Task not found',
          code: 'NOT_FOUND'
        }
      });
    }

    // Check if user owns the task
    if (task.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        error: {
          message: 'Not authorized to update this task',
          code: 'FORBIDDEN'
        }
      });
    }

    // Update task
    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;
    task.priority = priority || task.priority;

    await task.save();

    res.json({
      success: true,
      data: task
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: {
        message: 'Server Error',
        code: 'SERVER_ERROR'
      }
    });
  }
};

// Delete Task
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);
    
    if (!task) {
      return res.status(404).json({
        success: false,
        error: {
          message: 'Task not found',
          code: 'NOT_FOUND'
        }
      });
    }

    // Check if user owns the task
    if (task.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        error: {
          message: 'Not authorized to delete this task',
          code: 'FORBIDDEN'
        }
      });
    }

    await Task.findByIdAndDelete(id);

    res.json({
      success: true,
      data: {
        message: 'Task deleted successfully'
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: {
        message: 'Server Error',
        code: 'SERVER_ERROR'
      }
    });
  }
}; 