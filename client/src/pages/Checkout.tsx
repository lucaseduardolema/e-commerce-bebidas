import { Container } from "react-bootstrap";
import CheckoutAdressDetails from "../components/CheckoutAdressDetails";
import CheckoutProductsDetails from "../components/CheckoutProductsDetails";
import NavBar from "../components/NavBar";

export default function Checkout() {
  return (
    <>
      <NavBar />
      <Container>
        <CheckoutProductsDetails />
        <CheckoutAdressDetails />
      </Container>
    </>
  )
}
