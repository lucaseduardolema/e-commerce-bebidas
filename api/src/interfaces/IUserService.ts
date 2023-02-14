export default interface IUserService {
  userInfo(email: string): Promise<object>
  getSellersInfo(): Promise<Array<object>>
}
