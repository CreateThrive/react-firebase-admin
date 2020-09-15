import React from 'react';
import { useFormatMessage } from 'hooks';

const ErrorMessage = ({ text = '' }) => {
  const defaultText = useFormatMessage('ErrorMessage.defaultMessage');
  return <p className="error">{text || defaultText}</p>;
};

export default ErrorMessage;
