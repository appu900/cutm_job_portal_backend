import express, { Request, Response } from "express";
import {
  AuthenticatedRequest,
  verifyJWT,
} from "../middleware/jwtvarification.middleware";
import AppplicationRepository from "../repository/application.repository";
import ApplicationService from "../services/application.service";
import UserRepository from "../repository/user.repository";
const router = express.Router();
const applicationRepository = new AppplicationRepository();
const userRepository = new UserRepository();
const applicationService = new ApplicationService(
  applicationRepository,
  userRepository
);

router.post(
  "/:jobId",
  verifyJWT,
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userId = Number(req.userId);
      const jobId = Number(req.params.jobId);
      const userEmail = req.userEmail || "user@example";
      if (!userId || !jobId) {
        throw new Error("Unauthorized request");
      }
      const response = await applicationService.createApllication({
        userId: userId,
        jobId: jobId,
        userEmail: userEmail,
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
  }
);

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

router.put(
  "/change-status/:applicationId",
  verifyJWT,
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userRole = req.role;
      if (userRole !== "ADMIN" && userRole !== "HR") {
        throw new Error("Unauthorized request");
      }
      const { jobTitle, status } = req.body;
      const applicationId = Number(req.params.applicationId);
      console.log(applicationId, jobTitle);
      if (!jobTitle || !applicationId) {
        throw new Error("Missing required parameters");
      }
      const response = await applicationService.updateApplicationStatus(
        applicationId,
        status,
        jobTitle
      );
      res.status(200).json({
        success: "ok",
        response,
      });
    } catch (error: any) {
      res.status(500).json({
        error: error.message,
      });
      return;
    }
  }
);

router.post("/schedule-interview/cutm", async (req: Request, res: Response) => {
  try {
    console.log("hittinh the interview endpoint");
    const payload = req.body;
    const response = await applicationService.scheduleInterview(payload);
    res.status(200).json({
      success: "ok",
      response,
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
    return;
  }
});

router.put(
  "/interview-result/:interviewId",
  async (req: Request, res: Response) => {
    try {
      const interviewId = Number(req.params.interviewId);
      const { status } = req.body;
      if (!interviewId || !status) {
        throw new Error("Missing required parameters");
      }
      const response = await applicationService.updateInterviewResultStatus(
        interviewId,
        status
      );
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
  }
);

router.get(
  "/interviews/all/:jobApplicationID",
  async (req: Request, res: Response) => {
    try {
      const jobApplicationID = Number(req.params.jobApplicationID);
      if (!jobApplicationID) {
        throw new Error("Missing required parameters");
      }
      const response = await applicationService.fetchDetails(jobApplicationID);
      res.status(200).json({
        success: "ok",
        response,
      });
    } catch (error: any) {
      res.status(500).json({
        error: error.message,
      });
    }
  }
);

router.get("/apd/:id", async (req: Request, res: Response) => {
  try {
    const applicationId = req.params.id;
    if (!applicationId) {
      res.status(400).json({
        error: "application Id is required",
      });
      return;
    }
    const response = await applicationService.fetchApplicationDetails(
      +applicationId
    );
    res.status(200).json({
      message: "fetched all Data",
      response,
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
});

router.get("/interview/user/:id", async (req: Request, res: Response) => {
  try {
    const userID = req.params.id;
    if (!userID) {
      res.status(400).json({
        error: "userID is required",
      });
      return;
    }
    const response = await applicationService.fetchAllInterviewByUserID(
      +userID
    );
    res.status(200).json({
      message: "fetched all Data",
      response,
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
});

export default router;
