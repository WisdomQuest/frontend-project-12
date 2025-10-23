import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FormLogin } from './formLogin.jsx';
import avatar from '../../assets/images/loginLogo.jpg';
import { CircleAvater } from '../../common/circleAvater.jsx';

export const Login = () => {
  const { t } = useTranslation();

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm ">
            <Card.Body className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <CircleAvater src={avatar} alt={'login'} />
              <FormLogin />
            </Card.Body>
            <Card.Footer>
              <div className="text-center">
                <span className="m-2 pt-2">{t('auth.NoAccount')}</span>
                <Link to="/signup">{t('auth.registration')}</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
