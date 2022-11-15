import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './usersSlice'
import authReducer from './authSlice'
import productsReducer from './productsSlice'
import ordersReducer from './ordersSlice'

export const store = configureStore({
  reducer: {
      users: usersReducer,
      auth: authReducer,
      products: productsReducer,
      orders: ordersReducer
  },
})