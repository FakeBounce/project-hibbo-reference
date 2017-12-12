import React from 'react';
import { string, func } from 'prop-types';
import { StyledContainerCenter } from 'styledComponents/containers';
import { SLinkTouchable, SLinkText } from '../styles';

const Link = ({ label, action, textDecorationLine }) => {
  return (
    <StyledContainerCenter>
      <SLinkTouchable
        activeOpacity={1}
        onPress={() => {
          action();
        }}
      >
        <SLinkText textDecorationLine={textDecorationLine}>{label}</SLinkText>
      </SLinkTouchable>
    </StyledContainerCenter>
  );
};

Link.defaultProps = {
  textDecorationLine: 'none',
};

Link.propTypes = {
  label: string.isRequired,
  action: func.isRequired,
  textDecorationLine: string,
};

export default Link;
