import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { preferencesSetLocale } from 'state/actions/preferences';
import { useFormatMessage } from 'hooks';
import en from 'assets/en.png';
import es from 'assets/es.png';
import { logout } from 'state/actions/auth';
import paths from 'pages/Router/paths';
import defaultLogo from 'assets/user-default-log.svg';
import Link from '../Link';

const NavBar = ({ handleMobileToggle, asideMobileActive }) => {
  const [navMobileActive, setNavMobileActive] = useState(false);

  const { userName, logoUrl, locale } = useSelector(
    state => ({
      userName: state.auth.userData.name,
      logoUrl: state.auth.userData.logoUrl,
      locale: state.preferences.locale
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  const onClickLogoutHandler = () => {
    dispatch(logout());
  };

  const onMobileToggleHandler = useCallback(() => {
    setNavMobileActive(!navMobileActive);
  }, [setNavMobileActive, navMobileActive]);

  const changeLocaleHandler = local => {
    dispatch(preferencesSetLocale(local));
  };

  const usFlag = <img src={en} alt="English icon" />;
  const spainFlag = <img src={es} alt="Spanish icon" />;

  return (
    <nav id="navbar-main" className="navbar is-fixed-top">
      <div className="navbar-brand">
        <a
          className="navbar-item is-hidden-desktop jb-aside-mobile-toggle"
          onClick={handleMobileToggle}
        >
          <span className="icon">
            <i
              className={classNames(
                'mdi',
                'mdi-24px',
                { 'mdi-forwardburger': !asideMobileActive },
                { 'mdi-backburger': asideMobileActive }
              )}
            />
          </span>
        </a>
      </div>
      <div className="navbar-brand is-right">
        <a
          className="navbar-item is-hidden-desktop jb-navbar-menu-toggle"
          data-target="navbar-menu"
          onClick={onMobileToggleHandler}
        >
          <span className="icon">
            <i
              className={classNames(
                'mdi',
                { 'mdi-dots-vertical': !navMobileActive },
                { 'mdi-close': navMobileActive }
              )}
            />
          </span>
        </a>
      </div>
      <div
        className={classNames('navbar-menu', 'fadeIn', 'animated', 'faster', {
          'is-active': navMobileActive
        })}
        id="navbar-menu"
      >
        <div className="navbar-end">
          <div className="navbar-item has-dropdown has-dropdown-with-icons has-divider has-user-avatar is-hoverable">
            <a className="navbar-link is-arrowless">
              <div className="is-user-avatar">
                <span>{locale === 'en' ? usFlag : spainFlag}</span>
              </div>
              <span className="icon">
                <i className="mdi mdi-chevron-down" />
              </span>
            </a>
            <div className="navbar-dropdown">
              {locale !== 'en' ? (
                <a
                  onClick={() => changeLocaleHandler('en')}
                  className="navbar-item"
                  id="en"
                >
                  <span className="icon">{usFlag}</span>
                </a>
              ) : (
                <a
                  onClick={() => changeLocaleHandler('es')}
                  className="navbar-item"
                  id="es"
                >
                  <span className="icon">{spainFlag}</span>
                </a>
              )}
            </div>
          </div>
          <div className="navbar-item has-dropdown has-dropdown-with-icons has-divider has-user-avatar is-hoverable">
            <a className="navbar-link is-arrowless">
              <div className="is-user-avatar">
                <img src={logoUrl || defaultLogo} alt="User profile" />
              </div>
              <div className="is-user-name">
                <span>{userName}</span>
              </div>
              <span className="icon">
                <i className="mdi mdi-chevron-down" />
              </span>
            </a>
            <div className="navbar-dropdown">
              <Link to={paths.PROFILE} onClick={onMobileToggleHandler}>
                <span className="icon">
                  <i className="mdi mdi-account" />
                </span>
                <span>{useFormatMessage('NavBar.profile')}</span>
              </Link>
              <hr className="navbar-divider" />
              <a
                className="navbar-item"
                id="logout"
                onClick={onClickLogoutHandler}
              >
                <span className="icon">
                  <i className="mdi mdi-logout" />
                </span>
                <span>{useFormatMessage('NavBar.logOut')}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

NavBar.propTypes = {
  handleMobileToggle: PropTypes.func.isRequired,
  asideMobileActive: PropTypes.bool
};

export default NavBar;
