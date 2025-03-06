import express from "express";
import AdminService from "../services/admin.service";
import { validateDTO } from "../middleware/validateDTO.middleware";
import { AdminInputRequestDTO, AdminLoginRequestDTO } from "../dto/admin.dto";
import { AdminRepository } from "../repository/admin.repository";

const router = express.Router();
const adminRepository = new AdminRepository();
const service = new AdminService(adminRepository);

// create a new admin
router.post("/", validateDTO(AdminInputRequestDTO), async (req, res) => {
  try {
    const payload = req.body;
    const response = await service.create(payload);
    res.status(201).json({
      message: "account created successfully",
      response,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.post("/login", validateDTO(AdminLoginRequestDTO), async (req, res) => {
  try {
    const payload = req.body;
    const response = await service.login(payload);
    res.status(200).json({
      message: "login successful",
      response,
    });
  } catch (error: any) {
    console.log(error)
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
});

export default router;
