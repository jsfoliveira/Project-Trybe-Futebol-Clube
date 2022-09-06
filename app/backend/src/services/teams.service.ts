import TeamModel from '../database/models/teams';
import ITeam from '../interfaces/team.interface';

class TeamService {
  teamModel;
  constructor() {
    this.teamModel = TeamModel;
  }

  // findMany também pode substituir o findAll
  async getAll() {
    const result = await this.teamModel.findAll();
    return result as ITeam[];
  }

  // findUnique também pode substituir o findOne
  async getById(id: number) {
    const result = await this.teamModel.findOne({ where: { id } });
    return result;
  }
}

export default TeamService;
