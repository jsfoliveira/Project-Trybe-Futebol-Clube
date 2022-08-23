/* eslint-disable mocha/no-mocha-arrows */
import * as sinon from 'sinon';
import * as chai from 'chai';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import Match from '../database/models/match';
import IMatch from '../interfaces/match.interface';

chai.use(chaiHttp);

const { expect } = chai;

const mockMatch: IMatch = {
  id: 1,
  homeTeam: 16,
  homeTeamGoals: 1,
  awayTeam: 8,
  awayTeamGoals: 1,
  inProgress: false,
  teamHome: {
    teamName: 'São Paulo',
  },
  teamAway: {
    teamName: 'Grêmio',
  },
};

describe('Testando o Match', () => {
  // eslint-disable-next-line mocha/no-mocha-arrows
  it('Retona os dados corretamente com o getAll', async () => {
    // preciso mockar os dados do match. como é uma promisse, ele vai resolver os dados
    sinon.stub(Match, 'findAll').resolves([mockMatch as unknown as Match]);

    // onde está a rota
    const response = await chai.request(app).get('/matches');
    const [match] = response.body as IMatch[];
    // a expectativa é que tenha um status 200
    expect(response.status).to.be.equal(200);
    // a expectativa é que no body tenha tais informações
    expect(match.id).to.be.equal(mockMatch.id);
    expect(match.homeTeam).to.be.equal(mockMatch.homeTeam);
    expect(match.homeTeamGoals).to.be.equal(mockMatch.homeTeamGoals);
    expect(match.awayTeam).to.be.equal(mockMatch.awayTeam);
    expect(match.awayTeamGoals).to.be.equal(mockMatch.awayTeamGoals);
    expect(match.inProgress).to.be.equal(mockMatch.inProgress);
    expect(match.teamHome).to.deep.equal(mockMatch.teamHome);
    expect(match.teamAway).to.deep.equal(mockMatch.teamAway);

    // como mockou antes, precisa restaurar o mock.
    sinon.restore();
  });
});
