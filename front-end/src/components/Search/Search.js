import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function ComboBox({ coins, changeCoin, currentCoin }) {
  return (
    <Autocomplete
      value={currentCoin}
      onChange={(event, newValue) => {
        if (newValue) {
          changeCoin(newValue.label);
        }
      }}
      disablePortal
      id="combo-box-demo"
      options={coins}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Your Coin" />}
    />
  );
}
