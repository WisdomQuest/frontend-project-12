import { useNavigate } from 'react-router-dom';
import { useVerifyTokenMutation } from './auth/authApi.js';
import { useDispatch } from 'react-redux';
import { setCredentials } from './auth/authSlice.js';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import { useState } from 'react';
import { notifyError } from '../../common/utils/notify.js';
import { useFormFocus } from '../../common/hooks/useFormFocus.js';
import { createLoginValidation } from '../../common/utils/validationShemas.js';
import { AuthForm } from '../../common/components/form/authForm2.jsx';

export const FormLogin = () => {
  const [login, { isLoading }] = useVerifyTokenMutation();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fieldNames = ['username', 'password'];
  const { registerRef, createKeyDownHandler } = useFormFocus(fieldNames);

  const [isInvalidField, setIsInvalidField] = useState(false);

  const handleLogin = async ({ username, password }, { setFieldError }) => {
    try {
      setIsInvalidField(false);
      const user = await login({
        username,
        password,
      }).unwrap();

      dispatch(setCredentials(user));
      navigate('/');
    } catch (err) {
      if (err.status === 401) {
        setIsInvalidField(true);
        setFieldError('password', t('auth.errors.invalidCredentials'));
      } else {
        notifyError(t('auth.errors.connectionError'));
      }
    }
  };

  const fields = [
    {
      name: 'username',
      type: 'text',
      label: t('auth.nickname'),
      placeholder: t('auth.nickname'),
      autoComplete: 'username',
    },
    {
      name: 'password',
      type: 'password',
      label: t('auth.password'),
      placeholder: t('auth.password'),
      autoComplete: 'current-password',
    },
  ];

  return (
    <AuthForm
      initialValues={{ username: '', password: '' }}
      validationSchema={createLoginValidation(t)}
      onSubmit={handleLogin}
      fields={fields}
      title={t('auth.login')}
      submitButtonText={t('auth.login')}
      isLoading={isLoading}
      registerRef={registerRef}
      createKeyDownHandler={createKeyDownHandler}
      isInvalidField={isInvalidField}
    >
      <ToastContainer />
    </AuthForm>
  );
};
