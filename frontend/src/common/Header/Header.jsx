import React from 'react';
import { TextField, AppBar, Typography, Toolbar } from '@material-ui/core';

import styles from './Header.module.css';

const Header = ({ handleSearch }) => {
  return (
    <AppBar position="static" classes={{ root: styles.appBar }}>
      <Toolbar>
        <Typography variant="h6" classes={{ root: styles.title }}>
          Threader
        </Typography>
        <TextField
          classes={{ root: styles.searchBar }}
          onChange={handleSearch}
          variant="outlined"
          placeholder="Search"
        />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
