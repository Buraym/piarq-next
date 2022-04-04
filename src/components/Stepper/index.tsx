import { useState } from "react";
import {
    Box,
    Stepper,
    Step,
    StepButton,
    StepContent,
    Typography,
} from "@mui/material/";
import { StepLabel } from "@mui/material/";

interface Params {
    step: number;
    steps: any[];
    setStep: any;
    orientation?: "horizontal" | "vertical";
}

export default function CustomStepper({
    step,
    steps,
    setStep,
    orientation,
}: Params) {
    const handleStep = (step: number) => () => {
        setStep(step);
    };

    return (
        <Stepper nonLinear orientation={orientation} activeStep={step}>
            {steps.map((step, index) => (
                <Step key={index}>
                    <StepLabel
                        sx={{
                            ".css-1u4zpwo-MuiSvgIcon-root-MuiStepIcon-root.Mui-active":
                                { color: "#ffb703" },
                        }}
                        onClick={handleStep(index)}
                    >
                        <Typography>{step.label}</Typography>
                    </StepLabel>
                    <StepContent>{step.content}</StepContent>
                </Step>
            ))}
        </Stepper>
    );
}
