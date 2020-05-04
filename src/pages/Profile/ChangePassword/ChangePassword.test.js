import React from 'react';
import * as reactRedux from 'react-redux';

import * as actions from 'state/actions/auth';
import ChangePassword from '.';

describe('<ChangePassword /> rendering', () => {
  it('should render without crashing', () => {
    const { component } = shallowWithIntlProvider(<ChangePassword />)({
      auth: {
        userData: {}
      }
    });

    expect(component).toMatchSnapshot();
  });

  it('should display the submit button disabled when rendering for the first time', () => {
    const { component } = mountWithIntlProvider(<ChangePassword />)({
      auth: {
        userData: {}
      }
    });

    expect(component.find('button').prop('disabled')).toEqual(true);
  });

  it('should display the submit button correctly when the user enter the passwords correctly', () => {
    const { component } = mountWithIntlProvider(<ChangePassword />)({
      auth: {
        userData: {}
      }
    });

    const current = component.find('input').at(0);
    current.instance().value = 'oldpassword';
    current.simulate('change');

    const newPass = component.find('input').at(1);
    newPass.instance().value = 'newpassword';
    newPass.simulate('change');

    const confirmation = component.find('input').at(2);
    confirmation.instance().value = 'newpassword';
    confirmation.simulate('change');

    expect(component.find('button').prop('disabled')).toEqual(false);
  });

  it('should display an error message when the current and new password are equal', () => {
    const { component } = mountWithIntlProvider(<ChangePassword />)({
      auth: {
        userData: {}
      }
    });

    const current = component.find('input').at(0);
    current.instance().value = 'oldpassword';
    current.simulate('change');

    const newPass = component.find('input').at(1);
    newPass.instance().value = 'oldpassword';
    newPass.simulate('change');

    expect(component.find('[id="ChangePassword.samePassword"]').length).toBe(1);
  });

  it('should display a message informing the user that the new password is secure', () => {
    const { component } = mountWithIntlProvider(<ChangePassword />)({
      auth: {
        userData: {}
      }
    });

    const newPass = component.find('input').at(1);
    newPass.instance().value = 'newSecurePassword!';
    newPass.simulate('change');

    expect(component.find('[id="ChangePassword.safePassword"]').length).toBe(1);
  });

  it('should display a message informing the user that the new and confirmation passwords match', () => {
    const { component } = mountWithIntlProvider(<ChangePassword />)({
      auth: {
        userData: {}
      }
    });

    const newPass = component.find('input').at(1);
    newPass.instance().value = 'newSecurePassword!';
    newPass.simulate('change');

    const confirmation = component.find('input').at(2);
    confirmation.instance().value = 'newSecurePassword!';
    confirmation.simulate('change');

    expect(component.find('[id="ChangePassword.matchPassword"]').length).toBe(
      1
    );
  });

  it('should display the button loading when loading', () => {
    const { component } = mountWithIntlProvider(<ChangePassword />)({
      auth: {
        userData: {},
        loading: true
      }
    });

    expect(component.exists('button.is-loading')).toBeTruthy();
  });
});

describe('<ChangePassword /> actions', () => {
  const dispatchMock = jest.fn();
  beforeEach(() => {
    jest
      .spyOn(reactRedux, 'useDispatch')
      .mockImplementation(() => dispatchMock);
    jest.spyOn(actions, 'changeUserPassword').mockImplementation(jest.fn);
  });

  it('should dispatch changeUserPassword actioon when the form is submited', () => {
    const { component } = mountWithIntlProvider(<ChangePassword />)({
      auth: {
        userData: {}
      }
    });

    const current = component.find('input').at(0);
    current.instance().value = 'oldpassword';
    current.simulate('change');

    const newPass = component.find('input').at(1);
    newPass.instance().value = 'newpassword';
    newPass.simulate('change');

    const confirmation = component.find('input').at(2);
    confirmation.instance().value = 'newpassword';
    confirmation.simulate('change');

    component.find('form').simulate('submit');

    expect(actions.changeUserPassword).toHaveBeenCalledWith(
      'oldpassword',
      'newpassword'
    );
  });
});
