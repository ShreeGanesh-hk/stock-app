import React, { useState } from 'react';
import { Alert, Box, Button, FormControl, Grid, Snackbar, TextField, Typography } from '@mui/material'
import { DatePicker, DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useAppDispatch } from '../../data-manage/hooks';
import { setFromDateRange, setToDateRange } from '../../data-manage/features/stocks';

export interface IDateSelection {
    handleNext: () => void,
    handleBack: () => void
}

function DateSelection({ handleNext, handleBack }: IDateSelection) {
    const dispatch = useAppDispatch();
    const todayDate = new Date();
    const previousMonth = new Date().setMonth(todayDate.getMonth() - 1);
    const previousDay = new Date().setDate(todayDate.getDate() - 1);
    const [nextDisabled, setNextDisabled] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [fromDate, setFromDate] = React.useState<Date | null>(
        new Date(previousMonth),
    );
    const [toDate, setToDate] = React.useState<Date | null>(
        new Date(todayDate),
    );

    const handleFromDate = (newValue: Date | null) => {
        setFromDate(newValue);
        if (newValue && toDate) {
            if (new Date(newValue).getTime() < new Date(toDate).getTime()) {
                setNextDisabled(false);
            }
            else {
                setOpen(true);
                setNextDisabled(true);
            }
        }

    };

    const handleToDate = (newValue: Date | null) => {
        setToDate(newValue);
        if (newValue && fromDate) {
            if (new Date(newValue).getTime() > new Date(fromDate).getTime()) {
                setNextDisabled(false);
            }
            else {
                setOpen(true);
                setNextDisabled(true);
            }
        }
    };

    const handleDateRange = () => {
        if (toDate && fromDate) {
            dispatch(setFromDateRange(fromDate.toLocaleDateString()));
            dispatch(setToDateRange(toDate.toLocaleDateString()));
            handleNext();
        }
        else{
            setOpen(true);
        }
        
    }

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <Box display="flex" justifyContent="space-around" alignItems="center" flexDirection="column" mt={10}>
            <Typography variant='h5' sx={{ mt: 2, mb: 1 }}>{"Select Date Range"}</Typography>
            <Grid container justifyContent="center" minHeight="400px" alignContent="space-around">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Grid item md={6} xs={6} lg={6}>
                        <Box display={"flex"} justifyContent="center">
                            <DatePicker
                                label="From Date"
                                inputFormat="dd/MM/yyyy"
                                value={fromDate}
                                maxDate={new Date(previousDay)}
                                onChange={handleFromDate}
                                disableFuture
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Box>
                    </Grid>
                    <Grid item md={6} xs={6} lg={6}>
                        <Box display={"flex"} justifyContent="center">
                            <DatePicker
                                label="To Date"
                                inputFormat="dd/MM/yyyy"
                                value={toDate}
                                disableFuture
                                onChange={handleToDate}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Box>
                    </Grid>
                </LocalizationProvider>
                <Grid item md={12} xs={12} lg={12}>
                    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                        <Alert severity="warning">Please check 'From' and 'To' Date !</Alert>
                    </Snackbar>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            color="inherit"
                            sx={{ mr: 1 }}
                            onClick={handleBack}
                        >
                            Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} >

                        </Box>
                        <Button onClick={handleDateRange} disabled={nextDisabled}>
                            {'Next'}
                        </Button>
                    </Box>
                </Grid>
            </Grid>

        </Box>
    )
}

export default DateSelection