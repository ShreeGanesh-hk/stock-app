import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface IApp {
    title: string,
    dialog: boolean,
}

const initialState = {
    title: "",
    dialog: false,
    selectedData: {}
} as IApp

const AppSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setAppTitle: (state, action: PayloadAction<string>) => {
            state.title = action.payload
        },
    }
})

export const { setAppTitle } = AppSlice.actions
export default AppSlice.reducer
