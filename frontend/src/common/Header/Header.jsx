import React from 'react';
import { TextField } from '@material-ui/core';

import styles from './Header.module.css';

const Header = ({ handleSearch }) => {
  return (
    <div className={styles['form-header']}>
      <span className={styles.logo}>Not-Reddit</span>
      <TextField onChange={handleSearch} variant="outlined" />

      <div className={styles['right-items']}>
        <span>Profile</span>
      </div>
    </div>
  );
};

export default Header;
