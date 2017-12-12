import React from 'react';
import { number, string, bool, object, oneOfType, array } from 'prop-types';
import calendar from 'assets/mission/calendar.png';
import { getTranslations } from 'utils/i18n';
import { StyledTextWhite } from 'styles/styledComponents/texts';
import {
  StyledMinHeightMargedTopRow,
  StyledMinHeightMargedTopRightRow,
  StyledMargedRightImage,
  StyledMinHeightMargedTopWhiteText,
} from '../../styles';

const MissionDeadline = ({
  daysLeft,
  status,
  printCalendar,
  style,
  centered,
}) => {
  return (
    <StyledMinHeightMargedTopRow>
      {status === 'in progress' ? (
        <StyledMinHeightMargedTopRightRow>
          {printCalendar && <StyledMargedRightImage source={calendar} />}
          <StyledTextWhite style={style}>
            {daysLeft > 0
              ? getTranslations('mission.deadline.text') + daysLeft.toString()
              : getTranslations('mission.deadline.expired')}
          </StyledTextWhite>
        </StyledMinHeightMargedTopRightRow>
      ) : (
        <StyledMinHeightMargedTopWhiteText centered={centered} style={style}>
          {getTranslations('mission.completed.text')}
        </StyledMinHeightMargedTopWhiteText>
      )}
    </StyledMinHeightMargedTopRow>
  );
};

MissionDeadline.defaultProps = {
  printCalendar: true,
  centered: false,
  style: {},
};

MissionDeadline.propTypes = {
  daysLeft: number.isRequired,
  status: string.isRequired,
  style: oneOfType([object, number, array]),
  printCalendar: bool,
  centered: bool,
};

export default MissionDeadline;
