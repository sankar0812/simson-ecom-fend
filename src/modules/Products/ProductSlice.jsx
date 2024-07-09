import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { APIURLS } from "@request/apiUrls/urls";
import { baseRequest } from "@request/request";

const initialState = {
  variations: [],
  category: [],
  categoryproduct: [],
  brand: [],
  products: [],
  stock:[],
  size:[],
  status: 'idle',  // 'idle' | 'loading' | 'succeeded' | 'failed'  
  error: null,
}

export const getVariation = createAsyncThunk(
  "variation/get",
  async () => {
    try {
      const varient = 'varientDetails';
      const response = await baseRequest.get(`${APIURLS.GET_VARIATION}`, {
        params: { varient }
      })
      return response.data
    } catch (error) {
      // throw error;
    }
  });

export const getCategory = createAsyncThunk(
  "Category/get",
  async () => {
    try {
      const CategoryImage = 'CategoryDetail';
      const response = await baseRequest.get(`${APIURLS.GET_CATEGORY}`, {
        params: { CategoryImage }
      })
      return response.data
    } catch (error) {
      // throw error;
    }
  });

  export const getCategoryProducts = createAsyncThunk(
    "Categoryview/get",
    async () => {
      try {
        const category  = 'categoryDetails';
        const response = await baseRequest.get(`${APIURLS.GET_CATEGORY_PRODUCT}`, {
          params: { category  }
         
        }) 
        console.log(response,'responseiiii');
        return response.data
      } catch (error) {
        // throw error;
      }
    });

export const getBrand = createAsyncThunk(
  "Brand/get",
  async () => {
    try {
      const brand = 'brandDetails';
      const response = await baseRequest.get(`${APIURLS.GET_BRAND}`, {
        params: { brand }
      })
      return response.data
    } catch (error) {
      // throw error;
    }
  });

export const getAllProducts = createAsyncThunk(
  "Products/get",
  async () => {
    try {
      const product = 'productDetails';
      const response = await baseRequest.get(`${APIURLS.GET_PRODUCTS}`, {
        params: { product }
      })
      return response.data
    } catch (error) {
      console.log(error,'error');
      // throw error;
    }
  });

  export const getStocks = createAsyncThunk(
    "stock/get",
    async () => {
      try {
        const stock = 'stockDetails';
        const response = await baseRequest.get(`${APIURLS.GET_STOCK}`, {
          params: { stock }
        })
        console.log(response.data,'vvvv');
        return response.data
      } catch (error) {
        // throw error;
      }
    });

    export const getSize = createAsyncThunk(
      "sizes/get",
      async () => {
        try {
          const size = 'sizeDetails';
          const response = await baseRequest.get(`${APIURLS.GET_SIZE}`, {
            params: { size }
          })
          console.log(response.data,'vvvv');
          return response.data
        } catch (error) {
          // throw error;
        }
      });

const productSlice = createSlice({
  name: 'ProductSlicee',
  initialState,
  reducers: {
    // setVariationsAdd: (state, action) => {
    //     state.addvariations = action.payload

    // },
    // reset: (state, action) => {
    //     // state.addvariations = null
    //     state.resetvariations = null
    // },
    // addToTable: (state, action) => {

    //     state.productTable = action.payload
    // }
  },

  extraReducers: (builder) => {
    builder
      // Variant
      .addCase(getVariation.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.variations = action.payload;
      })
      .addCase(getVariation.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(getVariation.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })

      // Category
      .addCase(getCategory.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.category = action.payload;
      })
      .addCase(getCategory.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })

      .addCase(getCategoryProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.categoryproduct = action.payload;
      })
      .addCase(getCategoryProducts.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(getCategoryProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })

      // Brand
      .addCase(getBrand.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.brand = action.payload;
      })
      .addCase(getBrand.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(getBrand.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })

      // Product
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.products = action.payload;
      })
      .addCase(getAllProducts.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })

      // Stock
      .addCase(getStocks.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.stock = action.payload;
      })
      .addCase(getStocks.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(getStocks.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })

      // Size
      .addCase(getSize.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.size = action.payload;
      })
      .addCase(getSize.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(getSize.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })

  }
})

export const { setVariationsAdd, reset, addToTable } = productSlice.actions

// Variant
export const selectVariation = (state) => state.products.variations
export const selectAllVariationsStatus = (state) => state.products.status
export const selectAllVariationsError = (state) => state.products.error

// Category
export const selectCategory = (state) => state.products.category
export const selectAllCategoryStatus = (state) => state.products.status
export const selectAllCategoryError = (state) => state.products.error

export const selectCategoryProduct = (state) => state.products.categoryproduct
export const selectAllCategoryProductStatus = (state) => state.products.status
export const selectAllCategoryProductError = (state) => state.products.error

// Brand
export const selectBrand = (state) => state.products.brand
export const selectAllBrandStatus = (state) => state.products.status
export const selectAllBrandError = (state) => state.products.error

// Products
export const selectProducts = (state) => state.products.products
export const selectAllProductsStatus = (state) => state.products.status
export const selectAllProductsError = (state) => state.products.error

// Stock
export const selectAllStocks = (state) => state.products.stock
export const selectAllStocksStatus = (state) => state.products.status
export const selectAllStocksError = (state) => state.products.error

// Size
export const selectAllSizes = (state) => state.products.size
export const selectAllSizesStatus = (state) => state.products.status
export const selectAllSizesError = (state) => state.products.error



export const { reducer } = productSlice;

export default productSlice.reducer


