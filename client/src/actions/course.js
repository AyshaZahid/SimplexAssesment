import * as types from './index';

// send the request to fetch all courses
export const getCourseRequest = () => ({
  type: types.GET_COURSE_REQUEST,
});

// sending the data to redux store of all courses
export const getCourseSuccess = ({ items }) => ({
  type: types.GET_COURSE_SUCCESS,
  payload: {
    items,
  },
});

// send the request to fetch all assisgned students
export const getAssignedStudentsRequest = (studentId) => ({
  type: types.GET_ASSIGNED_STUDENTS_REQUEST,
  payload: {
    studentId,
  },
});

// sending the data to redux store of all assisgned students
export const getAssignedStudentsSuccess = ({ items }) => ({
  type: types.GET_ASSIGNED_STUDENTS_SUCCESS,
  payload: {
    items,
  },
});

// send the request to fetch course by id
export const getCourseByIdRequest = (courseId) => ({
  type: types.GET_COURSE_BY_ID_REQUEST,
  payload: {
    courseId,
  },
});

// sending the data to redux store of the course
export const getCourseByIdSuccess = ({ courseDetails }) => ({
  type: types.GET_COURSE_BY_ID_SUCCESS,
  payload: {
    courseDetails,
  },
});

export const createCourseRequest = (data) => ({
  type: types.CREATE_COURSE_REQUEST,
  payload: {
    ...data,
  },
});

export const createCourseSuccess = ({ data }) => ({
  type: types.CREATE_COURSE_SUCCESS,
  payload: {
    data,
  },
});

export const updateCourseRequest = ({ courseData, id }) => ({
  type: types.UPDATE_COURSE_REQUEST,
  payload: {
    courseData,
    id,
  },
});

export const updateCourseSuccess = ({ data }) => ({
  type: types.UPDATE_COURSE_SUCCESS,
  payload: {
    data,
  },
});

export const deleteAssignedStudentRequest = (assignedStudentId) => ({
  type: types.DELETE_ASSIGNED_STUDENT_REQUEST,
  payload: {
    assignedCourseId: assignedStudentId,
  },
});

export const deleteAssignedStudentSuccess = ({ data }) => ({
  type: types.DELETE_ASSIGNED_STUDENT_SUCCESS,
  payload: {
    data,
  },
});

export const deleteCourseRequest = (courseId) => ({
  type: types.DELETE_COURSE_REQUEST,
  payload: {
    courseId,
  },
});

export const deleteCourseSuccess = ({ data }) => ({
  type: types.DELETE_COURSE_SUCCESS,
  payload: {
    data,
  },
});

export const courseError = ({ error }) => ({
  type: types.COURSE_ERROR,
  payload: {
    error,
  },
});

export const clearCourseList = () => ({
  type: types.CLEAR_COURSE_LIST,
});

export const clearTotalCourses = () => ({
  type: types.CLEAR_TOTAL_COURSES,
});

export const clearCourse = () => ({
  type: types.CLEAR_COURSE,
});

export const clearMessage = () => ({
  type: types.CLEAR_MESSAGE,
});

export const clearError = () => ({
  type: types.CLEAR_ERROR,
});
