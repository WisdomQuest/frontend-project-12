import { Link } from "react-router-dom";


export const CardFooter = () => {
  return (
    <div>
      <span className="m-2 pt-2">Нет аккаунта?</span>
      <Link to='/register'>Регистрация</Link>
    </div>
  );
};