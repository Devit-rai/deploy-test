import vehicleServices from "../services/vehicleServices.js";

const createVehicle = async (req, res) => {
  
  try {
    const data = await vehicleServices.createVehicle(
      req.body,
      req.files,
      req.user_id
    );

    res.status(201).json(data);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const getVehicles = async (req, res) => {
  const products = await vehicleServices.getVehicles(req.query);

  res.statusCode(200).json(products);
};

const getVehiclesById = (req, res) => {
  const id = req.params.id;
  const vehicles = vehicleServices.getVehiclesById(id);

  res.status(200).json(vehicles);
};

const updatedVehicles = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await vehicleServices.updatedVehicles(
      id,
      req.body,
      req.files,
      req.user_id
    );

    res.status(201).json(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteVehicles = async (req, res) => {
  const id = req.params.id;
  await vehicleServices.deleteVehicles(id);

  res.send("Vehicle is deleted");
};

export default {
  createVehicle,
  getVehicles,
  getVehiclesById,
  updatedVehicles,
  deleteVehicles,
};
