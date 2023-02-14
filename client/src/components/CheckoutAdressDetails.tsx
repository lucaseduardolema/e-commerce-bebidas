import { useEffect, useState } from 'react';
import { Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import { getSellersData } from '../services/sellersRequests';

type TSellers = {
  id: number
  name: string
}

export default function CheckoutAdressDetails() {
  const [sellers, setSellers] = useState<TSellers[]>([])

  useEffect(() => {
    async function fetchSellersData() {
      const accessToken = JSON.parse(localStorage.getItem('accessToken') || '')
      const {data} = await getSellersData(accessToken)
      setSellers(data)
    }
    fetchSellersData()
  }, [])

  return (
    <>
      <h2>Endereço para entrega</h2>
      <Row className='g-2'>
        <Col md>
          <FloatingLabel
            controlId='floatingInputGrid'
            label='Endereço de entrega'
          >
            <Form.Control type='text' placeholder='rua x bairro y' />
          </FloatingLabel>
        </Col>

        <Col md>
          <FloatingLabel controlId='floatingInputGrid' label='Número'>
            <Form.Control type='number' placeholder='xxxx' />
          </FloatingLabel>
        </Col>

        <Col md>
          <FloatingLabel
            controlId='floatingSelectGrid'
            label='Escolha o vendedor'
          >
            <Form.Select aria-label='Floating label select example'>
              {sellers.map((seller) => (
                <option key={seller.id} value={seller.id}>{seller.name}</option>
              ))}
            </Form.Select>
          </FloatingLabel>
        </Col>
      </Row>
    </>
  );
}
