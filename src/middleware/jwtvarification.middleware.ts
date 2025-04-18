import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
  userId?: number;
  role?: string;
  userEmail?: string;
}

export const verifyJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers["x-access-token"] as string;
    if (!token) {
      res.status(401).json({
        error: "Token not provided",
      });
      return;
    }

    const decodedToken = jwt.verify(
      token,
      "hello_world_brother_haha"
    ) as JwtPayload;
    console.log(decodedToken);
    if (!decodedToken.id || !decodedToken.role) {
      res.status(403).json({
        error: "Unauthorized access attempt invalid token",
      });
    }
    (req as AuthenticatedRequest).userId = Number(decodedToken.id);
    (req as AuthenticatedRequest).userEmail = decodedToken.email;
    (req as AuthenticatedRequest).role = decodedToken.role;
    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    res.status(401).json({
      error: "Invalid token",
    });
    return;
  }
};
