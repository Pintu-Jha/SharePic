import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'userData',
  initialState: {
    userData: null,
    loginData:null,
    isUserLoggedIn: false
  },
  reducers: {
    signupData: (state, action) => {
      state.userData = action.payload;
      AsyncStorage.setItem('user', JSON.stringify(action.payload));
    },
    loginData: (state, action) => {
      // state.loginData = action.payload;
      state.isUserLoggedIn = true
      }
    }
})

export const {signupData,loginData} = authSlice.actions;

export default authSlice.reducer;
