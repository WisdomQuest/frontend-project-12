import { FormLogin } from './FormLogin.jsx'
import avatar from '../../../assets/loginLogo.jpg'

export const CardBody = () => {
  return (
    <>
      <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
        <img
          src={avatar}
          alt="login"
          className="rounded-circle"
        />
      </div>
      <FormLogin />
    </>
  )
}
