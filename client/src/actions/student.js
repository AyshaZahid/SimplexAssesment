import * as types from './index';

// send the request to fetch all students
export const getStudentRequest = () => ({
  type: types.GET_STUDENT_REQUEST,
});

// sending the data to redux store of all students
export const getStudentSuccess = ({ items }) => ({
  type: types.GET_STUDENT_SUCCESS,
  payload: {
    items,
  },
});

// send the request to fetch all assisgned courses
export const getAssignedCoursesRequest = (studentId) => ({
  type: types.GET_ASSIGNED_COURSES_REQUEST,
  payload: {
    studentId,
  },
});

// sending the data to redux store of all assisgned courses
export const getAssignedCoursesSuccess = ({ items }) => ({
  type: types.GET_ASSIGNED_COURSES_SUCCESS,
  payload: {
    items,
  },
});

// send the request to fetch student by id
export const getStudentByIdRequest = (studentId) => ({
  type: types.GET_STUDENT_BY_ID_REQUEST,
  payload: {
    studentId,
  },
});

// sending the data to redux store of the student
export const getStudentByIdSuccess = ({ studentDetails }) => ({
  type: types.GET_STUDENT_BY_ID_SUCCESS,
  payload: {
    studentDetails,
  },
});

export const assignCourseStudentRequest = (data) => ({
  type: types.ASSIGN_COURSE_STUDENT_REQUEST,
  payload: {
    ...data,
  },
});

export const assignCourseStudentSuccess = ({ data }) => ({
  type: types.ASSIGN_COURSE_STUDENT_SUCCESS,
  payload: {
    data,
  },
});
export const createStudentRequest = (data) => ({
  type: types.CREATE_STUDENT_REQUEST,
  payload: {
    ...data,
  },
});

export const createStudentSuccess = ({ data }) => ({
  type: types.CREATE_STUDENT_SUCCESS,
  payload: {
    data,
  },
});

export const updateStudentRequest = ({ studentData, id }) => ({
  type: types.UPDATE_STUDENT_REQUEST,
  payload: {
    studentData,
    id,
  },
});

export const updateStudentSuccess = ({ data }) => ({
  type: types.UPDATE_STUDENT_SUCCESS,
  payload: {
    data,
  },
});

export const deleteAssignedCourseRequest = (assignedCourseId) => ({
  type: types.DELETE_ASSIGNED_COURSE_REQUEST,
  payload: {
    assignedCourseId,
  },
});

export const deleteAssignedCourseSuccess = ({ data }) => ({
  type: types.DELETE_ASSIGNED_COURSE_SUCCESS,
  payload: {
    data,
  },
});

export const deleteStudentRequest = (studentId) => ({
  type: types.DELETE_STUDENT_REQUEST,
  payload: {
    studentId,
  },
});

export const deleteStudentSuccess = ({ data }) => ({
  type: types.DELETE_STUDENT_SUCCESS,
  payload: {
    data,
  },
});

export const studentError = ({ error }) => ({
  type: types.STUDENT_ERROR,
  payload: {
    error,
  },
});

export const clearStudentList = () => ({
  type: types.CLEAR_STUDENT_LIST,
});

export const clearTotalStudents = () => ({
  type: types.CLEAR_TOTAL_STUDENTS,
});

export const clearStudent = () => ({
  type: types.CLEAR_STUDENT,
});

export const clearMessage = () => ({
  type: types.CLEAR_MESSAGE,
});

export const clearError = () => ({
  type: types.CLEAR_ERROR,
});
