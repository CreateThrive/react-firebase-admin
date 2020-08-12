import React from 'react';

import Submenu from '.';

describe('<Submenu /> rendering', () => {
  it('should render without crashing', () => {
    const { component } = shallowWithProviders(<Submenu />)({});

    expect(component).toMatchSnapshot();
  });
});
