import { Request, Response } from 'express';
import TeamService from '../services/teams.service';

class TeamController {
  teamService;
  constructor() {
    this.teamService = new TeamService();
  }

  getAll = async (req: Request, res: Response) => {
    const result = await this.teamService.getAll();
    return res.status(200).json(result);
  };

  getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    // como usou o autoincrement, precisa converter pra number o id
    const result = await this.teamService.getById(Number(id));
    return res.status(200).json(result);
  };
}

export default TeamController;
