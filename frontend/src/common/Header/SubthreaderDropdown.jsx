import React from 'react';
import { Select, InputLabel } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';

import './SubthreaderDropdown.css';

const SubthreaderDropdown = ({ retrievedSubthreaders, changeSubthread }) => {
  const [thread, setThread] = React.useState('All');

  const handleChange = event => {
    setThread(event.target.value);
    changeSubthread(event.target.value);
  };

  if (window.location.pathname === '/post') return null;

  return (
    <div className="dropbox-parent">
      <InputLabel className="child-elements" id="label">
        Subthreaders
      </InputLabel>
      <Select className="child-elements" labelId="label" value={thread} onChange={handleChange}>
        <MenuItem value="All"> All </MenuItem>
        {retrievedSubthreaders.map(sub => (
          <MenuItem value={sub._id}> {sub.title} </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default SubthreaderDropdown;
