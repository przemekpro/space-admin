
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser: JSON.parse(localStorage.getItem('user')) || null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state, action) => {
        state.currentUser = action.payload
    },
    editUser: (state, action) => {
      const data = action.payload
      state.currentUser = data
    },
  },
})


export const { signIn, editUser } = authSlice.actions

export default authSlice.reducer