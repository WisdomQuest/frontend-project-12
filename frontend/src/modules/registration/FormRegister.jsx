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

export const FormRegister = () => {
  const [register, { isLoading }] = useRegisterMutation();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { registerFieldRef, handleKeyDown } = useFormFocus([
    'nickName',
    'password',
    'passwordConfirm',
  ]);

  const handleRegister = async (values, { setFieldError }) => {
    try {
      const user = await register({
        username: values.nickName,
        password: values.password,
      }).unwrap();
      dispatch(setCredentials(user));
      navigate('/');
    } catch (err) {
      if (err.status === 409) {
        setFieldError('userNameExists', t('auth.errors.userExists'));
      } else {
        console.error(t('auth.errors.connectionError'), err);
      }
    }
  };

  const createFieldRef = (fieldName) => (ref) => {
    registerFieldRef(fieldName, ref);
  };

  return (
    <Formik
      initialValues={{
        nickName: '',
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
              controlId="validationFormikNickname"
              className="position-relative"
            >
              <FloatingLabel
                controlId="floatingName"
                label={t('auth.username')}
              >
                <Form.Control
                  type="text"
                  name="nickName"
                  value={values.nickName}
                  onChange={handleChange}
                  ref={createFieldRef('nickName')}
                  autoFocus={true}
                  placeholder={t('auth.username')}
                  onKeyDown={(e) => handleKeyDown(e, 'nickName')}
                  isInvalid={touched.nickName && !!errors.nickName}
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.nickName}
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
                  ref={createFieldRef('password')}
                  placeholder={t('auth.password')}
                  onKeyDown={(e) => handleKeyDown(e, 'password')}
                  isInvalid={touched.password && !!errors.password}
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
                  ref={createFieldRef('passwordConfirm')}
                  placeholder={t('auth.confirmPassword')}
                  onKeyDown={(e) => handleKeyDown(e, 'passwordConfirm')}
                  isInvalid={
                    touched.passwordConfirm && !!errors.passwordConfirm
                  }
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.passwordConfirm}
                </Form.Control.Feedback>
              </FloatingLabel>
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
        </Form>
      )}
    </Formik>
  );
};
