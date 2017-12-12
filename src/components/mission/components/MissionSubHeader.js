import React from 'react';
import { func, bool } from 'prop-types';
import { getTranslations } from 'utils/i18n';
import { StyledTextSmall } from 'styles/styledComponents/texts';
import { StyledSubMissionHeader } from '../styles';

const MissionSubHeader = ({ onPressAdd, onPressEdit, editMode }) => {
  return (
    <StyledSubMissionHeader>
      <StyledTextSmall onPress={onPressEdit}>
        {editMode
          ? getTranslations('mission.menu.done')
          : getTranslations('mission.menu.modify')}
      </StyledTextSmall>
      <StyledTextSmall onPress={onPressAdd}>
        {getTranslations('mission.menu.add')}
      </StyledTextSmall>
    </StyledSubMissionHeader>
  );
};

MissionSubHeader.propTypes = {
  onPressAdd: func.isRequired,
  onPressEdit: func.isRequired,
  editMode: bool.isRequired,
};

export default MissionSubHeader;
