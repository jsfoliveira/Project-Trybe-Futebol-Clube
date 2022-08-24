/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable mocha/no-mocha-arrows */
/* eslint-disable max-lines-per-function */
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { hash } from 'bcryptjs';

import { Response } from 'superagent';
import { app } from '../app';

import IUser from '../interfaces/user.interface';
import { IBodyUser } from '../interfaces/bodyUser.interface';

import User from '../database/models/users';

chai.use(chaiHttp);

const { expect } = chai;

const loginOk: IUser = {
  email: 'admin@admin.com',
  password: '123456',
};

const loginWrong: IUser = {
  email: 'admin@xablau.com',
  password: 'senha_invalida',
};

const user: IBodyUser = {
  id: 1,
  email: 'admin@admin.com',
  password: '123456',
  username: 'admin',
  role: 'admin',
};

let chaiHttpResponse: Response;

describe('Testando o User', () => {
  describe('Retorno em caso de sucesso', () => {
    it('Deverá retornar um token em caso de sucesso', async () => {
      const hashPassword = await hash('123456', 8);
      // preciso mockar os dados do User. como é uma promisse, ele vai resolver com todos os users e hashPassword
      sinon.stub(User, 'findOne').resolves({ ...user, password: hashPassword } as User);

      // onde está a rota e qual dado vai conter nessa rota
      chaiHttpResponse = await chai.request(app).post('/login').send(loginOk);

      // a expectativa é de que tenha a chave token e não seja undefined
      expect(chaiHttpResponse.body).to.have.key('token').and.not.to.be.an('undefined');
    });
  });

  describe('Retorno em caso de fracasso', () => {
    beforeEach(async () => {
      sinon.restore();
    });

    after(() => {
      (User.findOne as sinon.SinonStub).restore();
    });

    it('Retorna um status 400 caso o email não seja preenchido', async () => {
      const { email, ...dataEmail } = loginWrong;
      chaiHttpResponse = await chai.request(app).post('/login').send(dataEmail);
      expect(chaiHttpResponse).to.have.status(400);
      expect(chaiHttpResponse.body).to.have.property('message', 'All fields must be filled');
    });

    it('Retorna um status 400 caso o password não seja preenchido', async () => {
      const { password, ...dataPassword } = loginWrong;
      chaiHttpResponse = await chai.request(app).post('/login').send(dataPassword);
      expect(chaiHttpResponse).to.have.status(400);
      expect(chaiHttpResponse.body).to.have.property('message', 'All fields must be filled');
    });

    it('deverá retornar status 401 caso o email seja inválido', async () => {
      // preciso mockar os dados do User. como é uma promisse, ele vai resolver com null
      sinon.stub(User, 'findOne').resolves(null);

      // a rota /login deve enviar o dado loginOk
      chaiHttpResponse = await chai.request(app).post('/login').send(loginOk);

      // a expectativa é de que gere um status 401
      expect(chaiHttpResponse).to.be.have.status(401);
      // a expectativa é de que gere tal propriedade
      expect(chaiHttpResponse.body).to.have.property('message', 'Incorrect email or password');
    });

    it('deverá retornar status 401 caso o password seja inválido', async () => {
      const hashPassword = await hash('123456', 8);

      sinon.stub(User, 'findOne').resolves({ ...user, password: hashPassword } as User);

      chaiHttpResponse = await chai.request(app).post('/login').send(loginWrong);

      expect(chaiHttpResponse).to.be.have.status(401);

      expect(chaiHttpResponse.body).to.have.property('message', 'Incorrect email or password');
    });
  });

  describe('Validado o token', () => {
    after(() => {
      (User.findOne as sinon.SinonStub).restore();
    });

    it('Retorna status 401 quando não gera token', async () => {
      const hashPassword = await hash('123456', 8);

      sinon.stub(User, 'findOne').resolves({ ...user, password: hashPassword } as User);

      chaiHttpResponse = await chai.request(app).get('/login/validate');

      expect(chaiHttpResponse).to.have.status(401);

      expect(chaiHttpResponse.body).to.have.property('message', 'invalid token');
    });

    it('Retorna role quando o token passado é válido', async () => {
      const { body: { token } } = await chai.request(app).post('/login').send(loginOk);

      chaiHttpResponse = await chai.request(app).get('/login/validate').set('Authorization', token);

      expect(chaiHttpResponse.body).to.have.property('role', 'admin');
    });
  });
});
