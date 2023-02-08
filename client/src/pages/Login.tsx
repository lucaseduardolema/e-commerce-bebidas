import { Button, Container } from "react-bootstrap";
import LoginForm from "../components/LoginForm";

export default function Login() {
  return (
    <Container>
      <h1>E-commerce</h1>
      <LoginForm />

      <Button variant="outline-success" size="lg">Ainda não tenho conta</Button>
    </Container>
  )
}
