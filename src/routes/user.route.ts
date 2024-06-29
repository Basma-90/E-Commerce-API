import { Router } from 'express';
import { createUserHandler } from '../controllers/user.controller';
import validate from '../middlewares/validateResource';
import { createUserSchema } from '../schemas/user.schema';

const userRouter = Router();

userRouter.post('/api/users', validate(createUserSchema), createUserHandler);


export default userRouter;


