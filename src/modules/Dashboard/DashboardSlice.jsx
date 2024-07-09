import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { APIURLS } from "@request/apiUrls/urls";
import { baseRequest } from "@request/request";

const initialState = {
  dash1: [],
  dash2: [],
  dash3: [],
  dash4: [],
  dashcard:[],
  yearCounts:[],
  customerCount:[],
  discount:[],
  outOfStock:[],
  percentage:[],
  highOrder:[],
  returnProduct:[],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const getDashboard1 = createAsyncThunk("Dashboard1/get", async () => {
  try {
    const dashboard = "dashboardDetails";
    const response = await baseRequest.get(`${APIURLS.GET_DASHBOARD1}`, {
      params: { dashboard },
    });
    return response.data;
  } catch (error) {
    // throw error;
  }
});

export const getDashboard2 = createAsyncThunk("Dashboard2/get", async () => {
  try {
    const dashboard = "dashboardDetails";
    const response = await baseRequest.get(`${APIURLS.GET_DASHBOARD2}`, {
      params: { dashboard },
    });
    return response.data;
  } catch (error) {
    // throw error;
  }
});

export const getDashboard3 = createAsyncThunk("Dashboard3/get", async () => {
  try {
    const Admin = "carouselDetails";
    const response = await baseRequest.get(`${APIURLS.GET_DASHBOARD3}`, {
      params: { Admin },
    });
    return response.data;
  } catch (error) {
    // throw error;
  }
});
export const getDashboard4 = createAsyncThunk("Dashboard4/get", async () => {
  try {
    const carousel = "carouselDetails";
    const response = await baseRequest.get(`${APIURLS.GET_DASHBOARD4}`, {
      params: { carousel },
    });
    console.log(response,'responsellll');
    return response.data;
  } catch (error) {
    // throw error;
  }
});

// This Dash board view
export const getDashboardCard = createAsyncThunk("Dashboardcard/get", async () => {
  try {
    const dashboard = "dashboardPageDetail";
    const response = await baseRequest.get(`${APIURLS.GET_DASHBOARD_CARD}`, {
      params: { dashboard },
    });
    console.log(response,'responsedashcarddllll');
    return response.data;
  } catch (error) {
    // throw error;
  }
});

// This Dash board year count
export const getYearCount = createAsyncThunk("YearCount/get", async () => {
  try {
    const order = "count";
    const response = await baseRequest.get(`${APIURLS.GET_DASHBOARD_YEAR_COUNT}`, {
      params: { order },
    });
    console.log(response,'responsedashcarddllll');
    return [...response.data];
  } catch (error) {
    // throw error;
  }
});

// This Dash board customer count
export const getCustomerCount = createAsyncThunk("customerCount/get", async () => {
  try {
    const customer = "count";
    const response = await baseRequest.get(`${APIURLS.GET_DASHBOARD_CUSTOMER_COUNT}`, {
      params: { customer },
    });
    console.log(response,'responsedashcarddllll');
    return [...response.data];
  } catch (error) {
    // throw error;
  }
});

// This Dash board discount
export const getDashDiscount = createAsyncThunk("dasdiscount/get", async () => {
  try {
    const currentMonth = "discountDetails";
    const response = await baseRequest.get(`${APIURLS.GET_DASHBOARD_DISCOUNT}`, {
      params: { currentMonth },
    });
    console.log(response,'responsedashcarddllll');
    return [...response.data];
  } catch (error) {
    // throw error;
  }
});

// This Dash board percentage
export const getDashPercentage = createAsyncThunk("percentage/get", async () => {
  try {
    const order = "countDetails";
    const response = await baseRequest.get(`${APIURLS.GET_DASHBOARD_PERCENTAGE}`, {
      params: { order },
    });
    console.log(response,'responsedashcarddllll');
    return [...response.data];
  } catch (error) {
    // throw error;
  }
});

// This Dash board HighOrder
export const getHighOrder = createAsyncThunk("HighOrder/get", async () => {
  try {
    const product = "productDetails";
    const response = await baseRequest.get(`${APIURLS.GET_DASHBOARD_HIGHORDER}`, {
      params: { product },
    });
    console.log(response,'responsedashcarddllll');
    return [...response.data];
  } catch (error) {
    // throw error;
  }
});

// This Dash board returnOrder
export const getReturnProduct = createAsyncThunk("ReturnOrder/get", async () => {
  try {
    const orderReturn = "returnDetails";
    const response = await baseRequest.get(`${APIURLS.GET_DASHBOARD_RETURNPRODUCT}`, {
      params: { orderReturn },
    });
    console.log(response,'responsedashcarddllll');
    return [...response.data];
  } catch (error) {
    // throw error;
  }
});

// This Dash board outofstock
export const getOutofStock = createAsyncThunk("outofstock/get", async () => {
  try {
    const response = await baseRequest.get(`${APIURLS.GET_DASHBOARD_OUTOFSTOCK}`);
    console.log(response,'responsedashcarddllll');
    return [...response.data];
  } catch (error) {
    // throw error;
  }
});

const dashboardSlice = createSlice({
  name: "DashboardSlice",
  initialState,
  reducers: {
    ClearNotify: (state, action) => {
        state.outOfStock = null
    }
},

  extraReducers: (builder) => {
    builder

      // This Dash 4
      .addCase(getDashboardCard.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.dashcard = action.payload;
      })

      // Dash 1
      .addCase(getDashboard1.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.dash1 = action.payload;
      })
      .addCase(getDashboard1.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getDashboard1.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Dash 2
      .addCase(getDashboard2.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.dash2 = action.payload;
      })
      .addCase(getDashboard2.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getDashboard2.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Dash 3
      .addCase(getDashboard3.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.dash3 = action.payload;
      })
      .addCase(getDashboard3.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getDashboard3.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Dash 4
      .addCase(getDashboard4.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.dash4 = action.payload;
      })
      .addCase(getDashboard4.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getDashboard4.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

       // year count
       .addCase(getYearCount.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.yearCounts = action.payload;
      })
      .addCase(getYearCount.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getYearCount.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      
      // customer count
      .addCase(getCustomerCount.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.customerCount = action.payload;
      })
      .addCase(getCustomerCount.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getCustomerCount.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

         // outofStock
         .addCase(getOutofStock.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.outOfStock = action.payload;
        })

        .addCase(getOutofStock.pending, (state, action) => {
          state.status = "loading";
        })
        .addCase(getOutofStock.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        })

         // discount
         .addCase(getDashDiscount.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.discount = action.payload;
        })
        .addCase(getDashDiscount.pending, (state, action) => {
          state.status = "loading";
        })
        .addCase(getDashDiscount.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        })

        // discount
        .addCase(getDashPercentage.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.percentage = action.payload;
        })
        .addCase(getDashPercentage.pending, (state, action) => {
          state.status = "loading";
        })
        .addCase(getDashPercentage.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        })

         // high order
         .addCase(getHighOrder.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.highOrder = action.payload;
        })
        .addCase(getHighOrder.pending, (state, action) => {
          state.status = "loading";
        })
        .addCase(getHighOrder.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        })

         // return order
         .addCase(getReturnProduct.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.returnProduct = action.payload;
        })
        .addCase(getReturnProduct.pending, (state, action) => {
          state.status = "loading";
        })
        .addCase(getReturnProduct.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        })
      
  },
});
// This Dashboard Card Count View
export const ViewDashboardCardCount = (state) => state.dashboard.dashcard;

// Dashboard 1
export const selectDashboard1 = (state) => state.dashboard.dash1;
export const selectDashboard1Status = (state) => state.dashboard.status;
export const selectDashboard1Error = (state) => state.dashboard.error;

// Dashboard 2
export const selectDashboard2 = (state) => state.dashboard.dash2;
export const selectDashboard2Status = (state) => state.dashboard.status;
export const selectDashboard2Error = (state) => state.dashboard.error;

// Dashboard 3
export const selectDashboard3 = (state) => state.dashboard.dash3;
export const selectDashboard3Status = (state) => state.dashboard.status;
export const selectDashboard3Error = (state) => state.dashboard.error;

// Dashboard 4
export const selectDashboard4 = (state) => state.dashboard.dash4;
export const selectDashboard4Status = (state) => state.dashboard.status;
export const selectDashboard4Error = (state) => state.dashboard.error;

export const selectAllYearCount = (state) => state.dashboard.yearCounts;

export const selectAllCustomerCount = (state) => state.dashboard.customerCount;

export const selectAllOutofStock = (state) => state.dashboard.outOfStock;

export const selectAllDiscount = (state) => state.dashboard.discount;

export const selectAllPercentage = (state) => state.dashboard.percentage;

export const selectAllHighOrder = (state) => state.dashboard.highOrder;

export const selectAllReturnProduct = (state) => state.dashboard.returnProduct;
export const { ClearNotify } = dashboardSlice.actions


export const { reducer } = dashboardSlice;

export default dashboardSlice.reducer;
