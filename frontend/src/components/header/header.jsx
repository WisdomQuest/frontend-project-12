import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../modules/login/auth/authSlice.js';
import { Button } from '../uikit/ui-button.jsx';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="d-flex justify-content-between align-items-center no-wrap box-shadow bg-white">
      <h1>Hexlet Chat</h1>
      {isAuthenticated && (
        <Button className="mb-3, w-100, btn-primary " onClick={handleLogout}>
          Выйти
        </Button>
      )}
    </div>
  );
};
