import { Request, Response } from 'express';
import Team from '../database/models/teams';
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

  public create = async (req: Request, res: Response) => {
    const { awayTeam, homeTeam } = req.body;
    if (awayTeam === homeTeam) {
      return res.status(401).json({
        message: 'It is not possible to create a match with two equal teams',
      });
    }

    const homeTeamId = await Team.findByPk(homeTeam);
    const awayTeamId = await Team.findByPk(awayTeam);
    if (!homeTeamId || !awayTeamId) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }

    const result = await this.matchService.create(req.body);
    return res.status(201).json(result);
  };

  public update = async (req: Request, res: Response) => {
    const { id } = req.params;

    await this.matchService.update(Number(id));

    return res.status(200).json({ message: 'Updated' });
  };

  public async updateIdMatch(req: Request, res: Response):Promise<Response> {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    const result = await this.matchService.updateIdMatch(Number(id), homeTeamGoals, awayTeamGoals);
    return res.status(200).json(result);
  }
}

export default MatchController;
