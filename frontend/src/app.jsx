import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Login } from './modules/login/index.js'
import { Chat } from './modules/chat/index.js'
import { store } from './common/store.js'
import { NotFound } from './modules/pages/pageNotFound.jsx'
import { Registration } from './modules/registration/index.js'
import { Header } from './common/components/header/header.jsx'
import { ProtectedRoute } from './common/components/protectedRoute.jsx'

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path="/"
            element={(
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            )}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Registration />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
