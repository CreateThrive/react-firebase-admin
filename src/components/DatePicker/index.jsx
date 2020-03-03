import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PropTypes from 'prop-types';

import './DatePicker.scss';

const DatePickerStyled = ({ date, onChange }) => {
  return <DatePicker selected={date} onChange={onChange} />;
};

DatePickerStyled.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  onChange: PropTypes.func.isRequired
};

export default DatePickerStyled;
