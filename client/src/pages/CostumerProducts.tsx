import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import NavBar from '../components/NavBar';
import ProductsCard from '../components/ProductsCard';
import IProducts from '../interfaces/IProducts';
import { getAllProducts } from '../services/productsRequests';

export default function CostumerProducts() {
  const [products, setProducts] = useState<IProducts[]>([]);

  useEffect(() => {
    async function fetchAllProducts() {
      try {
        const accessToken = JSON.parse(
          localStorage.getItem('accessToken') ?? ''
        );
        const { data } = await getAllProducts(accessToken);
        setProducts(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchAllProducts();
  }, []);

  return (
    <>
      <NavBar />
      <Container>
        <ProductsCard products={products} />
      </Container>
    </>
  );
}
