import { FormLogin } from './FormLogin.jsx';
import avatar from '../../../assets/loginLogo.jpg';

export const CardBody = () => {
  return (
    <div className='d-flex'>
      <img src={avatar} alt="login" />
      <FormLogin />
    </div>
  );
};
