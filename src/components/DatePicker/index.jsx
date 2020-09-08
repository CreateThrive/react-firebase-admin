import React from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PropTypes from 'prop-types';
import es from 'date-fns/locale/es';
import en from 'date-fns/locale/en-US';
import { shallowEqual, useSelector } from 'react-redux';

import './DatePicker.scss';

registerLocale('en', en);
registerLocale('es', es);

const dateFormat = (locale) => {
  switch (locale) {
    case 'en':
      return 'MM-dd-yy';
    case 'es':
      return 'dd/MM/yy';
    default:
      return 'MM-dd-yy';
  }
};

const DatePickerStyled = ({ date, onChange }) => {
  const onDateChangedHandler = (value) =>
    onChange(value ? value.toDateString() : new Date().toDateString());

  const { locale } = useSelector(
    (state) => ({
      locale: state.preferences.locale,
    }),
    shallowEqual
  );

  return (
    <DatePicker
      locale={locale}
      dateFormat={dateFormat(locale)}
      selected={date}
      onChange={onDateChangedHandler}
    />
  );
};

DatePickerStyled.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default DatePickerStyled;
