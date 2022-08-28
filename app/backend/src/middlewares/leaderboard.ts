import ILeaderboard from '../interfaces/leaderboard.interface';
import Matches from '../database/models/match';

// total de pontos
export function totalPoint(matches: Matches[]) {
  // O valor inicial
  let totalPoints = 0;

  matches.forEach((element) => {
    // Precisa ser do maior pra o menor
  // O time vitorioso: marcará +3 pontos
    if (element.homeTeamGoals > element.awayTeamGoals) {
      totalPoints += 3;
      // Em caso de empate: ambos os times marcam +1 ponto
    } else if (element.homeTeamGoals === element.awayTeamGoals) {
      totalPoints += 1;
      // O time perdedor: marcará 0 pontos
    } else if (element.homeTeamGoals < element.awayTeamGoals) {
      totalPoints += 0;
    }
  });
  return {
    totalPoints,
  };
}

// Aproveitamento do time (%), que é a porcentagem de jogos ganhos
// O seu resultado deverá ser limitado a duas casas decimais
export function efficiency(points: number, games: number) {
  return Number(((points / (games * 3)) * 100).toFixed(2));
}

// quadro de classificação
export function classification(table: ILeaderboard[]) {
  // Gols marcados a favor - gols sofridos
// Precisa ser decrescente, maior valor menos menor valor
  const order = table.sort((a, b) => b.totalPoints - a.totalPoints
  // Ordem de desempate: 1º Total de Vitórias; 2º Saldo de gols; 3º Gols a favor; 4º Gols sofridos.
  || b.totalVictories - a.totalVictories
  || b.goalsBalance - a.goalsBalance
  || b.goalsFavor - a.goalsFavor
  || a.goalsOwn - b.goalsOwn);

  return order;
}

export function score(matches: Matches[]) {
  let victories = 0;
  let draws = 0;
  let losses = 0;

  matches.forEach((element) => {
    if (element.homeTeamGoals > element.awayTeamGoals) {
      victories += 1;
    } else if (element.homeTeamGoals === element.awayTeamGoals) {
      draws += 1;
    } else if (element.homeTeamGoals < element.awayTeamGoals) {
      losses += 1;
    }
  });
  return {
    victories, draws, losses,
  };
}

export function goals(matches: Matches[]) {
  let goalsFavor = 0;
  let goalsOwn = 0;

  matches.forEach((element) => {
    goalsFavor += element.homeTeamGoals;
    goalsOwn += element.awayTeamGoals;
  });
  return {
    goalsFavor, goalsOwn, goalsBalance: goalsFavor - goalsOwn,
  };
}
