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
}

export default TeamService;
