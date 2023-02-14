import IRegister from "./IRegister";

export default interface IUser extends IRegister {
  id?: number
  role: 'seller' | 'customer' | 'administrator'
}
