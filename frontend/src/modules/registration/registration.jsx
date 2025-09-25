import { FormRegister } from './FormRegister.jsx';
import registerLogo from '../../assets/registerLogo.jpg';

export const Registration = () => {
  return (
    <div className="card align-items-center d-flex justify-content-center">
      <img src={registerLogo} alt="register" />
      <FormRegister />
    </div>
  );
};
