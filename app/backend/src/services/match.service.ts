import Team from '../database/models/teams';
import MatchModel from '../database/models/match';
import IMatch from '../interfaces/match.interface';

class MatchService {
  public model;

  constructor() {
    this.model = MatchModel;
  }

  public async getAll(): Promise<IMatch[]> {
    const result = await this.model.findAll({ include: [
      { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
      { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
    ] });
    return result as unknown as IMatch[];
  }
}

export default MatchService;
