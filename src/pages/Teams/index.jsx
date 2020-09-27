import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import { useFormatMessage } from 'hooks';
import TeamsCard from 'components/TeamsCard';
import UsersCard from 'components/UsersCard';
import { fetchTeamUsers } from 'state/actions/teams';

import './Teams.scss';

const Teams = () => {
  const { teamId, teamsList } = useSelector(
    (state) => ({
      teamsList: state.teams.teamsList,
      teamId: state.teams.teamId,
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (!teamId && teamsList.length > 0) {
      const newTeamId = teamsList[0].id;
      dispatch(fetchTeamUsers(newTeamId));
    }
  }, [dispatch, teamId, teamsList]);

  return (
    <>
      <section className="hero is-hero-bar">
        <div className="hero-body">
          <div className="level">
            <div className="level-left">
              <div className="level-item">
                <h1 className="title">{useFormatMessage('Teams.teams')}</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section is-main-section">
        <div className="columns">
          <div className="column">
            <TeamsCard />
          </div>
          <div className="column">
            <UsersCard />
          </div>
        </div>
      </section>
    </>
  );
};

export default Teams;
