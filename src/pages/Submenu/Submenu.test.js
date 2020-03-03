import React from 'react';
import { shallow } from 'enzyme';

import Submenu from '.';

describe('<Submenu /> rendering', () => {
  it('should render without crashing', () => {
    const component = shallow(<Submenu />);

    expect(component).toMatchSnapshot();
  });
});
