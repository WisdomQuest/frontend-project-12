import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FormRegister } from './formRegister.jsx';
import registerLogo from '../../assets/images/registerLogo.jpg';
import { CircleAvatar } from '../../common/components/circleAvatar.jsx';

export const Registration = () => {
  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm ">
            <Card.Body className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <CircleAvatar src={registerLogo} alt={'Войти'} />
              <FormRegister />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
