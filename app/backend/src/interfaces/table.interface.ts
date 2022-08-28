import Matches from '../database/models/match';

export default interface ITable {
  id: number,
  teamName: string,
  homeMatches: Matches[],
  awayMatches: Matches[],
}
