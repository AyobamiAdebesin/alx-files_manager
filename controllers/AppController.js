import dbClient from '../utils/db';
import { redisClient } from '../utils/redis';

class AppController {
  static getStatus(req, res) {
    if (dbClient.isAlive() && redisClient.isAlive()) {
      res.status(200).json({ redis: true, db: true });
    }
  }

  static async getStats(req, res) {
    const nUsers = await dbClient.nbUsers();
    const nFiles = await dbClient.nbUsers();

    res.status(200).json({ users: nUsers, files: nFiles });
  }
}
module.exports = AppController;
