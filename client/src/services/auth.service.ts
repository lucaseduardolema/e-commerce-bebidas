import axios from "axios";
import ILogin from "../interfaces/ILogin";

const api = axios.create({
  baseURL: `http://localhost:${process.env.REACT_APP_API_PORT || '3001'}`
})

export async function postLogin(body: ILogin) {
  return api.post('/login', body)
}
