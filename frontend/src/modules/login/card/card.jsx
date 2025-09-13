import { CardBody } from "./card-body";
import { CardFooter } from "./card-footer";

export const Card = () => {
  return (
    <div className="card align-items-center d-flex justify-content-center">
      <CardBody />
      <CardFooter />
    </div>
  );
};
