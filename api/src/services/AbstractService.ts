export default abstract class AbstractService {
  protected _model;

  constructor(model: any) {
    this._model = model;
  }
}
