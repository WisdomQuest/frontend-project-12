import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Login } from './modules/login';
import { Chat } from './modules/chat';
import { store } from './store.js';
import { NotFound } from './modules/pageNotFound.jsx';
import { Registration } from './modules/registration';
import { Header } from './components/header/header.jsx';
import { ProtectedRoute } from './components/ProtectedRoute.jsx';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Registration />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
