import React from 'react';

import { useFormatMessage } from 'hooks';

const Home = () => (
  <>
    <section className="hero is-hero-bar">
      <div className="hero-body">
        <h1 className="title">{useFormatMessage('Home.home')}</h1>
      </div>
    </section>

    <section className="section is-main-section">
      {useFormatMessage('Home.content')}
    </section>
  </>
);

export default Home;
