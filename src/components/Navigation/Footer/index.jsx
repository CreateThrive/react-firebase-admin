import React from 'react';
import classNames from 'classnames';

import classes from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container-fluid">
        <div className={classNames("level", classes.level)}>
          <div className="level-left">
            <div className="level-item">
              © 2020 <span>&nbsp; CreateThrive</span>
            </div>
          </div>
          <div className={classNames("level-right", classes.levelRight)}>
            <div className="level-item">
              <div className="logo">
                <a href="https://createthrive.com"><img src="https://createthrive.com/assets/logos/Logo-CT.svg" alt="CreateThrive.com" /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;