import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:${process.env.REACT_APP_API_PORT || '3001'}`
})

export async function getAllProducts(token: string) {
  const config = {
    headers: { Authorization: token },
  };
  return api.get('/get-products', config)
}
