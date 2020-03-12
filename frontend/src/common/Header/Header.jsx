import React from "react";

import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles["form-header"]}>
      <span className={styles.logo}>Not-Reddit</span>
      <div className={styles["right-items"]}>
        <span>Profile</span>
      </div>
    </div>
  );
};

export default Header;
