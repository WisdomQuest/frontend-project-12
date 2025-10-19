import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token') || null,
    user: localStorage.getItem('user') || null,
  },
  reducers: {
    setCredentials: (state, { payload: { username, token } }) => {
      state.token = token
      state.user = username
    },
    logout: (state) => {
      state.token = null
      state.user = null
    },
  },
})

export const { setCredentials, logout } = authSlice.actions
export const selectCurrentUser = state => state.auth.user
export const selectIsAuthenticated = state => !!state.auth.token

export default authSlice.reducer
