import React from 'react';

import NotFound from '.';
import paths from '../Router/paths';

describe('<NotFound /> rendering', () => {
  const location = {
    pathname: '/'
  };

  it('should render without crashing', () => {
    const { component } = mountWithIntlProvider(
      <NotFound location={location} />
    )({
      auth: {
        userData: {}
      }
    });

    expect(component).toMatchSnapshot();
  });

  it('should display the button with the login path if user is not authenticate', () => {
    const { component } = mountWithIntlProvider(
      <NotFound location={location} />
    )({
      auth: {
        userData: {
          id: null
        }
      }
    });

    expect(component.find('a').prop('href')).toEqual(paths.LOGIN);
  });

  it('should display the button with the home path if user is authenticate', () => {
    const { component } = mountWithIntlProvider(
      <NotFound location={location} />
    )({
      auth: {
        userData: {
          id: 'some userId'
        }
      }
    });

    expect(component.find('a').prop('href')).toEqual(paths.ROOT);
  });
});
