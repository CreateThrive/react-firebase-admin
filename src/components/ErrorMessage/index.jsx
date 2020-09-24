import React from 'react';
import PropTypes from 'prop-types';

import { useFormatMessage } from 'hooks';

const ErrorMessage = ({ text = '' }) => {
  const defaultText = useFormatMessage('ErrorMessage.defaultMessage');
  return <p className="error">{text || defaultText}</p>;
};

ErrorMessage.propTypes = {
  text: PropTypes.string,
};

export default ErrorMessage;
