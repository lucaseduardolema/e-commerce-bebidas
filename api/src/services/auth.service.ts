import User from "../database/models/User";

export default class AuthService {
  private _userModel

  constructor() {
    this._userModel = User
  }

  async login() {
    // await this._userModel.fi
  }
}
