import { Box, Button, Grid, Step, StepLabel, Stepper, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React, { useEffect } from 'react'
import DateSelection from '../components/main/date-selection';
import Report from '../components/main/report';
import Review from '../components/main/review';
import StockSelection from '../components/main/stock-selection';
import TokenEntry from '../components/main/token-entry';

const steps = ['Enter Token', 'Select Upto to 3 Companies', 'Select Date Range', 'Generate'];

function StockCompare() {
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };


    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps: { completed?: boolean } = {};
                    const labelProps: {
                        optional?: React.ReactNode;
                    } = {};
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            <Container maxWidth="md">
                <Box width="100%">
                    {activeStep === steps.length && (
                        <React.Fragment>
                            <Report handleReset={handleReset} />
                        </React.Fragment>
                    )}{activeStep === 0 && <TokenEntry handleNext={handleNext} />}
                    {activeStep === 1 && <StockSelection handleNext={handleNext} handleBack={handleBack} />}
                    {activeStep === 2 && <DateSelection handleNext={handleNext} handleBack={handleBack} />}
                    {activeStep === 3 && <Review handleNext={handleNext} handleBack={handleBack} />}
                </Box>
            </Container>
        </Box>
    )
}

export default StockCompare