import { useIntl } from 'react-intl';

const useChangeHandler = setState => {
  const onChangeHandler = event => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    setState(prevState => ({ ...prevState, [`${name}`]: value }));
  };

  return onChangeHandler;
};

const useFormatMessage = (
  id,
  values = {},
  defaultMessage = '',
  description = ''
) => {
  const intl = useIntl();
  return intl.formatMessage({ id, defaultMessage, description }, values);
};

const useFormatDate = (value, weekday, year, month, day) => {
  const intl = useIntl();
  return intl.formatDate(value, { weekday, year, month, day });
};

export { useChangeHandler, useFormatMessage, useFormatDate };
