import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import moment from "moment";
import { API_ENDPOINT, API_TOKEN, WALKER_ID, WALK_ID } from "../../constants";
import {
  START_WALK_ACTION_TYPE,
  startWalkSuccess,
  startWalkFailed,
} from "../actions";

function postStartWalk() {
  return fetch(`${API_ENDPOINT}?jwt=${API_TOKEN}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      walk_id: WALK_ID,
      walker_id: WALKER_ID,
      ts: moment().format("YYYY-MM-DD HH:mm:ss"),
    }),
  });
}

export function* startWalk() {
  try {
    const response = yield call(postStartWalk);
    if (response.status === 200) {
      yield put(startWalkSuccess());
    } else {
      yield put(startWalkFailed(response.status));
    }
  } catch (e) {
    yield put(startWalkFailed(e));
  }
}

export function* watchStartWalk() {
  yield takeEvery(START_WALK_ACTION_TYPE, startWalk);
}

export default function* dogWalkSaga() {
  yield all([fork(watchStartWalk)]);
}
