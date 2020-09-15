import React from 'react';

import ErrorMessage from '.';

describe('<ErrorMessage /> rendering', () => {
  it('should render without crashing', () => {
    const { component } = renderWithProviders(<ErrorMessage />)({});

    expect(component.asFragment()).toMatchSnapshot();
  });
});
