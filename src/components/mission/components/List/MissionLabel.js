import React from 'react';
import { string } from 'prop-types';
import { StyledMissionLabel, StyledLittleMargedTopColumn } from '../../styles';

const MissionLabel = ({ label }) => {
  return (
    <StyledLittleMargedTopColumn>
      <StyledMissionLabel>{label}</StyledMissionLabel>
    </StyledLittleMargedTopColumn>
  );
};

MissionLabel.propTypes = {
  label: string.isRequired,
};

export default MissionLabel;
