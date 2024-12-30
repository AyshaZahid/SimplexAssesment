import { combineReducers } from 'redux';
import AuthReducer from './auth';

import CourseReducer from './course';
import StudentReducer from './student';

export default combineReducers({
  Auth: AuthReducer,
  Student: StudentReducer,
  Course: CourseReducer,
});
