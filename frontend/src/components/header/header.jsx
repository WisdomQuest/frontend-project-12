import { useDispatch, useSelector } from 'react-redux';
import {
  logout,
  selectCurrentToken,
} from '../../modules/login/auth/authSlice.js';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = !!useSelector(selectCurrentToken);
  const { t } = useTranslation();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="d-flex justify-content-between align-items-center no-wrap bg-white shadow">
      <a href="/" onClick={handleLogoClick} className="navbar-brand">
        {t('header.logo')}
      </a>
      {isAuthenticated && (
        <Button variant="primary" type="submit" onClick={handleLogout}>
          {t('header.logout')}
        </Button>
      )}
    </div>
  );
};