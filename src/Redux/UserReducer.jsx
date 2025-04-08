import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const Api_URL ="http://localhost:3000/users";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async ()=>{
    const response = await axios.get(Api_URL);
    console.log("Fetched Users:", response.data);
    return response.data;
})

export const addUsers = createAsyncThunk("users/addUsers", async(newUser)=>{
    const response = await axios.post(Api_URL,newUser);
    return response.data;
})

export const updateUsers = createAsyncThunk("users/updateUsers",async(updateUser)=>{
    const response = await axios.put(`${Api_URL}/${(updateUser.id)}`,updateUser);
    return response.data;
})

export const deleteUsers = createAsyncThunk("users/deleteUsers",async(id)=>{
    console.log("Deleting user with ID:", id);
    await axios.delete(`${Api_URL}/${(id)}`);
    return id;
})


const userSlice = createSlice({

    name: "users",
    initialState: {
        users: [],
        loading : false,
        error: null,
    },
    reducers:{
        // addUser :(state,action)=>{
        //     state.push(action.payload);
        // },
        // deleteUser :(state,action)=>{
        //     return state.filter((user)=> user.id !== action.payload);
        // },
        // updateUser :(state,action)=>{
        //     const {id,name,email}= action.payload;
        //     const existingUser = state.find((user)=> user.id === id);
        //     if(existingUser){
        //         existingUser.name = name;
        //         existingUser.email = email;
        //     }
        // }
    },
    extraReducers:(builder)=>{
        builder
         .addCase(fetchUsers.pending, (state)=>{
            state.loading = true;
            state.error = null;
         })
         .addCase(fetchUsers.fulfilled, (state,action)=>{
            state.loading = false;
            state.users = action.payload;
         })
         .addCase(fetchUsers.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.error.message;
         })
         .addCase(addUsers.pending, (state)=>{
            state.loading = true;
            state.error = null;
         })
         .addCase(addUsers.fulfilled, (state,action)=>{
            state.loading = false;
            state.users.push(action.payload);
         })
         .addCase(updateUsers.fulfilled, (state,action)=>{
            const index = state.users.findIndex((user)=> user.id ===action.payload.id);
            if(index !== -1){
                state.users[index] = action.payload;
            }
         })
         .addCase(deleteUsers.fulfilled, (state,action)=>{
            state.users = state.users.filter((user)=>user.id !== action.payload)
         })
    }
})

export const {addUser,deleteUser,updateUser} = userSlice.actions
export default userSlice.reducer