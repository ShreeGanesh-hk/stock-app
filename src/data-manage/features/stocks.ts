import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ICandle } from "../model/Candle"
import { ISymbol } from "../model/Symbol"

export interface IStock {
    symbols: ISymbol[],
    selectedSymbols: ISymbol[],
    candle: ICandle[],
    fromDate: string | null,
    toDate: string |  null,
}

const initialState = {
    symbols: [],
    selectedSymbols: [],
    candle: [],
    fromDate: null,
    toDate: null,
} as IStock

const StockSlice = createSlice({
    name: "stock",
    initialState,
    reducers: {
        setStockSymbols: (state, action: PayloadAction<ISymbol[]>) => {
            state.symbols = action.payload
        },
        setStockCandle: (state, action: PayloadAction<ICandle[]>) => {
            state.candle = action.payload
        },
        setSelectedSymbols: (state, action: PayloadAction<ISymbol[]>) => {
            state.selectedSymbols = action.payload
        },
        setFromDateRange: (state, action: PayloadAction<string | null>) => {
            state.fromDate = action.payload
        }
        ,
        setToDateRange: (state, action: PayloadAction<string>) => {
            state.toDate = action.payload
        }
    }
})

export const { setStockSymbols, setStockCandle, setSelectedSymbols, setFromDateRange, setToDateRange } = StockSlice.actions
export default StockSlice.reducer
