/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import classNames from 'classnames';

import ErrorMessage from 'components/ErrorMessage';
import { useFormatMessage } from 'hooks';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { createTeam, modifyTeam } from 'state/actions/teams';

const schema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().notRequired(),
});

const TeamModal = ({ isActive, onCancel, isEditing }) => {
  const { teamsList, teamId, loading } = useSelector(
    (state) => ({
      teamsList: state.teams.teamsList,
      teamId: state.teams.teamId,
      loading: state.teams.loadingTeams,
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  const { register, handleSubmit, errors, watch } = useForm({
    defaultValues: isEditing
      ? teamsList.find((value) => value.id === teamId)
      : {},
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = (value) => {
    const team = {
      ...value,
      file: value?.file[0] || null,
    };
    dispatch(isEditing ? modifyTeam(team) : createTeam(team));
  };

  const pickAnotherFileMessage = useFormatMessage('UserForm.pickAnotherFile');

  const pickFileMessage = useFormatMessage('UserForm.pickFile');

  const addTeamButtonMessage = useFormatMessage('TeamModal.addTeam');

  const updateTeamButtonMessage = useFormatMessage('TeamModal.updateTeam');

  const cancelButtonMessage = useFormatMessage('TeamModal.cancel');

  return (
    <div className={classNames(`modal`, { 'is-active': isActive })}>
      <div
        className="modal-background"
        onClick={!loading ? onCancel : undefined}
      />
      <div className="modal-card">
        <header className="modal-card-head">
          <span>{useFormatMessage('TeamModal.teamInformation')}</span>
        </header>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <section className="modal-card-body">
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">
                  {useFormatMessage('TeamModal.name')}
                </label>
              </div>
              <div className="field-body">
                <div className="field">
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      ref={register}
                      name="name"
                    />
                  </div>
                </div>
              </div>
            </div>
            {errors.name && (
              <div className="field is-horizontal">
                <div className="field-label is-normal" />
                <div className="field-body">
                  <ErrorMessage />
                </div>
              </div>
            )}
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">
                  {useFormatMessage('TeamModal.description')}
                </label>
              </div>
              <div className="field-body">
                <div className="field">
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      ref={register}
                      name="description"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">
                  {useFormatMessage('UserForm.logo')}
                </label>
              </div>
              <div className="field-body">
                <div className="field">
                  <div className="file has-name">
                    <label className="file-label">
                      <input
                        className="file-input"
                        type="file"
                        name="file"
                        ref={register}
                        accept="image/*"
                      />
                      <span className="file-cta">
                        <span className="file-icon">
                          <i className="mdi mdi-upload" />
                        </span>
                        <span className="file-label">
                          {watch('file') && watch('file').file
                            ? pickAnotherFileMessage
                            : pickFileMessage}
                        </span>
                      </span>
                      <span className="file-name">
                        {watch('file') && watch('file')[0]?.name}
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <footer className="modal-card-foot">
            <button
              type="submit"
              className={classNames(`button is-success`, {
                'is-loading': loading,
              })}
            >
              {!isEditing ? addTeamButtonMessage : updateTeamButtonMessage}
            </button>
            <button
              type="button"
              className="button"
              onClick={onCancel}
              disabled={loading}
            >
              {cancelButtonMessage}
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
};

TeamModal.propTypes = {
  isActive: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  isEditing: PropTypes.bool,
};

TeamModal.defaultProps = {
  isEditing: false,
};

export default TeamModal;
