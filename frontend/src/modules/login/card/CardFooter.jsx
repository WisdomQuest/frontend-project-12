import { Link } from "react-router-dom";


export const CardFooter = () => {
  return (
    <div className="text-center">
      <span className="m-2 pt-2">Нет аккаунта?</span>
      <Link to='/signup'>Регистрация</Link>
    </div>
  );
};