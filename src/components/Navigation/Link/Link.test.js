import React from 'react';
import { fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import Link from '.';

describe('<Link /> rendering', () => {
  it('should render without crashing', () => {
    const { component } = renderWithProviders(<Link to="/url">Test</Link>);

    expect(component).toMatchSnapshot();
  });

  it('should render the <NavLink /> component correctly', () => {
    const { component } = renderWithProviders(<Link to="/url">Test</Link>)({
      auth: { userData: { id: 'testId' } },
    });

    expect(component.getByText('Test')).toBeTruthy();
  });

  it('should set the correct url to the  <NavLink /> component', () => {
    const { component } = renderWithProviders(<Link to="/url">Test</Link>)({
      auth: { userData: { id: 'testId' } },
    });

    fireEvent.click(component.getByText('Test'));

    expect(window.location.pathname).toBe('/url');
  });
});
