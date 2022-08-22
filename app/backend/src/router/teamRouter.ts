import { Router, Request, Response } from 'express';
import TeamController from '../controllers/team.controller';

const teamRouter = Router();

const teamController = new TeamController();

const getAll = async (req: Request, res: Response) => {
  await teamController.getAll(req, res);
};

teamRouter.get('/', getAll);

const getById = async (req: Request, res: Response) => {
  await teamController.getById(req, res);
};

teamRouter.get('/:id', getById);

export default teamRouter;
