import React from 'react';

import Section from '.';

describe('<Section /> rendering', () => {
  it('should render without crashing', () => {
    const { component } = shallowWithProviders(<Section />)({});

    expect(component).toMatchSnapshot();
  });
});
