import React from 'react';
import { string, func, bool, number } from 'prop-types';

import { getTranslations, getTrueNumber } from 'utils/i18n';
import { StyledContainerImageCenter } from 'styles/styledComponents/containers';

import coin from 'assets/transfert/coin.png';

import TransfertBubble from './TransfertBubble';

import {
  StyledDefautlTransfertBubbleText,
  StyledDefautlTransfertBubbleText1,
} from './stylesCustom';

// Use render of Transfert Bubble
class DefaultTransfertBubble extends TransfertBubble {
  // Called by renderTextBubble of BotBubble
  renderContent() {
    const { transaction } = this.props;
    const amount =
      transaction.amount > 0 ? transaction.amount : transaction.amount * -1;
    return (
      <StyledDefautlTransfertBubbleText>
        <StyledDefautlTransfertBubbleText1>
          {getTranslations(
            `messenger.default.message.bubble.${transaction.type}`,
            {
              amount: getTrueNumber(amount),
            },
          )}
        </StyledDefautlTransfertBubbleText1>
        <StyledContainerImageCenter source={coin} />
      </StyledDefautlTransfertBubbleText>
    );
  }
}

DefaultTransfertBubble.propTypes = {
  position: string.isRequired,
  isSame: bool.isRequired,
  updateMessage: func.isRequired,
  animated: bool.isRequired,
  width: number.isRequired,
  height: number.isRequired,
};

export default DefaultTransfertBubble;
