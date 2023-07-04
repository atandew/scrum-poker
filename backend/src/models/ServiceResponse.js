export class ServiceResponse {
  constructor(success, res, err) {
    this.success = success;
    this.res = res;
    this.err = err;
  }
}
