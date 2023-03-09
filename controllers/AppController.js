import dbClient from '../utils/db';
import { redisClient } from '../utils/redis';

class AppController {
  static getStatus(req, res) {
    if (dbClient.isAlive() && redisClient.isAlive()) {
      return res.status(200).send({ redis: true, db: true });
    }
    return res.send({ error: 404 });
  }

  static getStats(req, res) {
    const nUsers = dbClient.nbUsers();
    const nFiles = dbClient.nbUsers();

    return res.status(200).send({ users: nUsers, files: nFiles });
  }
}
module.exports = AppController;
