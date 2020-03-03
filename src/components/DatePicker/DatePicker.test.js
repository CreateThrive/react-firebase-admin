import React from 'react';
import { shallow, mount } from 'enzyme';
import DatePicker from 'react-datepicker';

import DatePickerStyled from '.';

describe('<DatePickerStyled /> rendering', () => {
  const onChange = jest.fn();

  it('should render without crashing', () => {
    const component = shallow(
      <DatePickerStyled date={new Date('Thu Nov 12 2020 00:00:00 GMT-0000')} onChange={onChange} />
    );

    expect(component).toMatchSnapshot();
  });

  it('should render <DatePicker /> component correctly', () => {
    const component = mount(
      <DatePickerStyled date={new Date('11/12/2020')} onChange={onChange} />
    );

    expect(component.exists(DatePicker)).toBeTruthy();
  });

  it('should pass the date prop to <DatePicker selected={date} /> correctly', () => {
    const component = mount(
      <DatePickerStyled date={new Date('11/12/2020')} onChange={onChange} />
    );

    expect(component.find(DatePicker).prop('selected')).toEqual(
      new Date('11/12/2020')
    );
  });

  it('should pass the onChange prop to <DatePicker /> correctly', () => {
    const component = mount(
      <DatePickerStyled date={new Date('11/12/2020')} onChange={onChange} />
    );

    expect(component.find(DatePicker).prop('onChange')).toEqual(onChange);
  });
});
