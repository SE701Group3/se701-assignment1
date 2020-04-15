import React, { useState } from 'react';
import { Select, InputLabel } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import withCreateNewSubthreadService from '../../pages/Frontpage/CreateSubthread/withCreateNewSubthreadService';
import CreateSubthreadModal from '../../pages/Frontpage/CreateSubthread/addNewSubthreadModal';

import './SubthreaderDropdown.css';

const CreateSubthreadModalServiced = withCreateNewSubthreadService(CreateSubthreadModal);

const SubthreaderDropdown = ({
  retrievedSubthreaders,
  changeSubthread,
  pass,
  updateSubthreadersList,
}) => {
  const [thread, setThread] = React.useState('All');
  const [showModal, setModal] = useState(false);

  const handleChange = event => {
    setThread(event.target.value);
    changeSubthread(event.target.value);
  };
  let button;
  if (!pass) {
    button = (
      <div>
        <IconButton
          onClick={() => {
            setModal(true);
          }}
        >
          <AddOutlinedIcon id="add-button" />
        </IconButton>
        <CreateSubthreadModalServiced
          showModal={showModal}
          setModal={setModal}
          updateSubthreadersList={updateSubthreadersList}
        />
      </div>
    );
  }

  // Only loads on the home page
  if (!(window.location.pathname === '/')) return null;

  return (
    <div className="dropbox-parent">
      {button}
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
