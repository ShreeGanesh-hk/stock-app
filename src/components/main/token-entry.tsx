import { Box, Button, FormControl, Grid, Link, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { IException, setException } from '../../data-manage/features/exception';
import { setLoadingIndicator } from '../../data-manage/features/loading';
import { setToken } from '../../data-manage/features/login';
import { useAppDispatch, useAppSelector } from '../../data-manage/hooks';
import { validateToken } from '../../service/finnhubservice';

export interface ITokenEntry {
    handleNext: () => void;
}


function TokenEntry({ handleNext }: ITokenEntry) {
    const [nextDisabled, setNextDisabled] = useState(true);
    const { token } = useAppSelector(state => state.login);
    const dispatch = useAppDispatch();

    useEffect(() => {
        token?.length > 0 ? setNextDisabled(false) : setNextDisabled(true);
    }, [])

    const handleTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value?.length > 0) {
            setNextDisabled(false);
        } else {
            setNextDisabled(true);
        }
        dispatch(setToken(e.currentTarget.value));
    }

    const vlaidateToken = (e: React.MouseEvent<HTMLElement>) => {
        dispatch(setLoadingIndicator(true));
        validateToken(token).then((response) => {
            setNextDisabled(true);
            handleNext();
        }).catch((error) => {
            dispatch(setException({ exception: true, message: error } as IException))
        }).finally(() => {
            dispatch(setLoadingIndicator(false));
        })

    }

    return (
        <Box display="flex" justifyContent="space-around" alignItems="center" flexDirection="column" mt={10}>
            <Typography variant='h5' sx={{ mt: 2, mb: 1 }}>{"Please enter Token"}</Typography>
            <Grid container justifyContent="center" minHeight="400px" alignContent="space-around">
                <Grid item md={6} xs={6} lg={6} >
                    <FormControl sx={{ m: 1, width: '100%' }}>
                        <TextField label="Token"
                            id="outlined-size-small"
                            placeholder='Please enter your token'
                            value={token}
                            size="small"
                            onChange={handleTokenChange} />
                    </FormControl>
                </Grid>
                <Grid item md={12} xs={12} lg={12}>
                    <Typography variant='body2' sx={{ mt: 2, mb: 1 }}>If not sure please register for token <Link component="a" target="_blank" href='https://finnhub.io/dashboard'>here</Link> and copy the token value to proceed </Typography>
                </Grid>
                <Grid item md={12} xs={12} lg={12}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={true}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} >

                        </Box>
                        <Button onClick={vlaidateToken} disabled={nextDisabled}>
                            {'Next'}
                        </Button>
                    </Box>
                </Grid>
            </Grid>

        </Box>
    )
}

export default TokenEntry