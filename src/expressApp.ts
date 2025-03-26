import express from "express";
import AdminRoutes from "./api/admin.routes";
import JobRoutes from "./api/job.routes";
import UserRoutes from "./api/user.routes"
const app = express();
app.use(express.json());

app.use("/api/admin", AdminRoutes);
app.use("/api/job", JobRoutes);
app.use("/api/user",UserRoutes)

export default app;
