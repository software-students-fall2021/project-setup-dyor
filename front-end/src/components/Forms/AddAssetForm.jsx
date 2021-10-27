import React, { useState } from "react";
import { Grid, Autocomplete, TextField, Button } from "@mui/material";
import styles from "./AddAssetForm.module.css";
import MobileDatePicker from "@material-ui/lab/MobileDatePicker";

const AddAssetForm = ({
    coinLabels,
    onAddNewAssetHandler,
    labelsToCoinsDict,
}) => {
    const [isSubmissionAllowed, setIsSubmissionAllowed] = useState(false);
    const [coinValue, setCoinValue] = useState("BTC");
    const [tempAssetValues, setTempAssetValues] = useState({
        coin: "BTC",
        quantityPurchased: 0,
        purchasePrice: 0,
    });

    const handleCoinSubmitInputChange = (event) => {
        console.log(`Setting ${event.target.innerText}`);
        setCoinValue(() => event.target.innerText);
        setIsSubmissionAllowed(true);
    };

    const handleInputChange = (event) => {
        if (event) {
            const { id, value } = event.target;
            console.log(`Temp Input Change with ${id}:${value}`);
            setTempAssetValues((prevTempAssetValues) => ({
                ...prevTempAssetValues,
                [id]: value,
            }));
        }
    };

    const onSubmitHandler = () => {
        if (isSubmissionAllowed) {
            const toBeSubmitted = tempAssetValues;
            toBeSubmitted.coin = labelsToCoinsDict[toBeSubmitted.coin];
            console.log(toBeSubmitted);
            onAddNewAssetHandler(toBeSubmitted);
        } else {
            alert("VALID COIN YET TO BE SELECTED");
        }
    };

    return (
        <form className={styles.addAssetFormContainer}>
            <Grid container>
                <Grid item xs={6} md={3}>
                    <Autocomplete
                        id="coin"
                        value={coinValue}
                        onChange={handleCoinSubmitInputChange}
                        inputValue={tempAssetValues.coin}
                        onInputChange={(event, newValue) => {
                            console.log("New Value");
                            console.log(newValue);
                            setTempAssetValues((prevTempAssetValues) => ({
                                ...prevTempAssetValues,
                                coin: newValue,
                            }));
                        }}
                        options={coinLabels}
                        isOptionEqualToValue={(option, value) =>
                            option.label === value
                        }
                        variant="outlined"
                        renderInput={(params) => (
                            <TextField {...params} label="Coin" />
                        )}
                    />
                </Grid>
                <Grid item xs={6} md={3}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        id="quantityPurchased"
                        label="Purchase Quanity"
                        value={tempAssetValues.quantityPurchased || ""}
                        onChange={handleInputChange}
                    ></TextField>
                </Grid>
                <Grid item xs={6} md={3}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        id="purchasePrice"
                        label="Purchase Price"
                        value={tempAssetValues.purchasePrice || ""}
                        onChange={handleInputChange}
                    ></TextField>
                </Grid>
                <Grid item xs={6} md={3}>
                    <MobileDatePicker
                        fullWidth
                        label="Purchase Date"
                        value={tempAssetValues.datePurchased}
                        onChange={(newValue) => {
                            setTempAssetValues((prevTempAssetValues) => ({
                                ...prevTempAssetValues,
                                datePurchased: newValue,
                            }));
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={onSubmitHandler}
                    >
                        Confirm Entry
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default AddAssetForm;
