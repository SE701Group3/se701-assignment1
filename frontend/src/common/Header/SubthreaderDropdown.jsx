import React from 'react';
import { Select, InputLabel } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';

import './SubthreaderDropdown.css';

// eslint-disable-next-line no-unused-vars
const SubthreaderDropdown = ({ retrievedSubthreaders }) => {
  return (
    <div className="dropbox-parent">
      <InputLabel className="child-elements" id="label">
        Subthreaders
      </InputLabel>
      <Select className="child-elements">
        <MenuItem>All</MenuItem>
        {retrievedSubthreaders.map(sub => (
          <MenuItem>{sub}</MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default SubthreaderDropdown;
