import React from 'react';
import * as reactRedux from 'react-redux';

import Layout from '.';

describe('<Layout /> rendering', () => {
  const dispatchMock = jest.fn();

  beforeEach(() => {
    jest
      .spyOn(reactRedux, 'useSelector')
      .mockImplementation(() => dispatchMock);
  });

  it('should render without crashing', () => {
    const { component } = renderWithProviders(<Layout>Test</Layout>)({});

    expect(component.asFragment()).toMatchSnapshot();
  });

  it('should render <NavBar /> component correctly', () => {
    const { component } = renderWithProviders(<Layout>Test</Layout>)({
      auth: {
        userData: {},
      },
    });

    expect(component.container.querySelector('.navbar-brand')).toBeTruthy();
  });

  it('should render <Aside /> component correctly', () => {
    const { component } = renderWithProviders(<Layout>Test</Layout>)({
      auth: {
        userData: {},
      },
    });

    expect(component.container.querySelector('.aside')).toBeTruthy();
  });

  it('should render <Footer /> component correctly', () => {
    const { component } = renderWithProviders(<Layout>Test</Layout>)({
      auth: {
        userData: {},
      },
    });

    expect(component.container.querySelector('.footer')).toBeTruthy();
  });

  it('should render a div with the children', () => {
    const { component } = renderWithProviders(<Layout>Test</Layout>)({
      auth: {
        userData: {},
      },
    });

    expect(component.getByText('Test')).toBeTruthy();
  });
});
