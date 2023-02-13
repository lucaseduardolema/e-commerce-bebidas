import { useEffect, useState } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { getUserInfo } from '../services/authRequests';

export default function NavBar() {
  const { pathname } = useLocation();
  const navigate = useNavigate()
  const [userName, setUserName] = useState<string>('');
  const [navText, setNavText] = useState<string>('');
  const [role, setRole] = useState<string>('');

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const accessToken = JSON.parse(
          localStorage.getItem('accessToken') ?? ''
        );
        const { data } = await getUserInfo(accessToken);
        setUserName(data.name);
        setRole(data.role);
        switch (data.role) {
          case 'administrator':
            setNavText('Gerenciar Usuários');
            break;
          case 'seller':
            setNavText('Pedidos');
            break;
          default:
            setNavText('Meus Pedidos');
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchUserInfo();
  }, []);

  function handleLogOut() {
    localStorage.removeItem('accessToken')
    navigate('/login')
  }

  return (
    <Navbar bg='light' variant='light'>
      <Container>
        <Navbar.Brand href='/'>E-commerce</Navbar.Brand>

        <Nav className='me-auto' variant='tabs' defaultActiveKey={pathname}>
          {navText === 'Meus Pedidos' && (
            <Nav.Item>
              <Nav.Link href='/customer/products'>Produtos</Nav.Link>
            </Nav.Item>
          )}

          <Nav.Item>
            <Nav.Link href={`/${role}/orders`}>{navText}</Nav.Link>
          </Nav.Item>
        </Nav>

        <Navbar.Toggle />

        <Navbar.Collapse className='justify-content-end gap-4'>
          <Navbar.Text>{userName}</Navbar.Text>

          <Button variant='danger' onClick={ handleLogOut }>Sair</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
