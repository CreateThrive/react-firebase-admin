import React from 'react';

import Submenu from '.';

describe('<Submenu /> rendering', () => {
  it('should render without crashing', () => {
    const { component } = shallowWithIntl(<Submenu />);

    expect(component).toMatchSnapshot();
  });
});
