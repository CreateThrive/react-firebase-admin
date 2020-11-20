/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { fetchTeamUsers } from 'state/actions/teams';
import { useFormatDate } from 'hooks';
import userDefaultLogo from 'assets/user-default-log.jpg';
import teamDeaultLogo from 'assets/team-default-log.png';

const MediaCard = ({ content, onDeleteHandler, onModifyHandler, isUser }) => {
  const { isAdmin, teamId } = useSelector(
    (state) => ({
      isAdmin: state.auth.userData.isAdmin,
      teamId: state.teams.teamId,
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  const onSelectedHandler = () => {
    if (!isUser && content.id !== teamId) {
      dispatch(fetchTeamUsers(content.id));
    }
  };

  const userCreatedAt = useFormatDate(content.createdAt, {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div
      onClick={onSelectedHandler}
      className={classNames('media', {
        'has-background-light': content.id === teamId && !isUser,
      })}
      style={{
        marginTop: 'auto',
        marginBottom: 'auto',
        paddingBottom: '1rem',
        cursor: !isUser && content.id !== teamId && 'pointer',
      }}
      data-testid="media"
    >
      <figure className="media-left">
        <p className="image is-64x64">
          <img
            className="is-rounded"
            src={content.logoUrl || (isUser ? userDefaultLogo : teamDeaultLogo)}
            alt="Profile logo preview"
          />
        </p>
      </figure>
      <div className="media-content">
        <div className="content">
          <p className="media-meta">
            <strong>{content.name}</strong>{' '}
            {isUser && <small className="has-text-grey">{userCreatedAt}</small>}
          </p>
          {isUser ? <p>{content.email}</p> : <p>{content.description}</p>}
        </div>
      </div>

      {isAdmin && (
        <div className="media-right">
          <div className="field is-grouped is-grouped-multiline">
            <div className="control">
              {isUser ? (
                <Link to={`/users/${content.id}`}>
                  <span className="icon">
                    <i className="mdi mdi-account-edit" />
                  </span>
                </Link>
              ) : (
                <span
                  className="icon has-text-info"
                  onClick={onModifyHandler}
                  data-testid="modify"
                  style={{ cursor: 'pointer' }}
                >
                  <i className="mdi mdi-pencil" />
                </span>
              )}
            </div>
            <div className="control">
              <span
                className="icon has-text-danger"
                onClick={() => onDeleteHandler(content.id)}
                data-testid="delete"
                style={{ cursor: 'pointer' }}
              >
                <i className="mdi mdi-cancel" />
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const userPropTypes = PropTypes.shape({
  id: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  location: PropTypes.string,
  logoUrl: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
});

const teamPropTypes = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  logoUrl: PropTypes.string,
  createdBy: PropTypes.string.isRequired,
});

MediaCard.propTypes = {
  isUser: PropTypes.bool,
  content: PropTypes.oneOfType([teamPropTypes, userPropTypes]).isRequired,
  onModifyHandler: PropTypes.func,
  onDeleteHandler: PropTypes.func.isRequired,
};

MediaCard.defaultProps = {
  isUser: false,
};

export default MediaCard;
