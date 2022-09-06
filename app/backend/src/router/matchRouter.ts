import { Router } from 'express';
import MatchController from '../controllers/match.controller';
import validation from '../middlewares/tokenValidation';

const matchRouter = Router();

const matchController = new MatchController();

matchRouter.get('/', matchController.getAll);

// o validation é para que não seja possível inserir uma partida sem um token válido
matchRouter.post('/', validation, matchController.create);

matchRouter.patch('/:id/finish', matchController.update);

matchRouter.patch('/:id', matchController.updateIdMatch);

export default matchRouter;
