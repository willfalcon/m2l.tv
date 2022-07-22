import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Modal from '../components/Modal';
import useSiteContext from '../components/SiteContext';
const about = () => {
  const { aboutContent } = useSiteContext();
  const about = true;

  return (
    <>
      <TransitionGroup component={null}>
        <CSSTransition key={about} timeout={500}>
          <>
            {about && (
              <Modal>
                <div dangerouslySetInnerHTML={{ __html: aboutContent }} />
              </Modal>
            )}
          </>
        </CSSTransition>
      </TransitionGroup>
    </>
  );
};

export default about;
