import * as Yup from 'yup';

export const singUpValidationSchema = Yup.object().shape({
  nickName: Yup.string()
    .min(3, 'от 3 до 20 символов')
    .max(20, 'от 3 до 20 символов')
    .required('Обязательное поле'),
  password: Yup.string()
    .min(6, 'мин 6 символов')
    .required('Обязательное поле'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password')], 'Введенные пароли не совпадают'),
});

