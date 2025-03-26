import express, { Request, Response } from "express";
import { AuthenticatedRequest } from "../middleware/jwtvarification.middleware";
import AppplicationRepository from "../repository/application.repository";
import ApplicationService from "../services/application.service";
const router = express.Router();
const repository = new AppplicationRepository();
const applicationService = new ApplicationService(repository);

router.post("/:jobId", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = Number(req.userId);
    const jobId = Number(req.params.jobId);
    if (!userId || !jobId) {
      throw new Error("Unauthorized request");
    }
    const response = await applicationService.createApllication({
      userId: userId,
      jobId: jobId,
    });
    res.status(201).json({
      success: "ok",
      response,
    });
    return;
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const response = await applicationService.getAllApplications();
    res.status(200).json({
      success: "ok",
      response,
    });
    return;
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
    return;
  }
});

export default router;
