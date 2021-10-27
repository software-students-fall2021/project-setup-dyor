import React from "react";
import { useParams } from "react-router-dom";
import Paper from "@mui/material/Paper";
import { LiveChartContainer } from "../LiveChartContainer/LiveChartContainer";

const IndividualCoinPage = () => {
    const { id } = useParams();

    return (
        <>
            <h1>{id}</h1>
            <Paper elevation={2}>
                <LiveChartContainer coinName={id}></LiveChartContainer>
            </Paper>
        </>
    );
};

export default IndividualCoinPage;
