import TeamModel from '../database/models/teams';
import MatchModel from '../database/models/match';
import IMatch from '../interfaces/match.interface';
import IBodyMatch from '../interfaces/matchBody.interface';

class MatchService {
  matchemodel;

  constructor() {
    this.matchemodel = MatchModel;
  }

  // Desenvolva o endpoint `/matches` de forma que os dados apareçam corretamente na tela de partidas no front-end.
  getAll = async () => {
    // os team_name vão ser os teamHome e teamAway do Team
    // precisa excluir o id
    const result = await this.matchemodel.findAll({ include: [
      { model: TeamModel, as: 'teamHome', attributes: { exclude: ['id'] } },
      { model: TeamModel, as: 'teamAway', attributes: { exclude: ['id'] } },
    ] });
    return result as unknown as IMatch[];
  };

  // Desenvolva o endpoint `/matches` de modo que seja possível salvar uma partida com o status de inProgress como true no banco de dados
  create = async (body: IBodyMatch) => {
    // filtrando as partidas em andamento
    const result = await this.matchemodel.create(
      { inProgress: true, ...body },
    );
    return result;
  };

  // Desenvolva o endpoint `/matches/:id/finish` de modo que seja possível alterar o status inProgress de uma partida para false no banco de dados
  update = async (id: number) => {
    await this.matchemodel.update(
      { inProgress: false },
      { where: { id } },
    );
  };

  // Desenvolva o endpoint `/matches/:id` de forma que seja possível atualizar partidas em andamento
  updateIdMatch = async (id: number, homeTeamGoals: number, awayTeamGoals: number) => {
    const result = await this.matchemodel.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );
    return result;
  };
}

export default MatchService;
