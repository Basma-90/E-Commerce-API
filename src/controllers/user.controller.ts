import { Request, Response } from "express";
import { omit } from "lodash";
import { CreateUserInput } from "../schemas/user.schema";
import { createUser } from "../services/user.services";

export async function createUserHandler(
    req: Request<{}, {}, CreateUserInput["body"]>,
    res: Response
) {
    try {
        const input={
            email:req.body.email,
            name:req.body.name,
            password:req.body.password
        }
        const user = await createUser(input);
        console.log("user",user);
        return res.send(user);
    } catch (e: any) {
        return res.status(409).send(e.message);
    }
}