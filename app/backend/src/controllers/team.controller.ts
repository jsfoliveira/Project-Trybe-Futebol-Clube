import { Request, Response } from 'express';

import TeamService from '../services/teams.service';

class TeamController {
  public teamService;

  constructor() {
    this.teamService = new TeamService();
  }

  public getAll = async (req: Request, res: Response) => {
    const result = await this.teamService.getAll();
    res.status(200).json(result);
  };
}

export default TeamController;
