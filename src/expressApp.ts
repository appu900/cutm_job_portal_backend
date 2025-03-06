import express from "express";
import AdminRoutes from "./api/admin.routes";
const app = express();
app.use(express.json());

app.use("/api/admin", AdminRoutes);

export default app;
