import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { CardBody } from './card/CardBody.jsx'
import { CardFooter } from './card/CardFooter.jsx'

export const Login = () => {
  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm ">
            <Card.Body className="d-flex row p-5">
              <CardBody />
            </Card.Body>
            <Card.Footer>
              <CardFooter />
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
