import express, { Request, Response } from "express";
import multer from "multer";
import { UserService } from "../services/user.service";
import { EducationDTO, UserDTO } from "../dto/user.dto";
import UserRepository from "../repository/user.repository";
import {
  AuthenticatedRequest,
  verifyJWT,
} from "../middleware/jwtvarification.middleware";

const router = express.Router();
const repository = new UserRepository();
const userService = new UserService(repository);
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("only pdf are allowed"));
    }
  },
});

router.post("/", upload.single("resume"), async (req, res) => {
  try {
    const { basicInformation, educationArray } = req.body;
    const basicdata =
      typeof basicInformation === "string"
        ? JSON.parse(basicInformation)
        : basicInformation;
    const educationData =
      typeof educationArray === "string"
        ? JSON.parse(educationArray)
        : educationArray;
    const userData: UserDTO = basicdata;
    const userEducationData: EducationDTO[] = educationData;
    const response = await userService.createUser(
      userData,
      userEducationData,
      req.file
    );
    res.status(201).json({
      success: "ok",
      response,
    });
  } catch (error:any) {
    res.status(500).json({
      error: error,
      errorMessage: error.message,
    });
    return;
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const response = await userService.LoginUser({ email, password });
    res.status(200).json({
      success: "ok",
      response,
    });
  } catch (error:any) {
    res.status(500).json({
      error:error.message,
    });
  }
});

export default router;
