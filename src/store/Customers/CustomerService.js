import { ALL_CLIENTS, LIVE_CUSTOMER } from "../../Const/ApiConst";
import { instance } from "../../Const/ApiHeader";

const getAllCustomers = async (customerData) => {
  const response = await instance.post(ALL_CLIENTS, customerData);
  return response.data.data;
};

const getLiveCustomers = async (customerData) => {
  const response = await instance.post(LIVE_CUSTOMER, customerData);
  return response.data;
};

const customerService = {
  getAllCustomers,
  getLiveCustomers
};

export default customerService;
