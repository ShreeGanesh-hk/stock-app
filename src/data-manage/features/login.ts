import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface ILogin {
    token: string
}

const initialState = {
    token: "",
} as ILogin

const LoginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload
        }
    }
})

export const { setToken } = LoginSlice.actions
export default LoginSlice.reducer
