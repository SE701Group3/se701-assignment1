import React from 'react';
import { TextField, AppBar, Toolbar } from '@material-ui/core';
import LogoImage from '../icons/logo.png';

import styles from './Header.module.css';

const Header = ({ handleSearch }) => {
  return (
    <AppBar position="static" classes={{ root: styles.appBar }}>
      <Toolbar>
        <img src={LogoImage} alt="logo-img" className={styles.logo} />
        {/* <Typography variant="h6" classes={{ root: styles.title }}>
          Threader
        </Typography> */}
        <TextField
          classes={{ root: styles.searchBar }}
          onChange={handleSearch}
          variant="outlined"
          placeholder="Search"
          InputProps={{
            classes: {
              root: styles.searchBox,
              input: styles.searchText,
            },
          }}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
