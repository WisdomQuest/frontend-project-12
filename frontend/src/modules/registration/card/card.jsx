import { FormRegister } from './form-register.jsx';
import avatar from './avatar.jpg';

export const Card = () => {
  return (
    <div className="card align-items-center d-flex justify-content-center">
      <img src={avatar} alt="register" />
      <FormRegister />
    </div>
  );
};