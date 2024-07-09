import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { APIURLS } from "@request/apiUrls/urls";
import { baseRequest } from "@request/request";



const initialState = {
  business: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// get Holiday

export const getBusinessProfile = createAsyncThunk(
  "businessprofile/get",
  async () => {
    try {
      const company = 'companyDetails';
      const response = await baseRequest.get(`${APIURLS.GETBUSINESSPROFILE}`, {
        params: { company }
      })
      return response.data
    } catch (error) {
      // throw error;
    }
  });

const businessprofileSlice = createSlice({
  name: "businessprofile",
  initialState,
  reducers: {
  },

  extraReducers: (builder) => {
    builder

      // Business Profile

      .addCase(getBusinessProfile.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getBusinessProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.business = action.payload;
      })
      .addCase(getBusinessProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
  },
});

// Holiday

export const selectAllBusinessProfile = (state) => state.businessProfile.business;
export const getBusinessProfileStatus = (state) => state.businessProfile.status;
export const getBusinessProfileError = (state) => state.businessProfile.error;

export const { reducer } = businessprofileSlice;
export const { addDepartment } = businessprofileSlice.actions;

export default businessprofileSlice.reducer;
