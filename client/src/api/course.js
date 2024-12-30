import axios from '../utils/axios';

// Get all courses
export const getCourse = () => axios.get('/courses/getAll');

export const getAssignedStudents = ({ studentId }) =>
  axios.get(`/courses/getEnrolledStudents/${studentId}`);

// Create a new course
export const createCourse = (payload) => axios.post('/courses', payload);

// Update an existing course by ID
export const updateCourse = ({ courseData, id }) => axios.put(`/courses/${id}`, courseData);

// Delete a course by ID
export const deleteCourse = ({ courseId }) => axios.delete(`/courses/${courseId}`);

// Delete a assigned student
export const deleteAssignedStudent = ({ assignedCourseId }) =>
  axios.delete(`/students/courses/assign/${assignedCourseId}`);
