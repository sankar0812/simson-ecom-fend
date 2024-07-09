import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { APIURLS } from "@request/apiUrls/urls";
import { baseRequest } from "@request/request";

const initialState = {
  users: [],
  contact:[],
  status: 'idle',  // 'idle' | 'loading' | 'succeeded' | 'failed'  
  error: null,
}

export const getUsers = createAsyncThunk(
  "variation/get",
  async () => {
    try {
      const user = 'userDetails';
      const response = await baseRequest.get(`${APIURLS.GET_USER_LIST}`, {
        params: { user }
      })
      console.log(response, 'userDetails');
      return response.data
    } catch (error) {
      // throw error;
    }
  });

export const getContact = createAsyncThunk(
  "contactlist/get",
  async () => {
    try {
      const contactParam = 'contact';
      const response = await baseRequest.get(`${APIURLS.GET_CONTACT_LIST}`, {
        params: { contactParam }
      })
      console.log(response, 'contact');
      return response.data
    } catch (error) {
      // throw error;
    }
  });



const userSlice = createSlice({
  name: 'UserSlicee',
  initialState,
  reducers: {
  },

  extraReducers: (builder) => {
    builder
      // User
      .addCase(getUsers.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.users = action.payload;
      })
      .addCase(getUsers.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      // Contact 
      .addCase(getContact.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.contact = action.payload;
      })
      .addCase(getContact.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(getContact.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})


// Users
export const selectAllUsers = (state) => state.allusers.users
export const selectAllUsersStatus = (state) => state.allusers.status
export const selectAllUsersError = (state) => state.allusers.error

// Contact List
export const selectAllContacts= (state) => state.allusers.contact
export const selectAllContactsStatus = (state) => state.allusers.status
export const selectAllContactsError = (state) => state.allusers.error


export const { reducer } = userSlice;

export default userSlice.reducer


