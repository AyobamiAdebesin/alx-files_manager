const redis = require('redis');

/**
 * RedisClient is a wrapper class for the redis client
 * of node-redis library
 */

class RedisClient {
  constructor() {
    this.redisClient = redis.createClient();
    this.redisClient.on('error', (err) => console.log(`Redis Client Error ${err}`));
  }

  // Check the status of the connection of the client to the backend.
  isAlive() {
    if (this.redisClient.connected) {
      return true;
    }
    return false;
  }

  // Get the value using a key
  async get(key) {
    await this.redisClient.get(key);
  }

  // Set a key-value pair with expiration
  async set(key, value, duration) {
    await this.redisClient.set(key, value);
    await this.redisClient.expire(key, duration);
  }

  // Delete a value by key
  async del(key) {
    await this.redisClient.sendCommand(['DEL', key]);
  }
}

const myRedisClient = new RedisClient();
module.exports = myRedisClient;
