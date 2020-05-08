import React, { useState } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { useFormatMessage } from 'hooks';
import paths from 'pages/Router/paths';
import NavLink from '../Link';
import classes from './Aside.module.scss';

export const SubMenu = ({ label, children }) => {
  const [active, setActive] = useState(false);

  return (
    <li className={classNames({ 'is-active': active })}>
      <a
        exact-active-class="is-active"
        className="has-icon has-dropdown-icon"
        onClick={() => setActive(!active)}
      >
        <span className="icon">
          <i className="mdi mdi-view-list" />
        </span>
        <span className="menu-item-label">{label}</span>
        <div className="dropdown-icon">
          <span className="icon">
            <i
              className={classNames(
                'mdi',
                { 'mdi-minus': active },
                { 'mdi-plus': !active }
              )}
            />
          </span>
        </div>
      </a>
      <ul>{children}</ul>
    </li>
  );
};

SubMenu.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired
};

const Aside = ({ handleMobileToggle }) => {
  const { isAdmin } = useSelector(
    state => ({
      isAdmin: state.auth.userData.isAdmin
    }),
    shallowEqual
  );

  const usersMessage = useFormatMessage('Aside.users');

  return (
    <aside className="aside is-placed-left is-expanded">
      <Link to={paths.ROOT} className="aside-tools">
        <div className="aside-tools-label">
          <span>
            <b>React</b> Firebase
          </span>
        </div>
      </Link>
      <div className="menu is-menu-main">
        <ul className="menu-list">
          <li>
            <NavLink
              to={paths.ROOT}
              className="has-icon"
              onClick={handleMobileToggle}
            >
              <span className="icon">
                <i className="mdi mdi-home" />
              </span>
              <span className="menu-item-label">
                {useFormatMessage('Aside.home')}
              </span>
            </NavLink>
          </li>
          {isAdmin && (
            <li>
              <NavLink
                to={paths.USERS}
                className="has-icon"
                onClick={handleMobileToggle}
              >
                <span className="icon">
                  <i className="mdi mdi-account-supervisor" />
                </span>
                <span className="menu-item-label">{usersMessage}</span>
              </NavLink>
            </li>
          )}
          <SubMenu label={useFormatMessage('Aside.dropdownMenu')}>
            <li>
              <NavLink
                className={classes.submenuLink}
                to={paths.SUBMENU_1}
                onClick={handleMobileToggle}
              >
                <span>{useFormatMessage('Aside.submenu1')}</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                className={classes.submenuLink}
                to={paths.SUBMENU_2}
                onClick={handleMobileToggle}
              >
                <span>{useFormatMessage('Aside.submenu2')}</span>
              </NavLink>
            </li>
          </SubMenu>
        </ul>
      </div>
    </aside>
  );
};

Aside.propTypes = {
  handleMobileToggle: PropTypes.func.isRequired
};

export default Aside;
