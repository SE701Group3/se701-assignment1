import React from 'react';

import styles from './Header.module.css';

const Header = ({ handleSearch }) => {
  console.log(handleSearch);
  return (
    <div className={styles['form-header']}>
      <span className={styles.logo}>Not-Reddit</span>
      <div className={styles['right-items']}>
        <span>Profile</span>
      </div>
    </div>
  );
};

export default Header;
