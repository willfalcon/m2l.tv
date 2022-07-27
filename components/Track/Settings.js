import React, { useState } from 'react';
import { IoSettingsSharp } from 'react-icons/io5';
import styled from 'styled-components';

import Modal from '../Modal';
import useSiteContext from '../SiteContext';

const Settings = () => {
  const [open, setOpen] = useState(false);

  const { autoplay, setAutoplay } = useSiteContext();

  return (
    <>
      <Button className="settings-button" onClick={() => setOpen(true)}>
        Settings <IoSettingsSharp />
      </Button>
      <SettingsModal open={open} onClose={() => setOpen(false)}>
        <h3>Settings</h3>
        <label>
          <input type="radio" name="autoplay" value="autoplay" checked={autoplay === 'autoplay'} onChange={() => setAutoplay('autoplay')} />{' '}
          Autoplay
        </label>
        <label>
          <input
            type="radio"
            name="autoplay"
            value="countdown"
            checked={autoplay === 'countdown'}
            onChange={() => setAutoplay('countdown')}
          />{' '}
          Autoplay with Countdown
        </label>
        <label>
          <input type="radio" name="autoplay" value="no" checked={autoplay === 'no'} onChange={() => setAutoplay('no')} /> Don't Autoplay
        </label>
      </SettingsModal>
    </>
  );
};

const SettingsModal = styled(Modal)`
  flex-direction: column;
  align-items: start;
  label {
    cursor: pointer;
  }
`;

const Button = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  color: white;
  border: 0;
  display: flex;
  align-items: center;
  svg {
    color: white;
    margin-left: 5px;
  }
`;
export default Settings;
