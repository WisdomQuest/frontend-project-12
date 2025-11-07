import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_BASE_URL } from '../constants/api.js'
import { logout } from '../modules/login/auth/authSlice.js'

const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    return headers
  },
})

export const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQueryWithAuth(args, api, extraOptions)
  
  if (result.error?.status === 401) {
    api.dispatch(logout())

    if (globalThis.location?.pathname !== '/login') {
      globalThis.location.href = '/login'
    }
  }

  return result
}
