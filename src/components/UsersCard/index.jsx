/* eslint-disable no-nested-ternary */
/* eslint-disable react/forbid-prop-types */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';
import Select from 'react-select';

import { useFormatMessage } from 'hooks';
import MediaCard from 'components/MediaCard';
import ConfirmationModal from 'components/ConfirmationModal';
import { addUser, removeUser } from 'state/actions/teams';
import { closeModal, openModal } from 'utils';
import { fetchUsers, usersCleanUp } from 'state/actions/users';

const UsersCard = () => {
  const {
    loading,
    isAdmin,
    deleted,
    teamId,
    usersList,
    dataList,
  } = useSelector(
    (state) => ({
      isAdmin: state.auth.userData.isAdmin,
      loading: state.teams.loadingUsers,
      deleted: state.teams.deleted,
      teamId: state.teams.teamId,
      usersList: state.users.data
        .filter((value) => !value.teams?.includes(state.teams.teamId))
        .map((value) => {
          return {
            label: value.name,
            value,
          };
        }),
      dataList: state.teams.usersList,
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  const [search, setSearch] = useState('');

  useEffect(() => {
    if (isAdmin) {
      dispatch(fetchUsers());
    }

    return () => {
      dispatch(usersCleanUp());
    };
  }, [dispatch, isAdmin]);

  const selectCustomStyles = {
    control: (provided) => ({
      ...provided,
      border: provided.border,
      boxShadow: 'none',
    }),
    menuPortal: (base) => ({ ...base, zIndex: 40 }),
  };

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

  const teamUsersMessage = useFormatMessage('TeamsCard.allUsers');

  const addUserMessage = useFormatMessage('TeamsCard.addUser');

  const searchByMessage = useFormatMessage('TeamsCard.searchBy');

  const confirmMessage = useFormatMessage('TeamsCard.confirm');

  const deleteMessage = useFormatMessage('TeamsCard.delete');

  const permDeleteUserMessage = useFormatMessage('TeamsCard.permDeleteUser');

  const cancelMessage = useFormatMessage('TeamsCard.cancel');

  const [deleteModal, setDeleteModal] = useState({
    id: null,
    isOpen: false,
  });

  const onCloseDeleteModalHandler = () => {
    closeModal(setDeleteModal);
  };

  useEffect(() => {
    if (deleted && !loading) {
      onCloseDeleteModalHandler();
    }
  }, [deleted, loading]);

  const onRemoveButtonClickHandler = (id) => {
    openModal(setDeleteModal, id);
  };

  const onDeleteHandler = () => {
    const { id } = deleteModal;
    dispatch(removeUser(teamId, id));
  };

  const onAddHandler = (value) => {
    dispatch(addUser(teamId, value));
  };

  return (
    <>
      {deleteModal.isOpen && (
        <ConfirmationModal
          isActive={deleteModal.isOpen}
          isLoading={loading}
          confirmButtonMessage={deleteMessage}
          title={confirmMessage}
          body={permDeleteUserMessage}
          cancelButtonMessage={cancelMessage}
          onConfirmation={onDeleteHandler}
          onCancel={onCloseDeleteModalHandler}
        />
      )}
      <div className="card has-height-medium">
        <header className="card-header">
          <p className="card-header-title">
            <span className="icon">
              <i className="mdi mdi-account-supervisor default" />
            </span>
            <span>{teamUsersMessage}</span>
          </p>
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
                <div style={{ minWidth: '220px' }}>
                  {isAdmin && (
                    <Select
                      options={usersList}
                      placeholder={addUserMessage}
                      isClearable
                      onChange={(selectedInput) => {
                        onAddHandler(selectedInput.value);
                      }}
                      value={[]}
                      styles={selectCustomStyles}
                    />
                  )}
                </div>
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
                    isUser
                  />
                ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UsersCard;
