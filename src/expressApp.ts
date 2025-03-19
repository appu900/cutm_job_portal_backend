import express from "express";
import AdminRoutes from "./api/admin.routes";
import JobRoutes from "./api/job.routes";
const app = express();
app.use(express.json());

app.use("/api/admin", AdminRoutes);
app.use("/api/job", JobRoutes);

export default app;
