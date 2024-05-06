import { PRIVATE, http } from "../http";

/**
 * @typedef {Object} TOperation
 * @property {number} amount
 * @property {string} account_number
 * @property {string} description
 * @property {string} created_at
 */
/**
 * @typedef {Object} TOperationArrayResponse
 * @property {TOperation[]} data
 * @property {Object[]} errors
 * @property {String} message
 */
/**
 * @typedef {Object} TOperationResponse
 * @property {TOperation} data
 * @property {Object[]} errors
 * @property {String} message
 */

/**
 * Movement API Service.
 */
class MovementAPI {

  /**
   * @private
   */
  BASE;

  constructor() {
    this.BASE = PRIVATE + "movement"
  };

  async getAllMovements(page = 1, pagSize = 10) {
    const { data } = await http.get(`${this.BASE}?page=${page}&page_size=${pagSize}`);
    return data;
  };

  async getCredits(page = 1, pagSize = 10) {
    const { data } = await http.get(`${this.BASE}?page=${page}&page_size=${pagSize}&multiplier=1`);
    return data;
  };

  async getDebits(page = 1, pagSize = 10) {
    const { data } = await http.get(`${this.BASE}?page=${page}&page_size=${pagSize}&multiplier=-1`);
    return data;
  };

  /**
   * @param {TOperation} values 
   */
  async transfer(values) {
    const response = await http.post(`${this.BASE}`, values);
    return response;
  };

};

export default MovementAPI;
