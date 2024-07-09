import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { APIURLS } from "@request/apiUrls/urls";
import { baseRequest } from "@request/request";

const initialState = {
    order: [],
    returnorder: [],
    refund: [],
    status: 'idle',  // 'idle' | 'loading' | 'succeeded' | 'failed'  
    error: null,
}

export const getAllOrders = createAsyncThunk(
    "AllOrders/get",
    async () => {
        try {
            const orderItem = 'orderItemDetails';
            const response = await baseRequest.get(`${APIURLS.GET_ORDERS}`, { params: { orderItem } })
            console.log(response.data, 'viewnaorder');
            return response.data
        } catch (error) {
            // throw error;
        }
    });
export const getAllReturnOrders = createAsyncThunk(
    "AllReturnOrders/get",
    async () => {
        try {
            const orderReturn = 'orderReturnDetails';
            const response = await baseRequest.get(`${APIURLS.GET_RETURN_ORDERS}`, {
                params: { orderReturn }
            })
            console.log(response.data, 'resssss');
            return response.data
        } catch (error) {
            console.log(error, 'erorrss');
            // throw error;
        }
    });

export const getAllRefunds = createAsyncThunk(
    "Allrefunds/get",
    async () => {
        try {
            const orderRefund = 'refundDetails';
            const response = await baseRequest.get(`${APIURLS.GET_REFUND_USERLIST}`, {
                params: { orderRefund }
            })
            console.log(response.data, 'refundinggslicee');
            return response.data
        } catch (error) {
            console.log(error, 'erorrss');
        }
    });

const orderSlice = createSlice({
    name: 'OrderSlice',
    initialState,
    reducers: {
    },

    extraReducers: (builder) => {
        builder
            // Order
            .addCase(getAllOrders.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.order = action.payload;
            })
            .addCase(getAllOrders.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getAllOrders.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            // Return Order
            .addCase(getAllReturnOrders.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.returnorder = action.payload;
            })
            .addCase(getAllReturnOrders.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getAllReturnOrders.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })

            // All Refund
            .addCase(getAllRefunds.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.refund = action.payload;
            })
            .addCase(getAllRefunds.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getAllRefunds.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})


// All Orders
export const selectAllOrders = (state) => state.orders.order
export const selectOrderStatus = (state) => state.orders.status
export const selectOrderError = (state) => state.orders.error

// All Return Orders
export const selectAllReturnOrders = (state) => state.orders.returnorder
export const selectReturnOrderStatus = (state) => state.orders.status
export const selectReturnOrderError = (state) => state.orders.error

// All Refunds
export const selectAllRefunds = (state) => state.orders.refund
export const selectAllRefundsStatus = (state) => state.orders.status
export const selectAllRefundsrError = (state) => state.orders.error

export const { reducer } = orderSlice;

export default orderSlice.reducer


