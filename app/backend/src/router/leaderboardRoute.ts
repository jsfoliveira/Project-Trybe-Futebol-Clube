import { Router } from 'express';
import LeaderbordsController from '../controllers/leaderboard.controller';

const leaderboardController = new LeaderbordsController();

const leaderboardRoute = Router();

leaderboardRoute.get('/home', (req, res) => leaderboardController.getAll(req, res));

export default leaderboardRoute;
