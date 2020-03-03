import React from 'react';
import { shallow } from 'enzyme';

import Footer from '.';

describe('<Footer /> rendering', () => {
  it('should render without crashing', () => {
    const component = shallow(<Footer />);

    expect(component).toMatchSnapshot();
  });
});
