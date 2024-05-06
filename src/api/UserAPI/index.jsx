import { PRIVATE, http } from "../http";

/**
 * @typedef {Object} TUserPassword
 * @property {string} password
 * @property {string} new_password
 */

/**
 * User API Service.
 */
class UserAPI {

  /**
   * @private
   */
  BASE;

  constructor() {
    this.BASE = PRIVATE + "user"
  };

  async get() {
    const response = await http.get(`${this.BASE}/whoami`);
    return response;
  };

  async getBalance() {
    const response = await http.get(`${this.BASE}/balance`);
    return response;
  };

  /**
   * @param {string} accountNumber 
   */
  async getByAccount(accountNumber) {
    const response = await http.get(`${this.BASE}/account/${accountNumber}`);
    return response;
  };

  /**
   * @param {TUserPassword} values 
   */
  async updatePassword(values) {
      const response = await http.patch(`${this.BASE}/password`, values);
      return response.data;
  };

};

export default UserAPI;