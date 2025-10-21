import { useRegisterMutation } from './regApi.js';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../login/auth/authSlice.js';
import { useTranslation } from 'react-i18next';
import { useFormFocus } from '../../hooks/useFormFocus.js';
import { createSignUpValidation } from '../../validationShemas.js';
import { AuthForm } from '../../components/form/AuthForm.jsx';
import { ToastContainer } from 'react-toastify';
import { notifyError } from '../../common/notify/notify.js';

export const FormRegister = () => {
  const [register, { isLoading }] = useRegisterMutation();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fieldNames = ['username', 'password', 'passwordConfirm'];
  const { registerRef, createKeyDownHandler } = useFormFocus(fieldNames);

  const handleRegister = async ({username, password}, { setFieldError }) => {
    try {
      const user = await register({
        username,
        password,
      }).unwrap();
      dispatch(setCredentials(user));
      navigate('/');
    } catch (err) {
      if (err.status === 409) {
        setFieldError('username', t('auth.errors.userExists'));
      } else {
        notifyError(t('auth.errors.connectionError'));
      }
    }
  };

  const fields = [
    { 
      name: 'username', 
      type: 'text', 
      label: t('auth.username'), 
      placeholder: t('auth.username'),
      autoComplete: 'username'
    },
    { 
      name: 'password', 
      type: 'password', 
      label: t('auth.password'), 
      placeholder: t('auth.password'),
      autoComplete: 'new-password'
    },
    { 
      name: 'passwordConfirm', 
      type: 'password', 
      label: t('auth.confirmPassword'), 
      placeholder: t('auth.confirmPassword'),
      autoComplete: 'new-password'
    }
  ];

  return (
    <AuthForm
      initialValues={{
        username: '',
        password: '',
        passwordConfirm: '',
      }}
      validationSchema={createSignUpValidation(t)}
      onSubmit={handleRegister}
      fields={fields}
      title={t('auth.registration')}
      submitButtonText={t('auth.registrationSubmit')}
      isLoading={isLoading}
      registerRef={registerRef}
      createKeyDownHandler={createKeyDownHandler}
    >
      <ToastContainer />
    </AuthForm>
  );
};
