import { Box, Container } from '@mui/material';
import { Navigate, Route, Routes } from 'react-router-dom';
import ExceptionDisplay from '../components/exception';
import Footer from '../components/layout/footer-bar';
import LoadingOverLay from '../components/layout/loading-overlay';
import MenuBar from '../components/layout/menu-bar';
import StockCompare from './stock-compare';

export default function Home() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
            }}
        >
            <MenuBar />
            <LoadingOverLay />
            <Container component="main" sx={{ mt: 16, mb: 2 }} maxWidth="xl">
                <ExceptionDisplay />
                <Routes>
                    <Route path="/" element={<Navigate to="/home" />} />
                    <Route path="/home" element={<StockCompare />} />
                </Routes>
            </Container>
            <Footer />
        </Box>
    )
}
