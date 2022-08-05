import { Autocomplete, Button, FormControl, Grid, TextField, Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import { shallowEqual } from 'react-redux';
import { IException, setException } from '../../data-manage/features/exception';
import { setLoadingIndicator } from '../../data-manage/features/loading';
import { setSelectedSymbols, setStockSymbols } from '../../data-manage/features/stocks';
import { useAppDispatch, useAppSelector } from '../../data-manage/hooks';
import { ISymbol } from '../../data-manage/model/Symbol';
import { GetSymbols } from '../../service/finnhubservice';



export interface IStockSelection {
    handleNext: () => void,
    handleBack: () => void
}



function StockSelection({ handleNext, handleBack }: IStockSelection) {
    const theme = useTheme();
    const [symbols, token] = useAppSelector(state => [state.stocks.symbols, state.login.token], shallowEqual);
    const dispatch = useAppDispatch();
    const [companyName, setCompanyName] = React.useState<ISymbol[]>([]);
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState<ISymbol[]>([]);
    const [isError, setIsError] = React.useState<boolean>(false);
    useEffect(() => {
        dispatch(setLoadingIndicator(true));
        GetSymbols(token)
            .then((response) => {
                setOptions(response);
            })
            .catch((error) => {
                dispatch(setException({ exception: true, message: error } as IException))
            })
            .finally(() => {
                console.log("loaded");
                dispatch(setLoadingIndicator(false));
            })
    }, []);

    const handleChange = (event: any, option: any) => {
        const {
            target: { value },
        } = event;
        setCompanyName(option);
    };

    const handleCompanyNext =() =>{
        dispatch(setSelectedSymbols([...companyName] as ISymbol[]));
        handleNext();
    }

    return (<Box display="flex" justifyContent="space-around" alignItems="center" flexDirection="column" mt={10}>
        <Typography variant='h5' sx={{ mt: 2, mb: 1 }}>{"Select companies to compare"}</Typography>
        <Grid container justifyContent="center" minHeight="400px" alignContent="space-around">
            <Grid item md={12} xs={12} lg={12} >
                <FormControl sx={{ m: 1, width: '100%' }}>
                    <Autocomplete
                        multiple
                        id="company"
                        onChange={(e, value) => handleChange(e, value)}
                        options={options}
                        loading={open && options.length === 0}
                        getOptionLabel={(option) => (option.description)}
                        getOptionDisabled={() => (companyName.length === 3 ? true : false)}
                        disableCloseOnSelect
                        filterSelectedOptions
                        renderOption={(props, option) => (
                            <li {...props}
                                key={option.displaySymbol}
                                value={option.displaySymbol}>
                                {option.description}
                            </li>
                        )}
                        renderInput={(params) => (
                            <TextField
                                helperText={companyName.length === 3 ? "Maxmium 3 can be selected" : ""}
                                {...params}
                                label="Company"
                                placeholder="Select upto 3 Companies"
                            />
                        )}
                    />
                </FormControl>
            </Grid>
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
                    <Button onClick={handleCompanyNext} disabled={companyName.length === 0 ? true : false}>
                        {'Next'}
                    </Button>
                </Box>
            </Grid>
        </Grid>

    </Box>

    )
}

export default StockSelection