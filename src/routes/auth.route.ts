import express from 'express';
import { createUserSessionHandler, deleteUserSessionHandler, getUserSessionsHandler } from '../controllers/auth.controller';
import { deserializeUser, requireUser } from '../middlewares/auth.middleware';
import validate from '../middlewares/validateResource';
import { createAuthScema } from '../schemas/auth.schema';
import Auth from '../models/auth.model';

const authRouter = express.Router();

authRouter.post("/api/sessions",validate(createAuthScema), createUserSessionHandler);
authRouter.get("/api/sessions",requireUser, getUserSessionsHandler);
authRouter.delete("/api/sessions", requireUser, deleteUserSessionHandler);

export default authRouter;