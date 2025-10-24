import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  logout,
  selectIsAuthenticated,
} from '../../modules/login/auth/authSlice.js'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const { t } = useTranslation()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <Navbar className="shadow-sm bg-white">
      <Container>
        <Navbar.Brand as={Link} to="/">{t('header.logo')}</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {isAuthenticated && (
            <Button variant="primary" type="submit" onClick={handleLogout}>
              {t('header.logout')}
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
