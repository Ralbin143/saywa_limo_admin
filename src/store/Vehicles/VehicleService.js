import { GET_SINGLE_VEHICLE, GET_VEHICLE_LIST } from "../../Const/ApiConst";
import { instance } from "../../Const/ApiHeader";

const getSingleVehicles = async (vehicleData) => {
  const response = await instance.get(GET_SINGLE_VEHICLE, vehicleData);
  return response.data;
};

const allVehicles = async () => {
  const response = await instance.post(GET_VEHICLE_LIST);
  return response.data.data;
};

const VehicleService = {
  getSingleVehicles,
  allVehicles,
};

export default VehicleService;
