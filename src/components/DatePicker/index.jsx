import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PropTypes from 'prop-types';

import './DatePicker.scss';

const DatePickerStyled = ({ name, date, setState }) => {
  const onDateChangedHandler = value =>
    setState(prevState => ({
      ...prevState,
      [name]: value.toDateString()
    }));
  
  return <DatePicker selected={date} onChange={onDateChangedHandler} />;
};

DatePickerStyled.propTypes = {
  name: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  setState: PropTypes.func.isRequired
};

export default DatePickerStyled;
