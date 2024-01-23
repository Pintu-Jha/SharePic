import {saveUserData} from '../reducers/auth';
import store from '../store';
import types from '../types';
const {dispatch} = store;

export const userLogin = data => {
  dispatch(saveUserData(data));
};

export function logout() {
  dispatch({type: types.CLEAR_REDUX_STATE});
}
