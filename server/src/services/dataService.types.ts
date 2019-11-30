import { Request, Response } from 'express';

export interface DataService {
  login(req: Request, res: Response): Promise<Response> | void;
  createUser(req: Request, res: Response): Promise<Response> | void;
  getAllDecks(req: Request, res: Response): Promise<Response> | void;
  createDeck(req: Request, res: Response): Promise<Response> | void;
  deleteDeck(req: Request, res: Response): Promise<Response> | void;
  createCard(req: Request, res: Response): Promise<Response> | void;
  editCard(req: Request, res: Response): Promise<Response> | void;
  deleteCard(req: Request, res: Response): Promise<Response> | void;
}
