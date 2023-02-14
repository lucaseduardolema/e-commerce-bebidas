import { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import IProducts from '../interfaces/IProducts';
import { getAllProducts } from '../services/productsRequests';
import ICart from '../interfaces/ICart';

export default function ProductsCard() {
  const [products, setProducts] = useState<IProducts[]>([]);
  const [total, setTotal] = useState(0);
  const [counts, setCounts] = useState(
    products.reduce<Record<number, number>>(
      (prev, curr) => ({
        ...prev,
        [curr.id]: 0,
      }),
      {}
    )
  );

  const navigate = useNavigate();

  if (!localStorage.getItem('cart')) localStorage.setItem('cart', '{}');

  useEffect(() => {
    async function fetchAllProducts() {
      try {
        const cart = JSON.parse(localStorage.getItem('cart') ?? '{}');
        const accessToken = JSON.parse(
          localStorage.getItem('accessToken') ?? ''
        );
        const { data } = await getAllProducts(accessToken);
        setProducts(data);
        setCounts(
          data.reduce<Record<number, number>>(
            (prev, curr) => ({
              ...prev,
              [curr.id]: cart[curr.id]?.quantity || 0,
            }),
            {}
          )
        );
      } catch (err) {
        navigate('/login');
      }
    }
    fetchAllProducts();
  }, []);

  function handleDecrement(id: number) {
    const cart = JSON.parse(localStorage.getItem('cart') ?? '{}');

    const newCounts = {
      ...counts,
      [id]: counts[id] > 0 ? counts[id] - 1 : 0,
    };

    const product: any = products.find((product) => product.id === id);

    const newCart = {
      ...cart,
      [id]: {
        id: product.id,
        name: product.name,
        price: product.price,
        subTotal: Number(product.price) * newCounts[id],
        quantity: newCounts[id],
      },
    };

    localStorage.setItem('cart', JSON.stringify(newCart));

    setCounts(newCounts);
  }

  function handleIncrement(id: number) {
    const cart = JSON.parse(localStorage.getItem('cart') ?? '{}');

    const newCounts = {
      ...counts,
      [id]: counts[id] + 1,
    };

    const product: any = products.find((product) => product.id === id);

    const newCart = {
      ...cart,
      [id]: {
        id: product.id,
        name: product.name,
        price: product.price,
        subTotal: Number(product.price) * newCounts[id],
        quantity: newCounts[id],
      },
    };

    localStorage.setItem('cart', JSON.stringify(newCart));

    setCounts(newCounts);
  }

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') ?? '{}');
    const eachSutTotal: ICart[] = Object.values(cart);
    const newTotal = eachSutTotal.reduce((prev, curr): number => {
      return prev + curr.subTotal;
    }, 0);

    setTotal(newTotal);
  }, [counts]);

  function handleClearCart() {
    localStorage.removeItem('cart');
    const newCouts = products.reduce<Record<number, number>>(
      (prev, curr) => ({
        ...prev,
        [curr.id]: 0,
      }),
      {}
    );
    setCounts(newCouts);
  }

  return (
    <>
      <Row xs={1} md={2} className='g-4' style={{ marginBottom: '6rem' }}>
        {products &&
          products.map((product: IProducts, i) => (
            <Col key={product.id}>
              <Card>
                <Card.Img
                  variant='top'
                  alt={product.name}
                  height='350px'
                  width='350px'
                  src={product.urlImage}
                />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>{`R$ ${product.price.replace(
                    '.',
                    ','
                  )}`}</Card.Text>
                  <InputGroup className='mb-3'>
                    <Button
                      variant='warning'
                      onClick={() => handleDecrement(product.id)}
                    >
                      -
                    </Button>
                    <Form.Control
                      className='text-center'
                      type='number'
                      readOnly
                      value={counts[product.id]}
                    />
                    <Button
                      name='name'
                      onClick={() => handleIncrement(product.id)}
                    >
                      +
                    </Button>
                  </InputGroup>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>

      <Container style={{ position: 'fixed', bottom: 0, zIndex: '99999' }}>
        <div className='d-flex justify-content-center gap-2 mb-3'>
          <Button
            onClick={() => navigate('/customer/checkout')}
            variant='success'
            size='lg'
          >
            {`Ver Carrinho R$: ${total.toFixed(2).replace('.', ',')}`}
          </Button>
          <Button variant='danger' onClick={handleClearCart}>
            Limpar Carrinho
          </Button>
        </div>
      </Container>
    </>
  );
}
