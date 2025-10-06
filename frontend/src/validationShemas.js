import * as Yup from 'yup';

export const createSignUpValidation = (t) =>
  Yup.object().shape({
    nickName: Yup.string()
      .min(3, t('auth.errors.nickNameLength'))
      .max(20, t('auth.errors.nickNameLength'))
      .required(t('auth.errors.requiredField')),
    password: Yup.string()
      .min(6, t('auth.errors.passwordMin'))
      .required(t('auth.errors.requiredField')),
    passwordConfirm: Yup.string()
      .required(t('auth.errors.requiredField'))
      .oneOf([Yup.ref('password')], t('auth.errors.passwordsMatch')),
  });

export const createChannelsValidation = (t, channelsName = []) =>
  Yup.object().shape({
    chatName: Yup.string()
      .required(t('auth.errors.requiredField'))
      .min(3, t('auth.errors.nickNameLength'))
      .max(20, t('auth.errors.nickNameLength'))
      .notOneOf(channelsName, t('auth.errors.uniqueChannel')),
  });
