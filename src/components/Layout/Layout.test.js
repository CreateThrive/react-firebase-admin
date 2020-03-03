import React from 'react';
import { shallow } from 'enzyme';

import Layout from '.';
import NavBar from '../Navigation/NavBar';
import Aside from '../Navigation/Aside';
import Footer from '../Navigation/Footer';

describe('<Layout /> rendering', () => {
  it('should render without crashing', () => {
    const component = shallow(<Layout>Test</Layout>);

    expect(component).toMatchSnapshot();
  });

  it('should render <NavBar /> component correctly', () => {
    const { component } = mountWithProvider(<Layout>Test</Layout>)({
      auth: {
        userData: {}
      }
    });

    expect(component.exists(NavBar)).toBeTruthy();
  });

  it('should render <Aside /> component correctly', () => {
    const { component } = mountWithProvider(<Layout>Test</Layout>)({
      auth: {
        userData: {}
      }
    });

    expect(component.exists(Aside)).toBeTruthy();
  });

  it('should render <Footer /> component correctly', () => {
    const { component } = mountWithProvider(<Layout>Test</Layout>)({
      auth: {
        userData: {}
      }
    });

    expect(component.exists(Footer)).toBeTruthy();
  });

  it('should render a div with the children', () => {
    const { component } = mountWithProvider(<Layout>Test</Layout>)({
      auth: {
        userData: {}
      }
    });

    expect(component.exists('div[children="Test"]')).toBeTruthy();
  });
});
