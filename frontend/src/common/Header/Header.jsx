import React from 'react';
import { TextField, AppBar, Toolbar } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import styles from './Header.module.css';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar className={styles.appBar}>
        <div className={styles.logoText}>Threader</div>
        <div className={styles.searchBar}>
          <form>
            <TextField
              className={styles.searchInput}
              size="small"
              variant="outlined"
              placeholder="Search"
            />
          </form>
        </div>
        <div className={styles.profileArea}>
          <AccountCircleIcon className={styles.accountIcon} fontSize="large" color="action" />
          <div className={styles.profileName}>John Smith</div>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
