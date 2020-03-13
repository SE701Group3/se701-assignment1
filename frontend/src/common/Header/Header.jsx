import React from "react";
import styles from "./Header.module.css";
import { TextField } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const Header = () => {
  return (
    <div className={styles["form-header"]}>
      <span className={styles.logo}>Not-Reddit</span>
      <form>
        <TextField
          id="search-bar"
          size="small"
          variant="outlined"
          placeholder="Search"
          InputProps={{
            startAdornment: <SearchIcon />
          }}
        />
      </form>
      <div className={styles["right-items"]}>
        <span>Profile</span>
      </div>
    </div>
  );
};

export default Header;
