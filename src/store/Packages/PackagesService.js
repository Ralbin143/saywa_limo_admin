import { PACKAGES_URL } from "../../Const/ApiConst";
import { imageInstance, instance } from "../../Const/ApiHeader";

const getAllPackages = async () => {
  const response = await instance.get(`${PACKAGES_URL}/`);
  return response.data;
};

const newPackages = async (data) => {
  const response = await imageInstance.post(`${PACKAGES_URL}/new`, data);
  return response.data;
};

const packageService = {
  getAllPackages,
  newPackages,
};

export default packageService;
