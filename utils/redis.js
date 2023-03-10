import { promisify } from 'util';
import { createClient } from 'redis';

/**
 * Represents a Redis client.
 */
class RedisClient {
  /**
   * Creates a new RedisClient instance.
   */
  constructor() {
    this.client = createClient();
    this.isClientConnected = true;
    this.client.on('error', (err) => {
      console.error('Redis client failed to connect:', err.message || err.toString());
      this.isClientConnected = false;
    });
    this.client.on('connect', () => {
      this.isClientConnected = true;
    });
  }

  /**
   * Checks if this client's connection to the Redis server is active.
   * @returns {boolean}
   */
  isAlive() {
    return this.isClientConnected;
  }

  /**
   * Retrieves the value of a given key.
   * @param {String} key The key of the item to retrieve.
   * @returns {String | Object}
   */
  async get(key) {
    return promisify(this.client.GET).bind(this.client)(key);
  }

  /**
   * Stores a key and its value along with an expiration time.
   * @param {String} key The key of the item to store.
   * @param {String | Number | Boolean} value The item to store.
   * @param {Number} duration The expiration time of the item in seconds.
   * @returns {Promise<void>}
   */
  async set(key, value, duration) {
    await promisify(this.client.SETEX)
      .bind(this.client)(key, duration, value);
  }

  /**
   * Removes the value of a given key.
   * @param {String} key The key of the item to remove.
   * @returns {Promise<void>}
   */
  async del(key) {
    await promisify(this.client.DEL).bind(this.client)(key);
  }
}

const redisClient = new RedisClient();
export default redisClient;
// const redis = require('redis');
// const { promisify } = require('util');
// /**
//  * RedisClient is a wrapper class for the redis client
//  * of node-redis library
//  */

// class RedisClient {
//   constructor() {
//     this.redisClient = redis.createClient();
//     this.redisClient.on('error', (err) => console.log(`Redis Client Error ${err}`));
//   }

//   // Check the status of the connection of the client to the backend.
//   isAlive() {
//     if (this.redisClient.connected) {
//       return true;
//     }
//     return false;
//   }

//   // Get the value using a key
//   async get(key) {
//     await this.redisClient.get(key);
//   }

//   // Set a key-value pair with expiration
//   async set(key, value, duration) {
//     await this.redisClient.set(key, value);
//     await this.redisClient.expire(key, duration);
//   }

//   // Delete a value by key
//   async del(key) {
//     await this.redisClient.sendCommand(['DEL', key]);
//   }
// }

// const myRedisClient = new RedisClient();
// module.exports = myRedisClient;
