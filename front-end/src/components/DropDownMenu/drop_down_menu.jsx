import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './drop_down.css'

export default function DropDownMenu({selectedValue, options, setArticleNum}) {

  const handleChange = (event) => {
    console.log(event.target.value)
    setArticleNum(event.target.value);
  };

  return (
    <div>
      <FormControl className="form" sx={{ m: 1, minWidth: 70 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Articles</InputLabel>
        <Select
          className="selection"
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={selectedValue}
          onChange={handleChange}
          autoWidth
          label="Number of Articles"
        >
          {options.map((option) => (
            <MenuItem className="menu_item" key={option} value={option} >
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

