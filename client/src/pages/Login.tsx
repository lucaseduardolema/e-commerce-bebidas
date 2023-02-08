import { Button, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

export default function Login() {
  const navigate = useNavigate();
  return (
    <Container className='center-container'>
      <h1>E-commerce</h1>
      <Row>
        <Col>
          <LoginForm />
        </Col>
      </Row>
      <Row className='text-center'>
        <Col md='12'>
          <Button
            onClick={() => navigate('/register')}
            variant='outline-success'
            size='lg'
          >
            Ainda não tenho conta
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
