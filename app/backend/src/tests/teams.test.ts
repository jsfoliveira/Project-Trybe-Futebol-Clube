/* eslint-disable mocha/no-mocha-arrows */
import * as sinon from 'sinon';
import * as chai from 'chai';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import Team from '../database/models/teams';
import ITeam from '../interfaces/team.interface';

chai.use(chaiHttp);

const { expect } = chai;

const mockTeam: ITeam = {
  id: 1,
  teamName: 'Avaí/Kindermann',
};

describe('Testando o Team', () => {
  // eslint-disable-next-line mocha/no-mocha-arrows
  it('Retona os times corretamente com o getAll', async () => {
    // preciso mockar os dados do team. como é uma promisse, ele vai resolver com o array de times
    sinon.stub(Team, 'findAll').resolves([mockTeam as Team]);

    // onde está a rota
    const response = await chai.request(app).get('/teams');
    const [team] = response.body as ITeam[];
    // a expectativa é que tenha um status 200
    expect(response.status).to.be.equal(200);
    expect(team.id).to.be.equal(mockTeam.id);
    expect(team.teamName).to.be.equal(mockTeam.teamName);

    // como mockou antes, precisa restaurar o mock.
    sinon.restore();
  });

  it('Retornando o time corretamente ao buscar pelo id', async () => {
    // preciso mockar os dados do team. como é uma promisse, ele vai resolver com o array de times
    sinon.stub(Team, 'findOne').resolves(mockTeam as Team);

    // onde está a rota
    const response = await chai.request(app).get('/teams/1');
    const team = response.body as ITeam;
    expect(response.status).to.be.equal(200);
    expect(team.id).to.be.equal(mockTeam.id);
    expect(team.teamName).to.be.equal(mockTeam.teamName);

    // como mockou antes, precisa restaurar o mock.
    sinon.restore();
  });
});
