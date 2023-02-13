import axios from "axios";
import ILogin from "../interfaces/ILogin";
import IRegister from "../interfaces/IRegister";

const api = axios.create({
  baseURL: `http://localhost:${process.env.REACT_APP_API_PORT || '3001'}`
})

export async function postLogin(body: ILogin) {
  return api.post('/login', body)
}

export async function postRegister(body: IRegister) {
  return api.post('/register-costumer', body)
}

export async function getUserInfo(token: string) {
  const config = {
    headers: { Authorization: token },
  };
  return api.get('/user-info', config)
}
