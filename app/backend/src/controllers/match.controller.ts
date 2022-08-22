import { Request, Response } from 'express';

import MatchService from '../services/match.service';

class MatchController {
  public matchService;

  constructor() {
    this.matchService = new MatchService();
  }

  public getAll = async (req: Request, res: Response) => {
    const result = await this.matchService.getAll();
    res.status(200).json(result);
  };
}

export default MatchController;
