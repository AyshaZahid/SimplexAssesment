import { takeEvery, call, put, fork } from 'redux-saga/effects';
import * as actions from '../actions/course';
import * as authActions from '../actions/auth';
import * as api from '../api/course';
import * as types from '../actions';
import { setSession } from '../auth/utils';

function* getCourse() {
  try {
    const result = yield call(api.getCourse);

    yield put(
      actions.getCourseSuccess({
        items: result.data,
      })
    );
  } catch (e) {
    if (e.message === 'Error: Not authorized, no token') {
      setSession(null);
      yield put(authActions.logoutRequest());

      yield put(
        authActions.loginError({
          error: e.message,
        })
      );
    } else {
      yield put(
        actions.courseError({
          error: e.message,
        })
      );
    }
  }
}

function* watchGetCourseRequest() {
  yield takeEvery(types.GET_COURSE_REQUEST, getCourse);
}

function* createCourse({ payload }) {
  try {
    const result = yield call(api.createCourse, payload);

    yield put(
      actions.createCourseSuccess({
        data: result.data,
      })
    );
    yield put(actions.getCourseRequest());
  } catch (e) {
    if (e.message === 'Error: Not authorized, no token') {
      setSession(null);
      yield put(authActions.logoutRequest());

      yield put(
        authActions.loginError({
          error: e.message,
        })
      );
    } else {
      yield put(
        actions.courseError({
          error: e.message,
        })
      );
    }
  }
}

function* getAssignedStudents({ payload }) {
  try {
    const result = yield call(api.getAssignedStudents, payload);

    yield put(
      actions.getAssignedStudentsSuccess({
        items: result.data,
      })
    );
  } catch (e) {
    if (e.message === 'Error: Not authorized, no token') {
      setSession(null);
      yield put(authActions.logoutRequest());

      yield put(
        authActions.loginError({
          error: e.message,
        })
      );
    } else {
      yield put(
        actions.studentError({
          error: e.message,
        })
      );
    }
  }
}

function* watchGetAssignedStudentsRequest() {
  yield takeEvery(types.GET_ASSIGNED_STUDENTS_REQUEST, getAssignedStudents);
}

function* watchCreateCourseRequest() {
  yield takeEvery(types.CREATE_COURSE_REQUEST, createCourse);
}

function* updateCourse({ payload }) {
  try {
    const result = yield call(api.updateCourse, payload);

    yield put(
      actions.updateCourseSuccess({
        data: result.data,
      })
    );

    yield put(actions.getCourseRequest());
  } catch (e) {
    if (e.message === 'Error: Not authorized, no token') {
      setSession(null);
      yield put(authActions.logoutRequest());

      yield put(
        authActions.loginError({
          error: e.message,
        })
      );
    } else {
      yield put(
        actions.courseError({
          error: e.message,
        })
      );
    }
  }
}

function* watchUpdateCourseRequest() {
  yield takeEvery(types.UPDATE_COURSE_REQUEST, updateCourse);
}

function* deleteCourse({ payload }) {
  try {
    const result = yield call(api.deleteCourse, payload);

    yield put(
      actions.deleteCourseSuccess({
        data: result.data,
      })
    );

    yield put(actions.getCourseRequest());
  } catch (e) {
    if (e.message === 'Error: Not authorized, no token') {
      setSession(null);
      yield put(authActions.logoutRequest());

      yield put(
        authActions.loginError({
          error: e.message,
        })
      );
    } else {
      yield put(
        actions.courseError({
          error: e.message,
        })
      );
    }
  }
}

function* watchDeleteCourseRequest() {
  yield takeEvery(types.DELETE_COURSE_REQUEST, deleteCourse);
}

function* deleteAssignedStudent({ payload }) {
  try {
    const result = yield call(api.deleteAssignedStudent, payload);

    yield put(
      actions.deleteAssignedStudentSuccess({
        data: result.data,
      })
    );

    yield put(actions.getCourseRequest());
  } catch (e) {
    if (e.message === 'Error: Not authorized, no token') {
      setSession(null);
      yield put(authActions.logoutRequest());

      yield put(
        authActions.loginError({
          error: e.message,
        })
      );
    } else {
      yield put(
        actions.studentError({
          error: e.message,
        })
      );
    }
  }
}

function* watchDeleteAssignedStudentRequest() {
  yield takeEvery(types.DELETE_ASSIGNED_STUDENT_REQUEST, deleteAssignedStudent);
}

const courseSagas = [
  fork(watchGetCourseRequest),
  fork(watchCreateCourseRequest),
  fork(watchUpdateCourseRequest),
  fork(watchDeleteCourseRequest),
  fork(watchGetAssignedStudentsRequest),
  fork(watchDeleteAssignedStudentRequest),
];

export default courseSagas;
