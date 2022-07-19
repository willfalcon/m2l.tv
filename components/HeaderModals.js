import React, { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Modal, { Backdrop } from './Modal';
import useSiteContext from './SiteContext';
const HeaderModals = ({ about, works, toggleAbout, toggleWorks }) => {
  const { aboutContent, worksContent } = useSiteContext();

  return (
    <>
      <TransitionGroup component={null}>
        {/* <CSSTransition key={backdrop} timeout={500}>
          <>{backdrop && <Backdrop />}</>
        </CSSTransition> */}
        <CSSTransition key={about} timeout={500}>
          <>
            {about && (
              <Modal onClose={() => toggleAbout(false)}>
                <div dangerouslySetInnerHTML={{ __html: aboutContent }} />
              </Modal>
            )}
          </>
        </CSSTransition>
        <CSSTransition key={works} timeout={500}>
          <>
            {works && (
              <Modal onClose={() => toggleWorks(false)}>
                <div dangerouslySetInnerHTML={{ __html: worksContent }} />
              </Modal>
            )}
          </>
        </CSSTransition>
      </TransitionGroup>
    </>
  );
};

export default HeaderModals;
