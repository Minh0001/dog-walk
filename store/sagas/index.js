import { all, fork } from 'redux-saga/effects';
import { networkSaga } from 'react-native-offline';
import walk from "./walk"

export default function* rootSaga() {
  yield all([
    fork(walk),
    fork(networkSaga, { pingInterval: 20000 }),
  ]);
}
