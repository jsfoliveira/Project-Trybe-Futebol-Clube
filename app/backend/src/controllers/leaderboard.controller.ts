import { Request, Response } from 'express';

import LeaderboardService from '../services/teams.service';

class LeaderboardController {
  public leaderboardService;

  constructor() {
    this.leaderboardService = new LeaderboardService();
  }

  public getAll = async (req: Request, res: Response) => {
    const result = await this.leaderboardService.getAll();
    res.status(200).json(result);
  };
}

export default LeaderboardController;
