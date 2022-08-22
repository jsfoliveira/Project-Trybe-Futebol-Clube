import TeamModel from '../database/models/teams';
import ITeam from '../interfaces/team.interface';

class TeamService {
  public model;

  constructor() {
    this.model = TeamModel;
  }

  public async getAll(): Promise<ITeam[]> {
    const result = await this.model.findAll();
    return result as ITeam[];
  }

  public async getById(id: number) {
    const result = await this.model.findOne({ where: { id } });
    return result;
  }
}

export default TeamService;
