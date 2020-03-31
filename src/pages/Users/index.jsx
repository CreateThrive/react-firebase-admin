import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import classNames from 'classnames';
import ClipLoader from 'react-spinners/ClipLoader';

import Table from '../../components/Table';
import {
  fetchUsers,
  deleteUser,
  clearUsersData
} from '../../state/actions/users';
import classes from './Users.module.scss';
import paths from '../Router/paths';
import ConfirmationModal from '../../components/ConfirmationModal';

const Users = () => {
  const { usersList, isAdmin, error, loading, deleted } = useSelector(
    state => ({
      usersList: state.users.data,
      isAdmin: state.auth.userData.isAdmin,
      error: state.users.error,
      loading: state.users.loading,
      deleted: state.users.deleted
    }),
    shallowEqual
  );

  const [deleteModal, setDeleteModal] = useState({
    userId: null,
    isOpen: false
  });

  const dispatch = useDispatch();

  const [search, setSearch] = useState();

  useEffect(() => {
    if (isAdmin) {
      dispatch(fetchUsers());
    }

    return () => dispatch(clearUsersData());
  }, [dispatch, isAdmin]);

  useEffect(() => {
    if (deleted && !loading) {
      setDeleteModal(prevState => ({
        userId: null,
        isOpen: !prevState.isOpen
      }));
    }
  }, [deleted, loading]);

  const redirect = !isAdmin && <Redirect to={paths.ROOT} />;

  const onRemoveButtonClickHandler = userId => {
    setDeleteModal(prevState => ({
      userId,
      isOpen: !prevState.isOpen
    }));
  };

  const onCloseModalHandler = () => {
    setDeleteModal({ userId: null, isOpen: false });
  };

  const onDeleteUserHandler = () => {
    dispatch(deleteUser(deleteModal.userId));
  };

  const columns = [
    {
      Header: '',
      accessor: 'logoUrl',
      Cell: ({ row }) => (
        <div className="image">
          <img src={row.original.logoUrl} alt="" className="is-rounded" />
        </div>
      ),
      disableSortBy: true
    },
    {
      Header: 'Name',
      accessor: 'name'
    },
    {
      Header: 'Email',
      accessor: 'email'
    },
    {
      Header: 'Location',
      accessor: 'location'
    },
    {
      Header: 'Admin',
      accessor: 'isAdmin',
      Cell: ({ row }) => (
        <small className="has-text-grey is-abbr-like">
          {row.original.isAdmin ? (
            <span className="icon">
              <i className="mdi mdi-check" />
            </span>
          ) : (
            <span className="icon">
              <i className="mdi mdi-close" />
            </span>
          )}
        </small>
      )
    },
    {
      Header: 'Created',
      accessor: 'created',
      Cell: ({ row }) => (
        <small className="has-text-grey is-abbr-like">
          {row.original.createdAt}
        </small>
      )
    },
    {
      Header: '',
      id: 'actions',
      accessor: 'actions',
      Cell: ({ row }) => (
        <>
          {!row.original.isAdmin && (
            <div className="buttons is-right">
              <Link
                to={`/users/${row.original.id}`}
                className="button is-small is-primary"
              >
                <span className="icon is-small">
                  <i className="mdi mdi-account-edit" />
                </span>
              </Link>

              <button
                type="button"
                className="button is-small is-danger"
                onClick={() => onRemoveButtonClickHandler(row.original.id)}
              >
                <span className="icon is-small">
                  <i className="mdi mdi-trash-can" />
                </span>
              </button>
            </div>
          )}
        </>
      ),
      disableSortBy: true
    }
  ];

  const data = search
    ? usersList.filter(el => {
        const clonedElem = { ...el };
        delete clonedElem.id;
        delete clonedElem.tenant;
        delete clonedElem.isAdmin;
        delete clonedElem.logoUrl;
        return Object.values(clonedElem).some(field =>
          field.toLowerCase().includes(search.toLowerCase())
        );
      })
    : usersList;

  return (
    <>
      {redirect}
      {deleteModal.isOpen && (
        <ConfirmationModal
          isActive={deleteModal.isOpen}
          isLoading={loading}
          confirmButtonMessage="Delete"
          title="Confirm action"
          body="This will permanently delete the user. Action can not be undone."
          cancelButtonMessage="Cancel"
          onConfirmation={onDeleteUserHandler}
          onCancel={onCloseModalHandler}
        />
      )}
      <section className="hero is-hero-bar">
        <div className="hero-body">
          <div className="level">
            <div className="level-left">
              <div className="level-item">
                <h1 className="title">Users</h1>
              </div>
            </div>
            <div className="level-right">
              <div className="level-item">
                <Link to={paths.ADD_USER} className="button">
                  New User
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section is-main-section">
        <div className="card has-table has-mobile-sort-spaced">
          <header className="card-header">
            <p className={classNames('card-header-title', classes.tableHeader)}>
              <span>Search:</span>
              <input
                type="text"
                className="input"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </p>
          </header>
          <div className="b-table">
            {loading ? <ClipLoader /> : <Table columns={columns} data={data} />}
            {error && 'Show error'}
          </div>
        </div>
      </section>
    </>
  );
};

export default Users;
