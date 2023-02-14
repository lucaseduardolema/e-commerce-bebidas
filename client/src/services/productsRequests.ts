import axios, { AxiosResponse } from "axios";
import IProducts from "../interfaces/IProducts";

const api = axios.create({
  baseURL: `http://localhost:${process.env.REACT_APP_API_PORT || '3001'}`
})

export async function getAllProducts(token: string): Promise<AxiosResponse<IProducts[]>> {
  const config = {
    headers: { Authorization: token },
  };
  return api.get('/get-products', config)
}
