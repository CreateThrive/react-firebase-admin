import React from 'react';
import { shallow } from 'enzyme';

import Section from '.';

describe('<Section /> rendering', () => {
  it('should render without crashing', () => {
    const component = shallow(<Section />);

    expect(component).toMatchSnapshot();
  });
});
