/* eslint-disable no-nested-ternary */
/* eslint-disable react/forbid-prop-types */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';

import { useFormatMessage } from 'hooks';
import MediaCard from 'components/MediaCard';
import ConfirmationModal from 'components/ConfirmationModal';
import TeamModal from 'components/TeamModal';
import {
  deleteTeam,
  fetchTeams,
  fetchTeamUsers,
  teamsCleanUp,
} from 'state/actions/teams';
import { closeModal, openModal } from 'utils';

const TeamsCard = () => {
  const { success, loading, isAdmin, deleted, dataList } = useSelector(
    (state) => ({
      isAdmin: state.auth.userData.isAdmin,
      success: state.teams.success,
      loading: state.teams.loadingTeams,
      deleted: state.teams.deleted,
      dataList: state.teams.teamsList,
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(fetchTeams());

    return () => {
      dispatch(teamsCleanUp());
    };
  }, [dispatch]);

  const data = search
    ? dataList.filter((el) => {
        const clonedElem = { ...el };
        delete clonedElem.id;
        delete clonedElem.isAdmin;
        delete clonedElem.logoUrl;
        delete clonedElem.teams;
        delete clonedElem.users;
        delete clonedElem.description;
        delete clonedElem.createdAt;
        delete clonedElem.createdBy;
        return Object.values(clonedElem).some((field) =>
          field.toLowerCase().includes(search.toLowerCase())
        );
      })
    : dataList;

  const availableTeamsMessage = useFormatMessage('TeamsCard.allTeams');

  const addTeamMessage = useFormatMessage('TeamsCard.addTeam');

  const searchByMessage = useFormatMessage('TeamsCard.searchBy');

  const confirmMessage = useFormatMessage('TeamsCard.confirm');

  const deleteMessage = useFormatMessage('TeamsCard.delete');

  const permDeleteTeamMessage = useFormatMessage('TeamsCard.permDeleteTeam');

  const cancelMessage = useFormatMessage('TeamsCard.cancel');

  const [deleteModal, setDeleteModal] = useState({
    id: null,
    isOpen: false,
  });

  const [addModal, setAddModal] = useState({
    id: null,
    isOpen: false,
  });

  const [isEditing, setIsEditing] = useState(false);

  const onCloseDeleteModalHandler = () => {
    closeModal(setDeleteModal);
    setIsEditing(false);
  };

  const onCloseAddModalHandler = () => {
    closeModal(setAddModal);
    setIsEditing(false);
  };

  useEffect(() => {
    if (deleted && !loading) {
      onCloseDeleteModalHandler();
    }
  }, [deleted, loading]);

  useEffect(() => {
    if (success && !loading) {
      onCloseAddModalHandler();
    }
  }, [success, loading]);

  const onRemoveButtonClickHandler = (id) => {
    openModal(setDeleteModal, id);
  };

  const onAddButtonClickHandler = (id) => {
    openModal(setAddModal, id);
  };

  const onModifyButtonClickHandler = (id) => {
    openModal(setAddModal, id);
    setIsEditing(true);
  };

  const onDeleteHandler = () => {
    const { id } = deleteModal;
    dispatch(deleteTeam(id));
    const team = dataList.find((value) => value.id !== id);
    if (team) {
      dispatch(fetchTeamUsers(team.id));
    }
  };

  return (
    <>
      {deleteModal.isOpen && (
        <ConfirmationModal
          isActive={deleteModal.isOpen}
          isLoading={loading}
          confirmButtonMessage={deleteMessage}
          title={confirmMessage}
          body={permDeleteTeamMessage}
          cancelButtonMessage={cancelMessage}
          onConfirmation={onDeleteHandler}
          onCancel={onCloseDeleteModalHandler}
        />
      )}
      {addModal.isOpen && (
        <TeamModal
          isActive={addModal.isOpen}
          onCancel={onCloseAddModalHandler}
          isEditing={isEditing}
        />
      )}
      <div className="card has-height-medium">
        <header className="card-header">
          <p className="card-header-title">
            <span className="icon">
              <i className="mdi mdi-account-group default" />
            </span>
            <span>{availableTeamsMessage}</span>
          </p>
          {isAdmin && (
            <button
              type="button"
              className="button"
              onClick={onAddButtonClickHandler}
            >
              <span className="icon">
                <i className="mdi mdi-account-multiple-plus default" />
              </span>
              <span>{addTeamMessage}</span>
            </button>
          )}
        </header>
        <div>
          <div
            className="field-body"
            style={{
              padding: '0.5rem 0.25rem',
              borderBottom: '1px solid rgba(24,28,33,0.06)',
            }}
          >
            <div className="field">
              <div className="control is-expanded">
                <input
                  placeholder={searchByMessage}
                  type="text"
                  className="input search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{ height: '38px' }}
                />
              </div>
            </div>
            <div className="field">
              <div className="control is-expanded">
                <div style={{ minWidth: '220px' }} />
              </div>
            </div>
          </div>
        </div>
        <div
          className="card-content ps ps--active-y"
          style={{
            padding: '0px 1.5rem',
            overflow: 'auto',
            maxHeight: '700px',
          }}
        >
          {loading ? (
            <ClipLoader />
          ) : (
            <div className="media-list">
              {data &&
                data.map((value) => (
                  <MediaCard
                    content={value}
                    key={value.id}
                    onDeleteHandler={onRemoveButtonClickHandler}
                    onModifyHandler={onModifyButtonClickHandler}
                  />
                ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TeamsCard;
