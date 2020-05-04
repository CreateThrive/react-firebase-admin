import React from 'react';
import { FormattedMessage } from 'react-intl';

const Section = () => (
  <>
    <section className="hero is-hero-bar">
      <div className="hero-body">
        <h1 className="title">
          <FormattedMessage id="Section.section" defaultMessage="Section" />
        </h1>
      </div>
    </section>
    <section className="section is-main-section">
      <FormattedMessage id="Section.content" defaultMessage="Section content" />
    </section>
  </>
);

export default Section;
