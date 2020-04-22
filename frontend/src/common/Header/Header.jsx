import React from 'react';
import { TextField, AppBar, Toolbar } from '@material-ui/core';
import { Link } from 'react-router-dom';

import LogoImage from '../icons/logo.png';
import SubthreaderDropdown from './SubthreaderDropdown';
import { Login } from './Login';

import styles from './Header.module.css';

const Header = ({
  handleSearch,
  retrievedSubthreaders,
  changeSubthread,
  updateSubthreadersList,
  displayProfile,
  handleLogin,
}) => {
  return (
    <AppBar position="static" classes={{ root: styles.appBar }}>
      <Toolbar classes={{ root: styles.toolBar }}>
        <Link to="/">
          <img src={LogoImage} alt="logo-img" className={styles.logo} />
        </Link>
        <SubthreaderDropdown
          retrievedSubthreaders={retrievedSubthreaders}
          changeSubthread={changeSubthread}
          updateSubthreadersList={updateSubthreadersList}
        />
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
        <Login
          displayProfile={displayProfile}
          handleLogin={handleLogin}
          classes={{ root: styles.login }}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
