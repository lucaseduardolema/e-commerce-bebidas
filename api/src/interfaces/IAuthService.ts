import ILogin from "./ILogin";
import IRegister from "./IRegister";

export default interface IAuthService {
  login(data: ILogin): Promise<string>
  registerCustomer(data: IRegister): Promise<string>
}
