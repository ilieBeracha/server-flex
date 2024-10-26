import express from "express";
import { registerAdmin, loginAdmin } from "../2-logic/adminLogic";

const AdminRoute = express.Router();

AdminRoute.get("/", (req, res) => {
  res.json("Hello World");
});

// Route to register a new admin
AdminRoute.post("/register", async (req, res) => {
  console.log("req.body", req.body);
  const { username, password } = req.body;
  try {
    const newAdmin = await registerAdmin(username, password);
    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route to login an admin
AdminRoute.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const token = await loginAdmin(username, password);
    res.status(200).json(token);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default AdminRoute;
