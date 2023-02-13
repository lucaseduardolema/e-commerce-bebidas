import { Container, Nav, Navbar } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

export default function NavBar() {
  const { pathname } = useLocation();

  return (
    <Navbar bg='light' variant='light'>
      <Container>
        <Navbar.Brand href='/'>E-commerce</Navbar.Brand>
        <Nav className='me-auto' variant='tabs' defaultActiveKey={pathname}>
          <Nav.Item>
            <Nav.Link href='/customer/products'>Produtos</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href='/customer/orders'>Meus Pedidos</Nav.Link>
          </Nav.Item>
        </Nav>
      </Container>
    </Navbar>
  );
}
