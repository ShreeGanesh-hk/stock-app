import { Alert, AlertTitle, IconButton, Snackbar } from '@mui/material';
import { Box, Container } from '@mui/system';
import React from 'react';
import { setException } from '../data-manage/features/exception';
import { useAppDispatch, useAppSelector } from '../data-manage/hooks';
import CloseIcon from '@mui/icons-material/Close';

function ExceptionDisplay() {
    const { exception, message } = useAppSelector(state => state.exception);
    const dispatch = useAppDispatch();
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setException({ exception: false, message: '' }));
    };
    return (
        <React.Fragment>
            <Container maxWidth="sm">
                <Box width='100%' display={"flex"} justifyContent="center" pb={5}>
                    <Snackbar open={exception} autoHideDuration={5000} onClose={handleClose}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} 
                    >
                        <Alert variant="filled" severity="error" action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={handleClose}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }>
                            <AlertTitle>{message}</AlertTitle>
                            {"Please retry with correct data from step 1"}
                        </Alert>
                    </Snackbar>
                </Box>
            </Container>

        </React.Fragment>
    )
}

export default ExceptionDisplay