import { takeEvery, call, put, fork } from 'redux-saga/effects';
import * as actions from '../actions/student';
import * as authActions from '../actions/auth';
import * as api from '../api/student';
import * as types from '../actions';
import { setSession } from '../auth/utils';

function* getStudent() {
  try {
    const result = yield call(api.getStudent);

    yield put(
      actions.getStudentSuccess({
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

function* watchGetStudentRequest() {
  yield takeEvery(types.GET_STUDENT_REQUEST, getStudent);
}

function* getAssignedCourses({ payload }) {
  try {
    const result = yield call(api.getAssignedCourses, payload);

    yield put(
      actions.getAssignedCoursesSuccess({
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

function* watchGetAssignedCoursesRequest() {
  yield takeEvery(types.GET_ASSIGNED_COURSES_REQUEST, getAssignedCourses);
}

function* createStudent({ payload }) {
  try {
    const result = yield call(api.createStudent, payload);

    yield put(
      actions.createStudentSuccess({
        data: result.data,
      })
    );
    yield put(actions.getStudentRequest());
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

function* watchCreateStudentRequest() {
  yield takeEvery(types.CREATE_STUDENT_REQUEST, createStudent);
}

function* assignCourseStudent({ payload }) {
  try {
    const result = yield call(api.assignCourseStudent, payload);

    yield put(
      actions.assignCourseStudentSuccess({
        data: result.data,
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

function* watchAssignCourseRequest() {
  yield takeEvery(types.ASSIGN_COURSE_STUDENT_REQUEST, assignCourseStudent);
}

function* updateStudent({ payload }) {
  try {
    const result = yield call(api.updateStudent, payload);

    yield put(
      actions.updateStudentSuccess({
        data: result.data,
      })
    );

    yield put(actions.getStudentRequest());
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

function* watchUpdateStudentRequest() {
  yield takeEvery(types.UPDATE_STUDENT_REQUEST, updateStudent);
}

function* deleteStudent({ payload }) {
  try {
    const result = yield call(api.deleteStudent, payload);

    yield put(
      actions.deleteStudentSuccess({
        data: result.data,
      })
    );

    yield put(actions.getStudentRequest());
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

function* watchDeleteStudentRequest() {
  yield takeEvery(types.DELETE_STUDENT_REQUEST, deleteStudent);
}

function* deleteAssignedCourse({ payload }) {
  try {
    const result = yield call(api.deleteAssignedCourse, payload);

    yield put(
      actions.deleteAssignedCourseSuccess({
        data: result.data,
      })
    );

    yield put(actions.getStudentRequest());
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

function* watchDeleteAssignedCourseRequest() {
  yield takeEvery(types.DELETE_ASSIGNED_COURSE_REQUEST, deleteAssignedCourse);
}

const studentSagas = [
  fork(watchGetStudentRequest),
  fork(watchCreateStudentRequest),
  fork(watchAssignCourseRequest),
  fork(watchUpdateStudentRequest),
  fork(watchDeleteStudentRequest),
  fork(watchGetAssignedCoursesRequest),
  fork(watchDeleteAssignedCourseRequest),
];

export default studentSagas;
