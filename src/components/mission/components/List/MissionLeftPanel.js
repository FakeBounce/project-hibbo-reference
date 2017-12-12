import React from 'react';
import { string, number, bool } from 'prop-types';
import { StyledSemiRow } from 'styles/styledComponents/containers';
import MissionDeadline from './MissionDeadline';
import MissionLabel from './MissionLabel';
import MissionAmount from './MissionAmount';

const MissionLeftPanel = ({ amount, status, title, daysLeft, editMode }) => {
  return (
    <StyledSemiRow editMode={editMode}>
      <MissionDeadline daysLeft={daysLeft > 0 ? daysLeft : 0} status={status} />
      <MissionLabel label={title} />
      <MissionAmount amount={amount} />
    </StyledSemiRow>
  );
};

MissionLeftPanel.propTypes = {
  amount: string.isRequired,
  status: string.isRequired,
  title: string.isRequired,
  daysLeft: number.isRequired,
  editMode: bool.isRequired,
};

export default MissionLeftPanel;
