import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as database from "../models/user/userDatabase"
import { ResponseTemplates } from '../helpers/responseTemplates';
import { User } from "../models/user/userInterface"

export const getUsers = async (req: Request, res: Response) => {
    try {
        const allUsers: User[] = await database.loadUsers();

        if (allUsers.length === 0) {
            const msg = `No users at this time..`;
            return ResponseTemplates.success(msg, StatusCodes.NOT_FOUND, res);
        }

        const data = {
            count: allUsers.length,
            users: allUsers
        };
        return ResponseTemplates.success(null, StatusCodes.OK, res, data);
    } catch (error) {
        return ResponseTemplates.success(null, StatusCodes.INTERNAL_SERVER_ERROR, res, error);
    }
};