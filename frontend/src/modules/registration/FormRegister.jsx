import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useRegisterMutation } from './regApi.js';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { singUpValidationSchema } from '../../validationShemas.js';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../login/auth/authSlice.js';
import { useTranslation } from 'react-i18next';
import { useFormFocus } from './useFormFocus.js';

export const FormRegister = () => {
  const [register, { isLoading }] = useRegisterMutation();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { registerFieldRef, handleKeyPress } = useFormFocus([
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
    <div>
      <Formik
        initialValues={{
          nickName: '',
          password: '',
          passwordConfirm: '',
          userNameExists: '',
        }}
        onSubmit={handleRegister}
        validationSchema={singUpValidationSchema}
      >
        {() => (
          <Form className="d-flex flex-column w-100 text-center m-5">
            <h1>{t('auth.registration')}</h1>
            <Field
              name="nickName"
              innerRef={createFieldRef('nickName')}
              className="mb-3"
              autoFocus={true}
              placeholder={t('auth.username')}
              type="text"
              onKeyPress={(e) => handleKeyPress(e, 'nickName')}
            />
            <ErrorMessage
              name="nickName"
              component="div"
              className="invalid bg-danger text-white rounded p-2 mt-2"
            />
            <Field
              name="password"
              innerRef={createFieldRef('password')}
              className="mb-3"
              placeholder={t('auth.password')}
              type="password"
              onKeyPress={(e) => handleKeyPress(e, 'password')}
            />
            <ErrorMessage
              name="password"
              component="div"
              className="invalid bg-danger text-white rounded p-2 mt-2"
            />
            <Field
              name="passwordConfirm"
              innerRef={createFieldRef('passwordConfirm')}
              className="mb-3"
              placeholder={t('auth.confirmPassword')}
              type="password"
              onKeyPress={(e) => handleKeyPress(e, 'passwordConfirm')}
            />
            <ErrorMessage
              name="passwordConfirm"
              component="div"
              className="invalid bg-danger text-white rounded p-2 mt-2"
            />
            <ErrorMessage
              name="userNameExists"
              render={(msg) =>
                msg ? (
                  <div className="invalid bg-danger text-white rounded p-2 mt-2">
                    {msg}
                  </div>
                ) : null
              }
            />

            <Button
              variant="outline-primary"
              type="submit"
              disabled={isLoading}
            >
              {t('auth.registrationSubmit')}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
