import React from 'react';

import Layout from '.';
import NavBar from '../Navigation/NavBar';
import Aside from '../Navigation/Aside';
import Footer from '../Navigation/Footer';

describe('<Layout /> rendering', () => {
  it('should render without crashing', () => {
    const { component } = shallowWithProviders(<Layout>Test</Layout>)({});

    expect(component).toMatchSnapshot();
  });

  it('should render <NavBar /> component correctly', () => {
    const { component } = mountWithProviders(<Layout>Test</Layout>)({
      auth: {
        userData: {}
      }
    });

    expect(component.exists(NavBar)).toBeTruthy();
  });

  it('should render <Aside /> component correctly', () => {
    const { component } = mountWithProviders(<Layout>Test</Layout>)({
      auth: {
        userData: {},
        locale: 'en'
      }
    });

    expect(component.exists(Aside)).toBeTruthy();
  });

  it('should render <Footer /> component correctly', () => {
    const { component } = mountWithProviders(<Layout>Test</Layout>)({
      auth: {
        userData: {}
      }
    });

    expect(component.exists(Footer)).toBeTruthy();
  });

  it('should render a div with the children', () => {
    const { component } = mountWithProviders(<Layout>Test</Layout>)({
      auth: {
        userData: {}
      }
    });

    expect(component.exists('div[children="Test"]')).toBeTruthy();
  });
});
