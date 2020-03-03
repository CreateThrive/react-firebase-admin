import React from 'react';
import { shallow } from 'enzyme';

import ConfirmationModal from '.';

describe('<ConfirmationModal /> rendering', () => {
  const onConfirm = jest.fn();
  const onCancel = jest.fn();

  beforeEach(() => {
    onConfirm.mockClear();
    onCancel.mockClear();
  });

  it('should render without crashing', () => {
    const component = shallow(
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

    expect(component).toMatchSnapshot();
  });

  it('should set the active modifier if the isActive prop is passed down', () => {
    const component = shallow(
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

    expect(component.exists('div.modal.is-active')).toBeTruthy();
  });

  it('should not set the active modifier if the isActive prop is not passed down', () => {
    const component = shallow(
      <ConfirmationModal
        confirmButtonMessage="test message"
        onConfirmation={onConfirm}
        cancelButtonMessage="test message"
        onCancel={onCancel}
        title="test title"
        body="test body"
      />
    );

    expect(component.exists('div.modal.is-active')).toBeFalsy();
  });

  it('should call onConfirm when the confirmation button is clicked', () => {
    const component = shallow(
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

    component.find('button[children="confirm test message"]').simulate('click');

    expect(onConfirm).toHaveBeenCalled();
  });

  it('should call onCancel when the cancel button is clicked', () => {
    const component = shallow(
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

    component.find('button[children="cancel test message"]').simulate('click');

    expect(onCancel).toHaveBeenCalled();
  });

  it('should set the title of the modal', () => {
    const component = shallow(
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

    expect(component.exists('p[children="test title"]')).toBeTruthy();
  });

  it('should set the body of the modal', () => {
    const component = shallow(
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

    expect(component.exists('section[children="test body"]')).toBeTruthy();
  });

  it('should set the confirm button message', () => {
    const component = shallow(
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

    expect(
      component.exists('button[children="confirm test message"]')
    ).toBeTruthy();
  });

  it('should set the cancel button message', () => {
    const component = shallow(
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

    expect(
      component.exists('button[children="cancel test message"]')
    ).toBeTruthy();
  });
});
