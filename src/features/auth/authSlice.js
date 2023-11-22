import { createSlice , nanoid } from "@reduxjs/toolkit";
// nanoid => unique id 

const initialState = {
    user : {}
}

export const authSlice = createSlice({
    name : 'auth' ,
    initialState ,
    reducers : {
        addUser : (state , action) => {
            state.user = action.payload.user
            console.log(state.user)

        },

        removeUser : (state , action) => {
            state.user = {}
        }
    }
})



export const {addUser , removeUser} = authSlice.actions;

export default authSlice.reducer;