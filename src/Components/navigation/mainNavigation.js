import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import MainHeader from './mainHeader';
import NavLinks from './navLinks';
// import SideDrawer from './sideDrawer';
// import Backdrop from '../UIElements/backdrop';
import classes from './mainNavigation.module.css';

const MainNavigation = props => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };

  return (
    <React.Fragment>
      {/* {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
      <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
        <nav className={classes.main_navigation__drawer_nav}>
          <NavLinks />
        </nav>
      </SideDrawer> */}

      <MainHeader>
        {/* <button className={classes.main_navigation__menu_btn} onClick={openDrawerHandler}>
          <span />
          <span />
          <span />
        </button>
        <h1 className={classes.main_navigation__title}>
          <Link to="/">REFLIX</Link>
        </h1> */}
        <nav className={classes.main_navigation__header_nav}>
          <NavLinks />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;