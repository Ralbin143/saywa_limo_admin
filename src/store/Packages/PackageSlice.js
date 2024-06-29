import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import packageService from "./PackagesService";

const initialState = {
  packageList: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
};
export const ALL_PACKAGE_SLICE_ITEM = createAsyncThunk(
  "get-packages",
  async (thunkApi) => {
    try {
      return await packageService.getAllPackages();
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const NEW_PACKAGE_SLICE_ITEM = createAsyncThunk(
  "new-packages",
  async (data, thunkApi) => {
    try {
      return await packageService.newPackages(data);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const packageSlice = createSlice({
  name: "packages",
  initialState,
  reducers: {},
  extraReducers: (builders) => {
    builders
      .addCase(ALL_PACKAGE_SLICE_ITEM.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(ALL_PACKAGE_SLICE_ITEM.rejected, (state) => {
        state.isLoading = true;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(ALL_PACKAGE_SLICE_ITEM.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.packageList = action.payload;
      })
      .addCase(NEW_PACKAGE_SLICE_ITEM.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(NEW_PACKAGE_SLICE_ITEM.rejected, (state) => {
        state.isLoading = true;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(NEW_PACKAGE_SLICE_ITEM.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.packageList = action.payload;
      });
  },
});
export default packageSlice.reducer;
