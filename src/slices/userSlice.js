import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
  // value: localStorage.getItem("user") ? localStorage.getItem("user") : null,
  // value: null,

}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginuser: (state,action) => {
      state.value = action.payload
    },
  },
})


export const { loginuser } = userSlice.actions

export default userSlice.reducer