import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customerService from "./CustomerService";

const initialState = {
  customers: [],
  selectedCustomer: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
};

export const ALLCUSTOMERS = createAsyncThunk(
  "get-allcustomers",
  async (customerData, thunkApi) => {
    try {
      return await customerService.getAllCustomers(customerData);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const LIVECUSTOMERS = createAsyncThunk(
  "get-live-customers",
  async (customerData, thunkApi) => {
    try {
      return await customerService.getLiveCustomers(customerData);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const customerSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    selectCustomer: (state, action) => {
      state.selectedCustomer = action.payload;
    },
  },
  extraReducers: (builders) => {
    builders
      .addCase(ALLCUSTOMERS.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(ALLCUSTOMERS.rejected, (state) => {
        state.isLoading = true;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(ALLCUSTOMERS.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.customers = action.payload;
      })
      .addCase(LIVECUSTOMERS.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(LIVECUSTOMERS.rejected, (state) => {
        state.isLoading = true;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(LIVECUSTOMERS.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.customers = action.payload;
      });
  },
});
export const { selectCustomer } = customerSlice.actions;
export default customerSlice.reducer;
