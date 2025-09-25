import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useRef } from 'react';
import { useRegisterMutation } from './regApi.js';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { singUpValidationSchema } from '../../validationShemas.js';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../login/auth/authSlice.js';

export const FormRegister = () => {
  const [register, { isLoading }] = useRegisterMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const nickNameRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordConfirmRef = useRef(null);

  const handleKeyPress = () => {};

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
        setFieldError(
          'userNameExists',
          'Пользователь с таким именем уже существует'
        );
      } else {
        console.error('Ошибка соединения', err);
      }
    }
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
            <h1>Регистрация</h1>
            <Field
              name="nickName"
              innerRef={nickNameRef}
              className="mb-3"
              autoFocus={true}
              placeholder="Ваш ник"
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
              innerRef={passwordRef}
              className="mb-3"
              placeholder="пароль"
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
              innerRef={passwordConfirmRef}
              className="mb-3"
              placeholder="Подтвердите пароль"
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
              Войти
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
