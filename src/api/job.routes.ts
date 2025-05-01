import express from "express";
import { Request, Response, NextFunction } from "express";
import {
  AuthenticatedRequest,
  verifyJWT,
} from "../middleware/jwtvarification.middleware";
import { validateDTO } from "../middleware/validateDTO.middleware";
import { InputJobRequestDTO } from "../dto/job.dto";
import JobRepositoty from "../repository/job.repository";
import JobService from "../services/job.service";
const router = express.Router();
const repository = new JobRepositoty();
const service = new JobService(repository);

router.post(
  "/",
  validateDTO(InputJobRequestDTO),
  verifyJWT,
  async (req: AuthenticatedRequest, res: Response) => {
    if (req.role !== "ADMIN" || !req.role) {
      res.status(400).json({
        error: "unauthorized request",
      });
      console.log(
        "An unauthorized request was made to crate a job req was not an admin"
      );
      return;
    }
    try {
      const payload = req.body;
      payload.adminId = req.userId;
      const response = await service.createJob(payload);
      res.status(201).json({
        success: "ok",
        response,
      });
    } catch (error) {
      res.status(403).json({
        error: "unexpected error",
      });
      return;
    }
  }
);

router.get("/", async (req: Request, res: Response) => {
  try {
    const response = await service.fetchAllJobs();
    res.status(200).json({
      success: "ok",
      response,
    });
  } catch (error) {
    res.status(500).json({
      error: "unexpected error",
    });
    return;
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const jobId = req.params.id;
    if (!jobId) {
      res.status(400).json({
        error: "job id is required",
      });
      return;
    }
    const response = await service.fetchJobById(+jobId);
    if (!response) {
      res.status(404).json({
        error: "job not found",
      });
      return;
    }

    res.status(200).json({
      success: "ok",
      response,
    });
    return;
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
    return;
  }
});

export default router;
