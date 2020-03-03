import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const Link = ({ children, to, className, noActiveStyle = false, onClick }) => {
  return (
    <NavLink
      to={to}
      activeClassName={noActiveStyle ? null : 'is-active'}
      className={className || 'navbar-item'}
      onClick={onClick}
      exact
    >
      {children}
    </NavLink>
  );
};

Link.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
  className: PropTypes.string,
  noActiveStyle: PropTypes.bool,
  onClick: PropTypes.func
};

export default Link;
