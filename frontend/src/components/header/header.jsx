import { useDispatch, useSelector } from 'react-redux';
import {
  logout,
  selectCurrentToken,
} from '../../modules/login/auth/authSlice.js';
import { Button } from '../uikit/ui-button.jsx';

export const Header = () => {
  const dispatch = useDispatch();
  const isAuthenticated = !!useSelector(selectCurrentToken);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="d-flex justify-content-between align-items-center no-wrap bg-white shadow">
      <h1>Hexlet Chat</h1>
      {isAuthenticated && (
        <Button className="mb-3, w-100, btn-primary " onClick={handleLogout}>
          Выйти
        </Button>
      )}
    </div>
  );
};
