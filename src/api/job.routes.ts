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
import multer from "multer";
const router = express.Router();
const repository = new JobRepositoty();
const service = new JobService(repository);
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .jpg, .jpeg, and .png files are allowed"));
    }
  },
});


router.post(
  "/",
  upload.single("poster"),
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
      const response = await service.createJob(payload,req.file);
      res.status(201).json({
        success: "ok",
        response,
      });
    } catch (error:any) {
      res.status(403).json({
        error:error.message
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

router.get("/applicants/:jobId", async (req: Request, res: Response) => {
  try {
    const jobId = req.params.jobId;
    if (!jobId) {
      res.status(400).json({
        error: "job id is required",
      });
      return;
    }

    const response = await service.fetchJobDetailsIncludeApplicants(+jobId);
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
  } catch (error) {
    res.status(500).json({
      error: "unexpected error",
    });
    return;
  }
});

export default router;
