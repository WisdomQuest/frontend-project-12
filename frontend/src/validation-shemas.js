import * as Yup from 'yup';

export const singUpValidationSchema  = Yup.object().shape({
  nickName: Yup.string()
    .min(2, 'минимум 2 символа')
    .max(50, 'Too Long!')
    .required('Required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});