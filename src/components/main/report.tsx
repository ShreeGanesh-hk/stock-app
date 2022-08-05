import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../data-manage/hooks';
import { Box, Button, FormControl, Grid, InputLabel, Select, Typography } from '@mui/material';
import { GetChartData } from '../../service/finnhubservice';
import { setLoadingIndicator } from '../../data-manage/features/loading';
import { setStockCandle } from '../../data-manage/features/stocks';
import { IException, setException } from '../../data-manage/features/exception';
import LineChart from './linechart';
import { ICandle } from '../../data-manage/model/Candle';

interface IReport {
    handleReset: () => void
}

function Report({ handleReset }: IReport) {
    const { fromDate, toDate, selectedSymbols } = useAppSelector(state => state.stocks);
    const { token } = useAppSelector(state => state.login);
    const { candle } = useAppSelector(state => state.stocks);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [chartData, setChartData] = useState<any>([]);
    const dispatch = useAppDispatch();


    useEffect(() => {
        dispatch(setLoadingIndicator(true));
        if (selectedSymbols.length > 0 && fromDate !== null && toDate !== null) {
            GetChartData(selectedSymbols, fromDate, toDate, token).then((data) => {
                setStockCandle(data);
                const chartData = chartDataFormat(data, "o");
                setChartData([...chartData]);
                setDataLoaded(true);
            }).catch((error) => {
                dispatch(setException({ exception: true, message: error } as IException))
            }).finally(() => { dispatch(setLoadingIndicator(false)) });
        }
    }, []);

    const chartDataFormat = (candleData: ICandle[], price: keyof ICandle) => {
        const chartData: any = [];
        candleData.map((candleStock, candleIndex) => {
            const priceData: any = [];
            if (candleStock.s !== "no_data") {
                const candleData: ICandle = candleStock;
                const candlePriceData: number[] | string = candleData[price] as unknown as number[];
                candlePriceData.map((value, index) => {
                    priceData.push({ primary: candleStock.t[index], secondary: value });
                })
                const data = {
                    data: [...priceData],
                    label: "data" + candleIndex
                }
                chartData.push({ ...data });
            }
        });
        return chartData;
    }

    const reset = () => {
        handleReset();
    }
    return (
        <Box display="flex" justifyContent="space-around" alignItems="center" flexDirection="column" mt={10}>
            <Typography variant='h5' sx={{ mt: 2, mb: 1 }}>{"Report"}</Typography>
            <Grid container justifyContent="center" minHeight="400px" alignContent="space-around">
                <Grid item md={12} xs={12} lg={12}>
                    {dataLoaded &&
                        <LineChart data={chartData} />
                    }

                </Grid>
                <Grid item md={12} xs={12} lg={12}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            disabled={true}
                            color="inherit"
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} >

                        </Box>
                        <Button onClick={reset}>
                            {'Reset'}
                        </Button>
                    </Box>
                </Grid>
            </Grid>

        </Box>
    )
}

export default Report