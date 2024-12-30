import * as types from '../actions';

const INITIAL_STATE = {
  totalCourse: null,
  courseList: null,
  course: null,
  message: null,
  error: null,
  assignedStudents: null,
};

export default function course(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.GET_COURSE_SUCCESS: {
      return {
        ...state,
        courseList: action.payload.items.courses,
        message: null,
        error: null,
      };
    }
    case types.GET_ASSIGNED_STUDENTS_SUCCESS: {
      return {
        ...state,
        assignedStudents: action.payload.items.course,
        message: null,
        error: null,
      };
    }
    case types.CREATE_COURSE_SUCCESS: {
      return {
        ...state,
        message: action.payload.data.message,
        error: null,
      };
    }
    case types.UPDATE_COURSE_SUCCESS: {
      return {
        ...state,
        message: action.payload.data.message,
        error: null,
      };
    }

    case types.DELETE_COURSE_SUCCESS: {
      return {
        ...state,
        message: action.payload.data.message,
        error: null,
      };
    }
    case types.DELETE_ASSIGNED_STUDENT_SUCCESS: {
      return {
        ...state,
        message: action.payload.data.message,
        error: null,
      };
    }

    case types.COURSE_ERROR: {
      return {
        ...state,

        error: action.payload.error,
      };
    }
    case types.CLEAR_COURSE_LIST: {
      return {
        ...state,
        courseList: null,
        message: null,
        error: null,
      };
    }
    case types.CLEAR_TOTAL_COURSES: {
      return {
        ...state,
        totalCourse: null,
        message: null,
        error: null,
      };
    }
    case types.CLEAR_COURSE: {
      return {
        ...state,
        course: null,
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
