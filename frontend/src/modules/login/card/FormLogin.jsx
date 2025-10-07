import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import { useVerifyTokenMutation } from '../../registration/authApi.js'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../auth/authSlice.js'
import { useTranslation } from 'react-i18next'
import * as formik from 'formik'
import { useFormFocus } from '../../../hooks/useFormFocus.js'

export const FormLogin = () => {
  const { Formik } = formik
  const [login, { isLoading }] = useVerifyTokenMutation()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [showError, setShowError] = useState(false)

  const { registerFieldRef, handleKeyDown } = useFormFocus([
    'nickName',
    'password',
  ])

  const createFieldRef = (fieldName) => (ref) => {
    registerFieldRef(fieldName, ref)
  }

  const handleLogin = async (name, password) => {
    try {
      setShowError(false)
      const user = await login({
        username: name,
        password: password,
      }).unwrap()

      dispatch(setCredentials(user))
      navigate('/')
    } catch (err) {
      setShowError(true)
      console.error(t('auth.errors.connectionError'), err)
    }
  }

  return (
    <Formik
      initialValues={{ nickName: '', password: '' }}
      onSubmit={(values) => handleLogin(values.nickName, values.password)}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <Form
          noValidate
          onSubmit={handleSubmit}
          className="col-12 col-md-6 mt-3 mt-md-0"
        >
          <h1 className="mb-4 text-center">{t('auth.login')}</h1>

          <Row className="mb-3">
            <Form.Group
              as={Col}
              controlId="validationFormikNicknameLogin"
              className="position-relative"
            >
              <FloatingLabel
                controlId="floatingName"
                label={t('auth.nickName')}
              >
                <Form.Control
                  type="text"
                  name="nickName"
                  value={values.nickName}
                  onChange={handleChange}
                  ref={createFieldRef('nickName')}
                  autoFocus={true}
                  placeholder={t('auth.nickName')}
                  onKeyDown={(e) => handleKeyDown(e, 'nickName')}
                  isInvalid={touched.nickName && !!errors.nickName}
                />
              </FloatingLabel>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group
              as={Col}
              controlId="validationFormikPasswordLogin"
              className="position-relative"
            >
              <FloatingLabel
                controlId="floatingPassword"
                label={t('auth.password')}
              >
                <Form.Control
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  ref={createFieldRef('password')}
                  placeholder={t('auth.password')}
                  onKeyDown={(e) => handleKeyDown(e, 'password')}
                  isInvalid={showError}
                />

                <Form.Control.Feedback type="invalid" tooltip>
                  {t('auth.errors.invalidCredentials')}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
          </Row>

          <Button
            className="w-100 mb-3"
            variant="outline-primary"
            type="submit"
            disabled={isLoading}
          >
            {t('auth.login')}
          </Button>
        </Form>
      )}
    </Formik>
  )
}
