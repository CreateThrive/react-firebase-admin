import React from 'react';

import { useFormatMessage } from 'hooks';

const Section = () => (
  <>
    <section className="hero is-hero-bar">
      <div className="hero-body">
        <h1 className="title">{useFormatMessage('Section.section')}</h1>
      </div>
    </section>
    <section className="section is-main-section">
      {useFormatMessage('Section.content')}
    </section>
  </>
);

export default Section;
