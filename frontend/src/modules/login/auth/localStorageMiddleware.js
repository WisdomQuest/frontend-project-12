const localStorageMiddleware = () => next => (action) => {
  const result = next(action)

  if (action.type === 'auth/setCredentials') {
    const { token, username } = action.payload
    localStorage.setItem('token', token)
    localStorage.setItem('user', username)
  }

  if (action.type === 'auth/logout') {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  return result
}

export default localStorageMiddleware
