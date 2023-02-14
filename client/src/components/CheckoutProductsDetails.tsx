import { useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import ICart from '../interfaces/ICart';

export default function CheckoutProductsDetails() {
  const cart = JSON.parse(localStorage.getItem('cart') || '{}');
  const arrCart: ICart[] = Object.values(cart);
  const [products, setProducts] = useState(arrCart);

  function handleRemove(id: number) {
    const filtered = products.filter((product) => product.id !== id);
    const newCart = filtered.reduce(
      (prev, curr) => ({
        ...prev,
        [curr.id]: curr,
      }),
      {}
    );
    localStorage.setItem('cart', JSON.stringify(newCart));
    setProducts(filtered);
  }

  return (
    <>
      <h2>Detalhes do pedido</h2>
      <Table striped>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor unitário</th>
            <th>Sub-total</th>
            <th>Remover Item</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product, i) => (
            <tr key={product.id}>
              <td>{i + 1}</td>
              <td>{product.name}</td>
              <td>{product.quantity}</td>
              <td>{`R$ ${product.price.replace('.', ',')}`}</td>
              <td>{`R$ ${product.subTotal.toFixed(2).replace('.', ',')}`}</td>
              <td>
                <Button onClick={() => handleRemove(product.id)}>
                  Remover
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className='text-center mb-4'>
        {`Total: R$ ${products
          .reduce((prev, curr) => prev + curr.subTotal, 0)
          .toFixed(2)
          .replace('.', ',')}`}
      </div>
    </>
  );
}
