import React from 'react';
import { FormattedMessage } from 'react-intl';

const Submenu = () => (
  <>
    <section className="hero is-hero-bar">
      <div className="hero-body">
        <h1 className="title">
          <FormattedMessage id="Submenu.submenu" defaultMessage="Submenu" />
        </h1>
      </div>
    </section>
    <section className="section is-main-section">
      <FormattedMessage id="Submenu.content" defaultMessage="Submenu content" />
    </section>
  </>
);

export default Submenu;
