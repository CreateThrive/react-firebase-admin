import { fireEvent } from '@testing-library/react';
import React from 'react';

import Aside from '.';

describe('<Aside /> rendering', () => {
  const onHandler = jest.fn();

  it('should render without crashing', () => {
    const { component } = renderWithProviders(
      <Aside handleMobileToggle={onHandler} />
    )({
      auth: {
        userData: {
          isAdmin: true,
        },
      },
    });

    expect(component.asFragment()).toMatchSnapshot();
  });

  it('should set the handleMobileToggle prop correctly when clicking Home', () => {
    const { component } = renderWithProviders(
      <Aside handleMobileToggle={onHandler} />
    )({
      auth: {
        userData: {
          isAdmin: true,
        },
      },
    });

    fireEvent.click(component.getByText('Home'));
    expect(onHandler).toBeCalled();
  });

  it('should set the handleMobileToggle prop correctly when clicking Users', () => {
    const { component } = renderWithProviders(
      <Aside handleMobileToggle={onHandler} />
    )({
      auth: {
        userData: {
          isAdmin: true,
        },
      },
    });

    fireEvent.click(component.getByText('Users'));
    expect(onHandler).toBeCalled();
  });

  it('should set the handleMobileToggle prop correctly when clicking Submenu 1', () => {
    const { component } = renderWithProviders(
      <Aside handleMobileToggle={onHandler} />
    )({
      auth: {
        userData: {
          isAdmin: true,
        },
      },
    });

    fireEvent.click(component.getByText('Submenu 1'));
    expect(onHandler).toBeCalled();
  });

  it('should set the handleMobileToggle prop correctly when clicking Submenu 2', () => {
    const { component } = renderWithProviders(
      <Aside handleMobileToggle={onHandler} />
    )({
      auth: {
        userData: {
          isAdmin: true,
        },
      },
    });

    fireEvent.click(component.getByText('Submenu 2'));
    expect(onHandler).toBeCalled();
  });

  it('should not render the /users link if it the user is not an admin', () => {
    const { component } = renderWithProviders(
      <Aside handleMobileToggle={onHandler} />
    )({
      auth: {
        userData: {
          isAdmin: false,
        },
      },
    });

    expect(component.queryByText('Users')).toBeNull();
  });

  it('should render the /users link if it the user is an admin', () => {
    const { component } = renderWithProviders(
      <Aside handleMobileToggle={onHandler} />
    )({
      auth: {
        userData: {
          isAdmin: true,
        },
      },
    });

    expect(component.getByText('Users')).toBeTruthy();
  });

  it('should render the <SubMenu /> component if the user is an admin', () => {
    const { component } = renderWithProviders(
      <Aside handleMobileToggle={onHandler} />
    )({
      auth: {
        userData: {
          isAdmin: true,
        },
      },
    });

    expect(component.getByText('Dropdown Menu')).toBeTruthy();
  });

  it('should render the <SubMenu /> component if the user is not an admin', () => {
    const { component } = renderWithProviders(
      <Aside handleMobileToggle={onHandler} />
    )({
      auth: {
        userData: {
          isAdmin: false,
        },
      },
    });

    expect(component.getByText('Dropdown Menu')).toBeTruthy();
  });
});
