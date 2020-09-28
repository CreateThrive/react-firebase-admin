import React, { useState } from 'react';
import PropTypes from 'prop-types';

import NavBar from '../Navigation/NavBar';
import Aside from '../Navigation/Aside';
import Footer from '../Navigation/Footer';

import classes from './Layout.module.scss';

const Layout = ({ children }) => {
  const [asideMobileActive, setAsideMobileActive] = useState(false);

  const handleMobileToggle = () => {
    document.documentElement.classList.toggle('has-aside-mobile-expanded');
    setAsideMobileActive(!asideMobileActive);
  };

  return (
    <>
      <NavBar
        handleMobileToggle={handleMobileToggle}
        asideMobileActive={asideMobileActive}
      />
      <Aside handleMobileToggle={handleMobileToggle} />
      <div className={classes.layout}>{children}</div>
      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
