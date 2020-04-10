import React from 'react';
import { TextField, AppBar, Toolbar } from '@material-ui/core';
import { Link } from 'react-router-dom';

import LogoImage from '../icons/logo.png';
import Dropdown from './Dropdown';

import styles from './Header.module.css';

const Header = ({ handleSearch }) => {
  return (
    <AppBar position="static" classes={{ root: styles.appBar }}>
      <Toolbar classes={{ root: styles.toolBar }}>
        <Link to="/">
          <img src={LogoImage} alt="logo-img" className={styles.logo} />
        </Link>
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
        <Dropdown />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
