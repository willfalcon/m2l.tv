import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Modal from '../components/Modal';
import useSiteContext from '../components/SiteContext';

const works = () => {
  const { worksContent } = useSiteContext();

  const works = true;

  return (
    <>
      <TransitionGroup component={null}>
        {/* <CSSTransition key={backdrop} timeout={500}>
          <>{backdrop && <Backdrop />}</>
        </CSSTransition> */}
        <CSSTransition key={works} timeout={500}>
          <>
            {works && (
              <Modal>
                <div dangerouslySetInnerHTML={{ __html: worksContent }} />
              </Modal>
            )}
          </>
        </CSSTransition>
      </TransitionGroup>
    </>
  );
};

export default works;
