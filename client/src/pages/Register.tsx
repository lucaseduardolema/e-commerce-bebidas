import { Container } from 'react-bootstrap';
import RegisterForm from '../components/RegisterForm';

export default function Register() {
  return (
    <Container className='center-container'>
      <h1>Registre-se</h1>
      <RegisterForm />
    </Container>
  );
}
