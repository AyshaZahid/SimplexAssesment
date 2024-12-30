import { all } from 'redux-saga/effects';
import authSagas from './auth';

import studentSagas from './student';
import courseSagas from './course';

export default function* rootSaga() {
  yield all([...authSagas, ...studentSagas, ...courseSagas]);
}
