import React from 'react';
import { string } from 'prop-types';

import {
  StyledTextBubbleContainer,
  StyledTextBubbleText,
} from './stylesCustom';

const TextBubble = ({ children }) => (
  <StyledTextBubbleContainer>
    <StyledTextBubbleText>{children}</StyledTextBubbleText>
  </StyledTextBubbleContainer>
);

TextBubble.propTypes = {
  children: string.isRequired,
};

export default TextBubble;
