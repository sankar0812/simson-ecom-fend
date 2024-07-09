import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { APIURLS } from "@request/apiUrls/urls";
import { baseRequest } from "@request/request";

const initialState = {
  discount: [],
  status: 'idle',  // 'idle' | 'loading' | 'succeeded' | 'failed'  
  error: null,
}

export const getdiscount = createAsyncThunk(
  "discount/get",
  async () => {
    try {
      const discount = 'discountDetails';
      const response = await baseRequest.get(`${APIURLS.GET_DISCOUNT}`, {
        params: { discount }
      })
      console.log(response.data,'ddddddddd');
      return response.data
    } catch (error) {
        console.log(error,'eeee');
      // throw error;
    }
  });


const discountSlice = createSlice({
  name: 'discountSlicee',
  initialState,
  reducers: {

  },

  extraReducers: (builder) => {
    builder
      // Discount
      .addCase(getdiscount.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.discount = action.payload;
      })
      .addCase(getdiscount.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(getdiscount.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })


  }
})

export const { setVariationsAdd, reset, addToTable } = discountSlice.actions

// Discount View
export const selectAllDiscount = (state) => state.discountOffer.discount
export const selectAllDiscountStatus = (state) => state.discountOffer.status
export const selectAllDiscountError = (state) => state.discountOffer.error




export const { reducer } = discountSlice;

export default discountSlice.reducer


