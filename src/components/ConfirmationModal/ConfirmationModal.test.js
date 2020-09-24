import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import ConfirmationModal from '.';

describe('<ConfirmationModal /> rendering', () => {
  const onConfirm = jest.fn();
  const onCancel = jest.fn();

  beforeEach(() => {
    onConfirm.mockClear();
    onCancel.mockClear();
  });

  it('should render without crashing', () => {
    const component = render(
      <ConfirmationModal
        isActive
        confirmButtonMessage="test message"
        onConfirmation={onConfirm}
        cancelButtonMessage="test message"
        onCancel={onCancel}
        title="test title"
        body="test body"
      />
    );

    expect(component.asFragment()).toMatchSnapshot();
  });

  it('should set the active modifier if the isActive prop is passed down', () => {
    const component = render(
      <ConfirmationModal
        isActive
        confirmButtonMessage="test message"
        onConfirmation={onConfirm}
        cancelButtonMessage="test message"
        onCancel={onCancel}
        title="test title"
        body="test body"
      />
    );

    expect(
      component.container.querySelector('div.modal.is-active')
    ).toBeTruthy();
  });

  it('should not set the active modifier if the isActive prop is not passed down', () => {
    const component = render(
      <ConfirmationModal
        confirmButtonMessage="test message"
        onConfirmation={onConfirm}
        cancelButtonMessage="test message"
        onCancel={onCancel}
        title="test title"
        body="test body"
      />
    );

    expect(component.container.querySelector('div.modal.is-active')).toBeNull();
  });

  it('should call onConfirm when the confirmation button is clicked', () => {
    const component = render(
      <ConfirmationModal
        isActive
        confirmButtonMessage="confirm test message"
        onConfirmation={onConfirm}
        cancelButtonMessage="test message"
        onCancel={onCancel}
        title="test title"
        body="test body"
      />
    );

    fireEvent.click(component.getByText('confirm test message'));
    expect(onConfirm).toHaveBeenCalled();
  });

  it('should call onCancel when the cancel button is clicked', () => {
    const component = render(
      <ConfirmationModal
        isActive
        confirmButtonMessage="test message"
        onConfirmation={onConfirm}
        cancelButtonMessage="cancel test message"
        onCancel={onCancel}
        title="test title"
        body="test body"
      />
    );

    fireEvent.click(component.getByText('cancel test message'));

    expect(onCancel).toHaveBeenCalled();
  });

  it('should set the title of the modal', () => {
    const component = render(
      <ConfirmationModal
        isActive
        confirmButtonMessage="test message"
        onConfirmation={onConfirm}
        cancelButtonMessage="test message"
        onCancel={onCancel}
        title="test title"
        body="test body"
      />
    );

    expect(component.getByText('test title')).toBeTruthy();
  });

  it('should set the body of the modal', () => {
    const component = render(
      <ConfirmationModal
        isActive
        confirmButtonMessage="test message"
        onConfirmation={onConfirm}
        cancelButtonMessage="test message"
        onCancel={onCancel}
        title="test title"
        body="test body"
      />
    );

    expect(component.getByText('test body')).toBeTruthy();
  });

  it('should set the confirm button message', () => {
    const component = render(
      <ConfirmationModal
        isActive
        confirmButtonMessage="confirm test message"
        onConfirmation={onConfirm}
        cancelButtonMessage="test message"
        onCancel={onCancel}
        title="test title"
        body="test body"
      />
    );

    expect(component.getByText('confirm test message')).toBeTruthy();
  });

  it('should set the cancel button message', () => {
    const component = render(
      <ConfirmationModal
        isActive
        confirmButtonMessage="test message"
        onConfirmation={onConfirm}
        cancelButtonMessage="cancel test message"
        onCancel={onCancel}
        title="test title"
        body="test body"
      />
    );

    expect(component.getByText('cancel test message')).toBeTruthy();
  });
});
