import React from 'react';
import { render } from '@testing-library/react';
import Footer from '.';

describe('<Footer /> rendering', () => {
  it('should render without crashing', () => {
    const component = render(<Footer />);

    expect(component.asFragment()).toMatchSnapshot();
  });
});
