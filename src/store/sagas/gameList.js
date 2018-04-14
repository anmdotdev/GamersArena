import { put } from 'redux-saga/effects';

export function* fetchGamesData() {
    yield console.log('Hello');
    yield put({
        type: 'FETCH_GAMES_DATA'
    })
}
