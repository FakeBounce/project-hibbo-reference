import React from 'react';
import { string } from 'prop-types';
import { StyledSemiRow } from 'styles/styledComponents/containers';
import MissionCompleted from './MissionCompleted';
import { StyledListIcon } from '../../styles';

const MissionRightPanel = ({ status, icon, theme }) => {
  return (
    <StyledSemiRow>
      {status === 'done' && <MissionCompleted />}
      <StyledListIcon icon={icon} theme={theme} />
    </StyledSemiRow>
  );
};

MissionRightPanel.propTypes = {
  status: string.isRequired,
  icon: string.isRequired,
  theme: string.isRequired,
};

export default MissionRightPanel;
