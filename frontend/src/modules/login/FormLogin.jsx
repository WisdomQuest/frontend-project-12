import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useVerifyTokenMutation } from '../registration/authApi.js';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials } from './auth/authSlice.js';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import { useFormFocus } from '../../hooks/useFormFocus.js';
import { createLoginValidation } from '../../validationShemas.js';

export const FormLogin = () => {
  const [login, { isLoading }] = useVerifyTokenMutation();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showError, setShowError] = useState(false);

  const { registerRef, createKeyDownHandler } = useFormFocus([
    'nickname',
    'password',
  ]);

  const handleLogin = async (name, password) => {
    try {
      setShowError(false);
      const user = await login({
        username: name,
        password: password,
      }).unwrap();

      dispatch(setCredentials(user));
      navigate('/');
    } catch (err) {
      setShowError(true);
      console.error(t('auth.errors.connectionError'), err);
    }
  };

  return (
    <Formik
      initialValues={{ nickname: '', password: '' }}
      onSubmit={(values) => handleLogin(values.nickname, values.password)}
      validationSchema={createLoginValidation(t)}
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
                label={t('auth.nickname')}
              >
                <Form.Control
                  type="text"
                  name="nickname"
                  value={values.nickname}
                  onChange={handleChange}
                  ref={registerRef('nickname')}
                  autoFocus={true}
                  placeholder={t('auth.nickname')}
                  onKeyDown={createKeyDownHandler('nickname', handleSubmit)}
                  isInvalid={touched.nickname && !!errors.nickname || showError}
                />

                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.nickname}
                </Form.Control.Feedback>

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
                  ref={registerRef('password')}
                  placeholder={t('auth.password')}
                  onKeyDown={createKeyDownHandler('password', handleSubmit)}
                  isInvalid={(touched.password && !!errors.password) || showError}
                />

                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.password || t('auth.errors.invalidCredentials')}
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
  );
};
