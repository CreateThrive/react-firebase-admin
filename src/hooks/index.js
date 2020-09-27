import { useIntl } from 'react-intl';

const useFormatMessage = (
  id,
  values = {},
  defaultMessage = '',
  description = ''
) => {
  const intl = useIntl();
  return intl.formatMessage({ id, defaultMessage, description }, values);
};

const useFormatDate = (value, options = {}) => {
  const intl = useIntl();
  return intl.formatDate(value, options);
};

export { useFormatMessage, useFormatDate };
