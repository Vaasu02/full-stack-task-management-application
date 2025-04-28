import { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
  });

  // Get all tasks
  const getTasks = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/tasks');
      setTasks(res.data.data || []);
      setError(null);
    } catch (error) {
      setError(error.response?.data?.error?.message || 'Failed to fetch tasks');
      toast.error('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  // Create task
  const createTask = async (taskData) => {
    try {
      setLoading(true);
      const res = await axios.post('http://localhost:5000/api/tasks', taskData);
      setTasks((prevTasks) => [res.data.data, ...(prevTasks || [])]);
      toast.success('Task created successfully');
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.error?.message || 'Failed to create task');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update task
  const updateTask = async (id, taskData) => {
    try {
      setLoading(true);
      const res = await axios.put(`http://localhost:5000/api/tasks/${id}`, taskData);
      setTasks((prevTasks) =>
        (prevTasks || []).map((task) => (task._id === id ? res.data.data : task))
      );
      toast.success('Task updated successfully');
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.error?.message || 'Failed to update task');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      setTasks((prevTasks) => (prevTasks || []).filter((task) => task._id !== id));
      toast.success('Task deleted successfully');
    } catch (error) {
      toast.error(error.response?.data?.error?.message || 'Failed to delete task');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Filter tasks
  const filteredTasks = (tasks || []).filter((task) => {
    if (filters.status !== 'all' && task.status !== filters.status) {
      return false;
    }
    if (filters.priority !== 'all' && task.priority !== filters.priority) {
      return false;
    }
    return true;
  });

  return (
    <TaskContext.Provider
      value={{
        tasks: filteredTasks,
        loading,
        error,
        filters,
        setFilters,
        getTasks,
        createTask,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
}; 