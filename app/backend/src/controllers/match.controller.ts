import { Request, Response } from 'express';
import Team from '../database/models/teams';
import MatchService from '../services/match.service';

class MatchController {
  matchService;
  constructor() {
    // instancio o matchService
    this.matchService = new MatchService();
  }

  getAll = async (req: Request, res: Response) => {
    const result = await this.matchService.getAll();
    return res.status(200).json(result);
  };

  // Não é possível inserir uma partida com times iguais
  create = async (req: Request, res: Response) => {
    const { awayTeam, homeTeam } = req.body;
    if (awayTeam === homeTeam) {
      return res.status(401).json({
        message: 'It is not possible to create a match with two equal teams',
      });
    }

    // Não é possível inserir uma partida com um time que não existe na tabela teams
    const homeTeamId = await Team.findByPk(homeTeam);
    const awayTeamId = await Team.findByPk(awayTeam);
    if (!homeTeamId || !awayTeamId) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }

    const result = await this.matchService.create(req.body);
    return res.status(201).json(result);
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;

    await this.matchService.update(Number(id));

    return res.status(200).json({ message: 'Updated' });
  };

  updateIdMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    const result = await this.matchService.updateIdMatch(Number(id), homeTeamGoals, awayTeamGoals);
    return res.status(200).json(result);
  };
}

export default MatchController;
