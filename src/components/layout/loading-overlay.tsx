import { Backdrop, CircularProgress } from '@mui/material'
import React from 'react'
import { useAppSelector } from '../../data-manage/hooks'

const LoadingOverLay = () => {
    const { loading } = useAppSelector((state => state.loadingIndicator));
    return (
        <div>
            <Backdrop
                sx={(theme) => ({ color: theme.palette.primary.main, zIndex: theme.zIndex.tooltip + 1 })}
                open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}

export default LoadingOverLay