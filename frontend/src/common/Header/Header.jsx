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

/* import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
  appBar: { backgroundColor: 'white', height: '70px' },
  logoText: { flex: 2, color: 'black', width: 'relative', fontSize: '28px' },
  middleBar: {
    flex: 14,
  },
  searchBar: {
    width: '80%',
    justifyContent: 'center',
    position: 'relative',
    backgroundColor: 'lightgrey',
  },
  profileName: {
    flex: 1,
    color: 'black',
  },
  accountIcon: {
    flex: 1,
  },
});
const classes = useStyles();
*/
/* <div className={styles["form-header"]}>
<span className={styles.logo}>Not-Reddit</span>
<form>
  
</form>
<div className={styles["right-items"]}>
  <span>Profile</span>
</div>
</div> */
