import { PRIVATE, http } from "../http";

/**
 * @typedef {Object} TContact
 * @property {string} alias
 * @property {string | null} account_number
 * @property {string} description
 */

/**
 * @typedef {Object} TContactArrayResponse
 * @property {TContact[]} data
 * @property {Object[]} errors
 * @property {String} message
 */

/**
 * @typedef {Object} TContactResponse
 * @property {TContact} data
 * @property {Object[]} errors
 * @property {String} message
 */

/**
 * Contact API Service.
 */
class ContactAPI {

  /**
   * @private
   */
  BASE;

  constructor() {
    this.BASE = PRIVATE + "contact"
  };

  /**
   * @param {string} ID 
   * @returns {Promise<TContactResponse>}
   */
  async get(ID) {
    const { data } = await http.get(`${this.BASE}/${ID}`);
    return data;
  };

  /**
   * 
   * @param {String} alias 
   * @returns {Promise<TContactArrayResponse}
   */
  async getAll(alias = "") {
    const { data } = await http.get(`${this.BASE}?alias=${alias}`);
    return data;
  };

  /**
   * @param {TContact} values 
   */
  async create(values) {
    const response = await http.post(`${this.BASE}`, values);
    return response;
  };

  /**
   * @param {string} ID
   * @param {TContact} values 
   */
  async update(ID, values) {
    const response = await http.patch(`${this.BASE}/${ID}`, values);
    return response;
  };

  /**
 * @param {string} ID
 */
  async delete(ID) {
    const response = await http.delete(`${this.BASE}/${ID}`);
    return response;
  };

};

export default ContactAPI;