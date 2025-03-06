import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";

export const validateDTO = (DTOClass: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const instance = plainToInstance(DTOClass, req.body);
    const errors = await validate(instance);
    if (errors.length > 0) {
      res.status(400).json({ errors });
      return
    }
    next();
  };
};
