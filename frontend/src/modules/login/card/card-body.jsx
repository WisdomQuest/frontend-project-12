import { FormLogin } from './form-login';
import avatar from './avatar.jpg';

export const CardBody = () => {
  return (
    <div className='d-flex'>
      <img src={avatar} alt="login" />
      <FormLogin />
    </div>
  );
};
