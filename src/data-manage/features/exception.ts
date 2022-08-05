import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface IException {
    exception: boolean,
    message:string,
}

const initialState = {
    exception:false,
    message:""
} as IException

const ExceptionSlice = createSlice({
    name: "exception",
    initialState,
    reducers: {
        setException : (state, action: PayloadAction<IException>) =>{
            state.exception = action.payload.exception;
            state.message = action.payload.message;
    }
}
})

export const {setException} = ExceptionSlice.actions
export default ExceptionSlice.reducer
