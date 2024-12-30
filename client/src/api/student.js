import axios from '../utils/axios';

// Get all students
export const getStudent = () => axios.get('/students/getAll');
// Get all assigned  courses

export const getAssignedCourses = ({ studentId }) =>
  axios.get(`/students/courses/get/${studentId}`);

// Create a new student
export const createStudent = (payload) => axios.post('/students', payload);

// Assign course to students
export const assignCourseStudent = (payload) => axios.post('/students/courses/assign', payload);

// Update an existing student by ID
export const updateStudent = ({ studentData, id }) => axios.put(`/students/${id}`, studentData);

// Delete a student by ID
export const deleteStudent = ({ studentId }) => axios.delete(`/students/${studentId}`);

// Delete a assigned course
export const deleteAssignedCourse = ({ assignedCourseId }) =>
  axios.delete(`/students/courses/assign/${assignedCourseId}`);
