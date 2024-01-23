import { createSlice } from '@reduxjs/toolkit'

const appSettingSlice = createSlice({
    name: 'appSetting',
    initialState: {
      lang: 'en',
      selectedTheme:'dark'
    },
    reducers: {
      ChangeLang: (state, action) => {
       state.lang = action.payload;
      },
      ChangeTheme: (state, action) => {
        state.selectedTheme = action.payload;
       },
    },
    
  })
  
  export const { ChangeLang,ChangeTheme } = appSettingSlice.actions
  
  export default appSettingSlice.reducer