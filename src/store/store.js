import { configureStore } from '@reduxjs/toolkit'
import settingFromLocalStorage from '../features/settingFromLocalStorage'

export default configureStore({
  reducer: {
    setting: settingFromLocalStorage,
  }
})