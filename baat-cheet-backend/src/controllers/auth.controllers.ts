import { Request, Response } from "express";

export const signUp = (req: Request, res: Response) => {
    res.send("signUp route test");
};

export const logIn = (req: Request, res: Response) => {
    res.send("logIn route test");
};

export const logOut = (req: Request, res: Response) => {
    res.send("logOut route test");
};
