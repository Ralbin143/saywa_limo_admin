import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import VehicleService from "./VehicleService";

const initialState = {
  allVehicleList: [],
  singleVehicle: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
};

export const getAllVehicles = createAsyncThunk(
  "get-all-vehicles",
  async (thunkApi) => {
    try {
      return VehicleService.allVehicles();
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const vehicleSlice = createSlice({
  name: "singleVehicles",
  initialState,
  reducers: {
    setSingleVehicle: (state, action) => {
      state.singleVehicle = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllVehicles.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getAllVehicles.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(getAllVehicles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.allVehicleList = action.payload;
      });
  },
});

export const { setSingleVehicle } = vehicleSlice.actions;
export default vehicleSlice.reducer;
