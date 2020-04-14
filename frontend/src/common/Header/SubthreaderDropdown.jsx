import React from 'react';
import { Select, InputLabel } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';

import './SubthreaderDropdown.css';

const SubthreaderDropdown = ({ retrievedSubthreaders, changeSubthread }) => {
  const [thread, setThread] = React.useState('All');

  const handleChange = event => {
    setThread(event.target.value);
    changeSubthread(event.target.value);
  };

  if (!(window.location.pathname === '/')) return null;

  return (
    <div className="dropbox-parent">
      <IconButton>
        <AddOutlinedIcon className="icon" />
      </IconButton>

      <InputLabel className="child-elements" id="label">
        Subthreaders
      </InputLabel>
      <Select className="child-elements" labelId="label" value={thread} onChange={handleChange}>
        <MenuItem value="All"> All </MenuItem>
        {retrievedSubthreaders.map(sub => (
          <MenuItem value={sub.title}> {sub.title} </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default SubthreaderDropdown;
