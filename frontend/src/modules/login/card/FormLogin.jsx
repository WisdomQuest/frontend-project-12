import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { useVerifyTokenMutation } from '../auth/authApi.js';
import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../auth/authSlice.js';
import { useTranslation } from 'react-i18next';

export const FormLogin = () => {
  const [login, { isLoading }] = useVerifyTokenMutation();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showError, setShowError] = useState(false);

  const nickNameRef = useRef(null);
  const passwordRef = useRef(null);

  const handleKeyPress = (e, fieldName) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const nickName = nickNameRef.current.value;
      const password = passwordRef.current.value;

      if (fieldName === 'nickName' && !password) {
        passwordRef.current?.focus();
      }

      if (fieldName === 'password' && !nickName) {
        nickNameRef.current?.focus();
      }
      if (nickName && password) {
        handleLogin(nickName, password);
      }
    }
  };

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
    <div>
      <Formik
        initialValues={{ nickName: '', password: '' }}
        onSubmit={(values) => handleLogin(values.nickName, values.password)}
      >
        {() => (
          <Form className="d-flex flex-column w-100 text-center m-5">
            <h1>{t('auth.login')}</h1>
            <Field
              name="nickName"
              innerRef={nickNameRef}
              className="mb-3 required"
              autoFocus={true}
              placeholder={t('auth.username')}
              type="text"
              onKeyPress={(e) => handleKeyPress(e, 'nickName')}
            />
            <Field
              name="password"
              innerRef={passwordRef}
              className="mb-3 required"
              placeholder={t('auth.password')}
              type="password"
              onKeyPress={(e) => handleKeyPress(e, 'password')}
            />
            {showError && (
              <div className="invalid bg-danger text-white">
                {t('auth.errors.invalidCredentials')}
              </div>
            )}

            <Button
              variant="outline-primary"
              type="submit"
              disabled={isLoading}
            >
              {t('auth.submit')}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};