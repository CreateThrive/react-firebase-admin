import React from 'react';

import { fireEvent } from '@testing-library/react';
import NotFound from '.';
import paths from '../Router/paths';

describe('<NotFound /> rendering', () => {
  const location = {
    pathname: '/',
  };

  it('should render without crashing', () => {
    const { component } = renderWithProviders(<NotFound location={location} />)(
      {
        auth: {
          userData: {},
        },
      }
    );

    expect(component.asFragment()).toMatchSnapshot();
  });

  it('should redirect to login page if user is not authenticated', () => {
    const { component } = renderWithProviders(<NotFound location={location} />)(
      {
        auth: {
          userData: {
            id: null,
          },
        },
      }
    );
    fireEvent.click(component.getByRole('link'));
    expect(window.location.pathname).toBe(paths.LOGIN);
  });

  it('should redirect to home page if user is authenticated', () => {
    const { component } = renderWithProviders(<NotFound location={location} />)(
      {
        auth: {
          userData: {
            id: 'some userId',
          },
        },
      }
    );

    fireEvent.click(component.getByRole('link'));
    expect(window.location.pathname).toBe(paths.ROOT);
  });
});
