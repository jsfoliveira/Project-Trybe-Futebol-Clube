import Teams from '../database/models/teams';
import Matches from '../database/models/match';
import ITable from '../interfaces/table.interface';
import { totalPoint, score, efficiency,
  goals, classification } from '../middlewares/leaderboard';

export default class LeaderboardService {
  private _teamModel = Teams;

  async getAll() {
    const teamsAndMatches = await this._teamModel.findAll({ include: [
      { model: Matches, as: 'homeMatches', where: { inProgress: false } },
      { model: Matches, as: 'awayMatches', where: { inProgress: false } },
    ] }) as unknown as ITable[];

    const table = teamsAndMatches.map((element) => {
      const points = totalPoint(element.homeMatches);
      return { name: element.teamName,
        totalPoints: points.totalPoints,
        totalGames: element.homeMatches.length,
        totalVictories: score(element.homeMatches).victories,
        totalDraws: score(element.homeMatches).draws,
        totalLosses: score(element.homeMatches).losses,
        goalsFavor: goals(element.homeMatches).goalsFavor,
        goalsOwn: goals(element.homeMatches).goalsOwn,
        goalsBalance: goals(element.homeMatches).goalsBalance,
        efficiency: efficiency(points.totalPoints, element.homeMatches.length) };
    });

    return classification(table);
  }
}
