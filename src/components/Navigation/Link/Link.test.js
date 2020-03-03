import React from 'react';
import { shallow } from 'enzyme';
import { NavLink } from 'react-router-dom';

import Link from '.';

describe('<Link /> rendering', () => {
  it('should render without crashing', () => {
    const component = shallow(<Link to="/url">Test</Link>);

    expect(component).toMatchSnapshot();
  });

  it('should render the <NavLink /> component correctly', () => {
    const component = shallow(<Link to="/url">Test</Link>);

    expect(component.exists(NavLink)).toBeTruthy();
  });

  it('should set the correct url to the  <NavLink /> component', () => {
    const component = shallow(<Link to="/url">Test</Link>);

    expect(component.find(NavLink).prop('to')).toEqual('/url');
  });

  it('should set the correct children to the <NavLink /> component', () => {
    const component = shallow(<Link to="/url">Test</Link>);

    expect(component.find(NavLink).prop('children')).toEqual('Test');
  });
});
