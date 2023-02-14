import { Container } from 'react-bootstrap';
import NavBar from '../components/NavBar';
import ProductsCard from '../components/ProductsCard';

export default function CostumerProducts() {

  return (
    <>
      <NavBar />
      <Container>
        <ProductsCard />
      </Container>
    </>
  );
}
