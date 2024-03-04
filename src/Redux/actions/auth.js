import { loginData, signupData} from '../reducers/auth';
import store from '../store';
import types from '../types';
const {dispatch} = store;

export const userSignup = data => {
  dispatch(signupData(data));
};
export const userLogin = data =>{
  dispatch(loginData(data))
}

export function logout() {
  dispatch({type: types.CLEAR_REDUX_STATE});
}
