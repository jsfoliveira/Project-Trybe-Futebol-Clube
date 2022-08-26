import LeaderboardModel from '../database/models/teams';
import ILeaderboard from '../interfaces/team.interface';

class LeaderboardService {
  public model;

  constructor() {
    this.model = LeaderboardModel;
  }

  public async getAll(): Promise<ILeaderboard[]> {
    const result = await this.model.findAll();
    return result as ILeaderboard[];
  }
}

export default LeaderboardService;
