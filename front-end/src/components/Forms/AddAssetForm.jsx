import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import styles from "./AddAssetForm.module.css";

const AddAssetForm = (props) => {
    const [newAssetValues, setnewAssetValues] = useState({});

    return (
        <form>
            <Grid container className={styles.addAssetFormContainer}>
                <Grid item xs={6} md={3}>
                    Coin
                </Grid>
                <Grid item xs={6} md={3}>
                    Quantity Purchased
                </Grid>
                <Grid item xs={6} md={3}>
                    Unit Price
                </Grid>
                <Grid item xs={6} md={3}>
                    Salam Four
                </Grid>
            </Grid>
        </form>
    );
};

export default AddAssetForm;
