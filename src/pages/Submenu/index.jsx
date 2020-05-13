import React from 'react';

import { useFormatMessage } from 'hooks';

const Submenu = () => (
  <>
    <section className="hero is-hero-bar">
      <div className="hero-body">
        <h1 className="title">{useFormatMessage('Submenu.submenu')}</h1>
      </div>
    </section>
    <section className="section is-main-section">
      {useFormatMessage('Submenu.content')}
    </section>
  </>
);

export default Submenu;
