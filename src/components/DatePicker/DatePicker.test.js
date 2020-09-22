import React from 'react';

import DatePickerStyled from '.';

describe('<DatePickerStyled /> rendering', () => {
  const onChange = jest.fn();

  it('should render without crashing', () => {
    const { component } = renderWithProviders(
      <DatePickerStyled
        name="test"
        dateFormat="en-US"
        date={new Date('11/12/2020')}
        onChange={onChange}
      />
    )({});

    expect(component.asFragment()).toMatchSnapshot();
  });

  it('should render <DatePicker /> component correctly', () => {
    const { component } = renderWithProviders(
      <DatePickerStyled
        name="test"
        dateFormat="en-US"
        date={new Date('11/12/2020')}
        onChange={onChange}
      />
    )({});

    expect(component.container.querySelector('input')).toBeTruthy();
  });

  it('should pass the date prop to <DatePicker selected={date} /> correctly', () => {
    const { component } = renderWithProviders(
      <DatePickerStyled
        name="test"
        dateFormat="en-US"
        date={new Date('11/12/2020')}
        onChange={onChange}
      />
    )({});

    expect(component.container.querySelector('input').value).toBe('11-12-20');
  });
});
