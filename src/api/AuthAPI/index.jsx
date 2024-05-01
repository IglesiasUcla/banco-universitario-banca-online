import { PUBLIC, http } from "../http";

/**
 * Auth API Service.
 */
class AuthAPI {

  /**
   * @private
   */
  BASE;

  constructor() {
    this.BASE = PUBLIC + "user"
  };

  async login(values) {
    const response = await http.post(`${this.BASE}/login`, values);
    return response;
  };

  async register(values) {
    const response = await http.post(`${this.BASE}/register`, values);
    return response;
  }
};

export default AuthAPI;