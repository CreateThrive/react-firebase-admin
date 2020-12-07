import React from 'react';
import classNames from 'classnames';
import pkg from "../../../../package.json";

import classes from './Footer.module.scss';

const Footer = () => {
  const getYear = () => {
    return new Date().getFullYear();
  };

  return (
    <footer className="footer">
      <div className="container-fluid">
        <div className={classNames('level', classes.level)}>
          <div className="level-left">
            <div className="level-item">
              © {getYear()} - {pkg.copyright}
            </div>
          </div>
          <div className={classNames('level-right', classes.levelRight)}>
            <div className="level-item">
              v{pkg.version}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
