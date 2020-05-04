import React from 'react';
import { FormattedMessage } from 'react-intl';

const Home = () => (
  <>
    <section className="hero is-hero-bar">
      <div className="hero-body">
        <h1 className="title">
          <FormattedMessage id="Home.home" defaultMessage="Home" />
        </h1>
      </div>
    </section>
    <section className="section is-main-section">
      <FormattedMessage id="Home.content" defaultMessage="Home content" />
    </section>
  </>
);

export default Home;
