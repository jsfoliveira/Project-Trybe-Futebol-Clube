import Team from '../database/models/teams';
import MatchModel from '../database/models/match';
import IMatch from '../interfaces/match.interface';
import IBodyMatch from '../interfaces/matchBody.interface';

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

  public async create(body: IBodyMatch) {
    const inProgress = 1;
    const result = await this.model.create({ ...body, inProgress });
    return result;
  }

  public update = async (id: number): Promise<void> => {
    await this.model.update({
      inProgress: false,
    }, { where: { id } });
  };

  public async updateIdMatch(id: number, homeTeamGoals: number, awayTeamGoals: number) {
    const result = await this.model.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );
    return result;
  }
}

export default MatchService;
