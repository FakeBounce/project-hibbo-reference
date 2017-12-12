import React from 'react';
import { oneOfType, string, instanceOf, func } from 'prop-types';
import dateFormat from 'dateformat';

import {
  StyledDateBubbleText,
  StyledDateBubbleTouchableRipple,
} from './stylesCustom';

const DateBubble = ({ date, onDatePress }) => {
  const padding = 120;

  return (
    <StyledDateBubbleTouchableRipple
      styleRipple={{
        right: padding,
      }}
      paddingSup={padding}
      onPress={() => onDatePress(date)}
    >
      <StyledDateBubbleText>
        {dateFormat(date, 'dd.mm.yy')}
      </StyledDateBubbleText>
    </StyledDateBubbleTouchableRipple>
  );
};

DateBubble.propTypes = {
  date: oneOfType([string, instanceOf(Date)]).isRequired,
  onDatePress: func.isRequired,
};

export default DateBubble;
