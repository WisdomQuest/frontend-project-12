import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import {
  logout,
  selectCurrentToken,
} from '../../modules/login/auth/authSlice.js'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isAuthenticated = !!useSelector(selectCurrentToken)
  const { t } = useTranslation()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <Navbar className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <Container>
        <Navbar.Brand href="/">{t('header.logo')}</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {isAuthenticated && (
              <Button variant="primary" type="submit" onClick={handleLogout}>
                {t('header.logout')}
              </Button>
            )}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
