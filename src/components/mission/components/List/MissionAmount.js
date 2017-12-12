import React from 'react';
import { number, object, oneOfType, array, string } from 'prop-types';
import { StyledWhiteTextXSmallBold } from 'styles/styledComponents/texts';
import { StyledMargedTopColumn, StyledWhiteRoundWrapper } from '../../styles';

const MissionAmount = ({ amount, wrapperStyle, rowStyle, style }) => {
  let width = 55;
  if (amount.length > 2) {
    width += (amount.length - 2) * 8;
  }
  return (
    <StyledMargedTopColumn style={rowStyle}>
      <StyledWhiteRoundWrapper style={[wrapperStyle, { width }]}>
        <StyledWhiteTextXSmallBold style={style}>
          {amount}€
        </StyledWhiteTextXSmallBold>
      </StyledWhiteRoundWrapper>
    </StyledMargedTopColumn>
  );
};

MissionAmount.defaultProps = {
  wrapperStyle: {},
  rowStyle: {},
  style: {},
};

MissionAmount.propTypes = {
  amount: string.isRequired,
  wrapperStyle: oneOfType([object, number, array]),
  rowStyle: oneOfType([object, number, array]),
  style: oneOfType([object, number, array]),
};

export default MissionAmount;
