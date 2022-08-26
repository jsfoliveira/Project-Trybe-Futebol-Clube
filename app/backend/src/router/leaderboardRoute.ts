import { Router, Request, Response } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';

const leaderboardRouter = Router();

const leaderboardController = new LeaderboardController();

const getAll = async (req: Request, res: Response) => {
  await leaderboardController.getAll(req, res);
};

leaderboardRouter.get('/home', getAll);

export default leaderboardRouter;
