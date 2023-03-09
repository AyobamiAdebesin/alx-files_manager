const redis = require('redis');
/**
 * RedisClient wrapper class
 */

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.client.on('error', (err) => console.log(`Redis Client Error ${err}`));
  }

  isAlive() {
    if (this.client.connect()) {
      return true;
    }
    return false;
  }

  async get(key) {
    await this.client.get(key);
  }

  async set(key, value, duration) {
    await this.client.set(key, value, { EX: duration });
  }

  async del(key) {
    await this.client.internal_send_command(['DEL', key]);
  }
}

const redisClient = RedisClient();
module.exports = redisClient;
