import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.service';

export default class LeaderbordsController {
  private _leaderboardService;

  constructor() {
    this._leaderboardService = new LeaderboardService();
  }

  async getAll(req: Request, res: Response) {
    const result = await this._leaderboardService.getAll();
    res.status(200).json(result);
  }
}
