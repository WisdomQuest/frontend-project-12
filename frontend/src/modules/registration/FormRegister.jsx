import { useRegisterMutation } from './regApi.js';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useDispatch } from 'react-redux';
import { createSignUpValidation } from '../../validationShemas.js';
import { setCredentials } from '../login/auth/authSlice.js';
import { useTranslation } from 'react-i18next';
import { useFormFocus } from '../../hooks/useFormFocus.js';
import { Formik } from 'formik';
import { notifyError } from '../../common/notify/notify.js';
import { ToastContainer } from 'react-toastify';

export const FormRegister = () => {
  const [register, { isLoading }] = useRegisterMutation();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fieldNames = ['username', 'password', 'passwordConfirm'];
  const { registerRef, createKeyDownHandler } = useFormFocus(fieldNames);

  const handleRegister = async (values, { setFieldError }) => {
    try {
      const user = await register({
        username: values.username,
        password: values.password,
      }).unwrap();
      dispatch(setCredentials(user));
      navigate('/');
    } catch (err) {
      if (err.status === 409) {
        setFieldError('userNameExists', t('auth.errors.userExists'));
      } else {
        notifyError(t('auth.errors.connectionError'));
      }
    }
  };

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
        passwordConfirm: '',
      }}
      onSubmit={handleRegister}
      validationSchema={createSignUpValidation(t)}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <Form
          noValidate
          onSubmit={handleSubmit}
          className="w-50 position-relative"
        >
          <h1 className="text-center mb-4">{t('auth.registration')}</h1>

          <Row className="mb-3">
            <Form.Group
              as={Col}
              controlId="validationFormikusername"
              className="position-relative"
            >
              <FloatingLabel
                controlId="floatingName"
                label={t('auth.username')}
              >
                <Form.Control
                  type="text"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  ref={registerRef('username')}
                  autoFocus={true}
                  placeholder={t('auth.username')}
                  onKeyDown={createKeyDownHandler('username', handleSubmit)}
                  isInvalid={
                    (touched.username && !!errors.username) ||
                    !!errors.userNameExists
                  }
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.username || errors.userNameExists}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group
              as={Col}
              controlId="validationFormikPassword"
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
                  isInvalid={
                    (touched.password && !!errors.password) ||
                    !!errors.userNameExists
                  }
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.password}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group
              as={Col}
              controlId="validationFormikPasswordConfirm"
              className="position-relative"
            >
              <FloatingLabel
                controlId="floatingPasswordConfirm"
                label={t('auth.confirmPassword')}
              >
                <Form.Control
                  type="password"
                  name="passwordConfirm"
                  value={values.passwordConfirm}
                  onChange={handleChange}
                  ref={registerRef('passwordConfirm')}
                  placeholder={t('auth.confirmPassword')}
                  onKeyDown={createKeyDownHandler(
                    'passwordConfirm',
                    handleSubmit
                  )}
                  isInvalid={
                    (touched.passwordConfirm && !!errors.passwordConfirm) ||
                    !!errors.userNameExists
                  }
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.passwordConfirm}
                </Form.Control.Feedback>
              </FloatingLabel>

              <Form.Control.Feedback type="invalid" tooltip>
                {errors.userNameExists}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Button
            variant="outline-primary"
            className="w-100"
            type="submit"
            disabled={isLoading}
          >
            {t('auth.registrationSubmit')}
          </Button>
          <ToastContainer />
        </Form>
      )}
    </Formik>
  );
};
