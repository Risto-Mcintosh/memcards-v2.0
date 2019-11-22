import { Request, Response } from 'express';

export default class MongoService {
  public sayHi(req: Request, res: Response): Response {
    return res.send('yo again');
  }
}
