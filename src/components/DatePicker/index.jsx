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

const DatePickerStyled = ({ name, date, setState }) => {
  const onDateChangedHandler = value =>
    setState(prevState => ({
      ...prevState,
      [name]: value.toDateString()
    }));

  const { locale } = useSelector(
    state => ({
      locale: state.preferences.locale
    }),
    shallowEqual
  );

  const dateFormat = locale === 'en' ? 'MM-dd-yy' : 'dd/MM/yy';

  return (
    <DatePicker
      locale={locale}
      dateFormat={dateFormat}
      selected={date}
      onChange={onDateChangedHandler}
    />
  );
};

DatePickerStyled.propTypes = {
  name: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  setState: PropTypes.func.isRequired
};

export default DatePickerStyled;
