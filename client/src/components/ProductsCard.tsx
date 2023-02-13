import { Card, Col, Row } from 'react-bootstrap';
import IProducts from '../interfaces/IProducts';

type Props = {
  products: IProducts[];
};

export default function ProductsCard({ products }: Props) {
  return (
    <>
      <Row xs={1} md={2} className='g-4'>
        {products.map((product: IProducts) => (
          <Col key={product.id}>
            <Card>
              <Card.Img variant='top' src={product.urlImage} />
              <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>{product.price}</Card.Text>
            </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}

// ProductsCard.propTypes = {
//   products: PropTypes.arrayOf(PropTypes.shape({
//     name: PropTypes.string,
//     price: PropTypes.string,
//     urlImage: PropTypes.string
//   })).isRequired,
// };
