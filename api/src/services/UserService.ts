import User from '../database/models/User';
import IUser from '../interfaces/IUser';
import HttpExeption from '../utils/HttpExeption';
import AbstractService from './AbstractService';

export default class UserService extends AbstractService {
  constructor() {
    super(User);
  }

  public async userInfo(email: string): Promise<object> {
    const user = await this._model.findOne({
      where: { email },
    });

    if (!user) throw new HttpExeption(404, 'Usuário não encontrado');

    return { name: user.name, role: user.role, email: user.email };
  }

  public async getSellersInfo() {
    const sellers: IUser[] = await this._model.findAll({
      where: { role: 'seller' },
    });
    return sellers.map((seller) => ({id: seller.id, name: seller.name}));
  }
}
