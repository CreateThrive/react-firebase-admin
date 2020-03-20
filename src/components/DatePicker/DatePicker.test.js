import React from 'react';
import { shallow, mount } from 'enzyme';
import DatePicker from 'react-datepicker';

import DatePickerStyled from '.';

describe('<DatePickerStyled /> rendering', () => {
  const setState = jest.fn();

  it('should render without crashing', () => {
    const component = shallow(
      <DatePickerStyled name="test" date={new Date('Thu Nov 12 2020 00:00:00 GMT-0000')} setState={setState} />
    );

    expect(component).toMatchSnapshot();
  });

  it('should render <DatePicker /> component correctly', () => {
    const component = mount(
      <DatePickerStyled name="test" date={new Date('11/12/2020')} setState={setState} />
    );

    expect(component.exists(DatePicker)).toBeTruthy();
  });

  it('should pass the date prop to <DatePicker selected={date} /> correctly', () => {
    const component = mount(
      <DatePickerStyled name="test" date={new Date('11/12/2020')} setState={setState} />
    );

    expect(component.find(DatePicker).prop('selected')).toEqual(
      new Date('11/12/2020')
    );
  });
});
