import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../data-manage/hooks';
import { ISymbol } from '../../data-manage/model/Symbol';

interface IReview {
    handleBack: () => void,
    handleNext:() => void
}

function Review({ handleBack,handleNext }: IReview) {
    const { fromDate, toDate, selectedSymbols } = useAppSelector(state => state.stocks);
    const [dataLoaded, setDataLoaded] = useState(false);


    useEffect(() => {
        if (selectedSymbols.length > 0 && fromDate !== null && toDate !== null) {
            console.log(selectedSymbols[0]);
            setDataLoaded(true);
        }
    }, []);

    return (
        <Box display="flex" justifyContent="space-around" alignItems="center" flexDirection="column" mt={10}>
            <Typography variant='h5' sx={{ mt: 2, mb: 1 }}>{"Review Your Data"}</Typography>
            <Grid container justifyContent="center" minHeight="400px" alignContent="space-around">
                {dataLoaded && <>
                    <Grid container rowSpacing={3} columnSpacing={1}>
                        {selectedSymbols.map((symbol) => (
                            <React.Fragment key={symbol.description}>
                                <Grid item md={6} xs={6} lg={6}>
                                    <TextField
                                        fullWidth
                                        id="outlined-read-only-input"
                                        label="Selected Company"
                                        value={symbol.description}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item md={3} xs={3} lg={3}>
                                    <TextField
                                        id="outlined-read-only-input"
                                        label="From Date"
                                        value={fromDate ? new Date(fromDate).toLocaleDateString() : ""}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item md={3} xs={3} lg={3}>
                                    <TextField
                                        id="outlined-read-only-input"
                                        label="To Date"
                                        value={toDate ? new Date(toDate).toLocaleDateString() : ""}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid>
                            </React.Fragment>

                        ))} </Grid></>
                }
                <Grid item md={12} xs={12} lg={12}>
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
                        <Button onClick={handleNext}>
                            {'Finish'}
                        </Button>
                    </Box>
                </Grid>
            </Grid>

        </Box>
    )
}

export default Review