import express from "express";
import vehicleController from "../controller/vehicleController.js";
import roleBasedAuth from "../middleware/roleBasedAuth.js";
import { ADMIN } from "../constants/roles.js";
import auth from "../middleware/auth.js";

const router = express.Router();

//URL:/api/vehicles"
router.get("/", vehicleController.getVehicles);

router.get("/:id", vehicleController.getVehiclesById);

router.post("/", auth, roleBasedAuth(ADMIN), vehicleController.createVehicle);

router.put(
  "/:id",
  auth,
  roleBasedAuth(ADMIN),
  vehicleController.updatedVehicles
);

router.delete(
  "/:id",
  auth,
  roleBasedAuth(ADMIN),
  vehicleController.deleteVehicles
);

export default router;
