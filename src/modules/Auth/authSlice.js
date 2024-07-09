import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    token: null,
    authUser: null,
    roleType:null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { name,token,roleType } = action.payload
            state.authUser = name
            state.token = token
            state.role = roleType
        },
        logOut: (state, action) => {
            state.authUser = null
            state.token = null
            state.roleType = null
        }
    }
})

export const { setCredentials, logOut } = authSlice.actions

export const selectCurrentUser = (state) => state.auth.authUser
export const selectCurrentToken = (state) => state.auth.token
export const selectCurrentUserRole = (state) => state.auth.role

export default authSlice.reducer