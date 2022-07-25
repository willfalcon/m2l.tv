import React from 'react';
import { useRouter } from 'next/router';

import Modal from './Modal';
import useSiteContext from './SiteContext';

const HeaderModals = ({ about, works, toggleAbout, toggleWorks }) => {
  const { aboutContent, worksContent } = useSiteContext();
  const router = useRouter();
  return (
    <>
      <Modal
        open={about}
        onClose={() => {
          toggleAbout(false);
          router.push('/', undefined, { shallow: true });
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: aboutContent }} />
      </Modal>
      <Modal
        open={works}
        onClose={() => {
          toggleWorks(false);
          router.push('/', undefined, { shallow: true });
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: worksContent }} />
      </Modal>
    </>
  );
};

export default HeaderModals;
