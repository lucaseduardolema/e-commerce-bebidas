import { useEffect, useState } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { getUserInfo } from '../services/authRequests';

export default function NavBar() {
  const { pathname } = useLocation();
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const accessToken = JSON.parse(
          localStorage.getItem('accessToken') ?? ''
        );
        const { data } = await getUserInfo(accessToken);
        setUserName(data.name);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUserInfo();
  }, []);

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

        <Navbar.Toggle />

        <Navbar.Collapse className='justify-content-end'>
          <Navbar.Text>{userName}</Navbar.Text>

          <Button>Sair</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
