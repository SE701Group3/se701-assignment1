import React from 'react';
import { Select, InputLabel } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';

import './Dropdown.css';

const Dropdown = () => {
  return (
    <div className="dropbox-parent">
      <InputLabel className="child-elements" id="label">
        Age
      </InputLabel>
      <Select className="child-elements" value="20">
        <MenuItem value="10">Ten</MenuItem>
        <MenuItem value="20">Twenty</MenuItem>
      </Select>
    </div>
  );
};

export default Dropdown;
