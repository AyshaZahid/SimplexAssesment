import * as types from '../actions';

const INITIAL_STATE = {
  totalStudent: null,
  studentList: null,
  student: null,
  message: null,
  error: null,
  assignedCourses: null,
};

export default function student(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.GET_STUDENT_SUCCESS: {
      return {
        ...state,
        studentList: action.payload.items.students,
        message: null,
        error: null,
      };
    }
    case types.GET_ASSIGNED_COURSES_SUCCESS: {
      return {
        ...state,
        assignedCourses: action.payload.items.student,
        message: null,
        error: null,
      };
    }
    case types.CREATE_STUDENT_SUCCESS: {
      return {
        ...state,
        message: action.payload.data.message,
        error: null,
      };
    }
    case types.ASSIGN_COURSE_STUDENT_SUCCESS: {
      return {
        ...state,
        message: action.payload.data.message,
        error: null,
      };
    }
    case types.UPDATE_STUDENT_SUCCESS: {
      return {
        ...state,
        message: action.payload.data.message,
        error: null,
      };
    }

    case types.DELETE_STUDENT_SUCCESS: {
      return {
        ...state,
        message: action.payload.data.message,
        error: null,
      };
    }
    case types.DELETE_ASSIGNED_COURSE_SUCCESS: {
      return {
        ...state,
        message: action.payload.data.message,
        error: null,
      };
    }

    case types.STUDENT_ERROR: {
      return {
        ...state,

        error: action.payload.error,
      };
    }
    case types.CLEAR_STUDENT_LIST: {
      return {
        ...state,
        studentList: null,
        message: null,
        error: null,
      };
    }
    case types.CLEAR_TOTAL_STUDENTS: {
      return {
        ...state,
        totalStudent: null,
        message: null,
        error: null,
      };
    }
    case types.CLEAR_STUDENT: {
      return {
        ...state,
        student: null,
        message: null,
        error: null,
      };
    }
    case types.CLEAR_MESSAGE: {
      return {
        ...state,
        message: null,
      };
    }
    case types.CLEAR_ERROR: {
      return {
        ...state,
        error: null,
      };
    }

    default: {
      return state;
    }
  }
}
