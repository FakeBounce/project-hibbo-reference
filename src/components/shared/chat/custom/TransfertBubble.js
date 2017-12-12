import React from 'react';
import { arrayOf, string, func, bool, number } from 'prop-types';
import { View } from 'react-native';

import coin from 'assets/transfert/coin.png';
import styles from 'styles/appStyles';

import BotBubble from './BotBubble';

import {
  AnimatedStyledTransfertBubbleContainer,
  AniamtedStyledTransfertBubbleCenterContent,
  StyledTransfertBubbleText,
  StyledTransfertBubbleText1,
  StyledTransfertBubbleText2,
  StyledTransfertBubbleText3,
  StyledTransfertBubbleAmount,
  StyledTransfertBubbleCoin,
} from './stylesCustom';

class TransfertBubble extends BotBubble {
  constructor(props) {
    super(props);

    this.maxWidth = 260;
  }

  // Called by renderTextBubble of BotBubble
  renderContent() {
    return (
      <StyledTransfertBubbleText
        bubbleMaxWidth={this.maxWidth}
        style={{
          width: this.width,
          height: this.height,
        }}
      >
        <View>
          <StyledTransfertBubbleText1>
            {this.props.speech[0]}
          </StyledTransfertBubbleText1>
          <StyledTransfertBubbleText2>
            {this.props.speech[1]}
          </StyledTransfertBubbleText2>
          <StyledTransfertBubbleAmount>
            <StyledTransfertBubbleText3>
              {`${this.props.amount}€`}
            </StyledTransfertBubbleText3>
          </StyledTransfertBubbleAmount>
        </View>
        <StyledTransfertBubbleCoin source={coin} />
      </StyledTransfertBubbleText>
    );
  }

  render() {
    return (
      <AnimatedStyledTransfertBubbleContainer
        isSame={this.props.isSame}
        bubblePosition={this.props.position}
        style={[
          this.props.animated ? { flex: 1 } : this.main,
          {
            backgroundColor:
              styles.colors[this.state.toggled ? 'blueGreen' : 'buttonGrey'],
          },
        ]}
      >
        {!this.state.toggled && this.renderFakeBubble()}
        <AniamtedStyledTransfertBubbleCenterContent
          style={[
            this.props.animated ? { flex: 1 } : this.bubble,
            { margin: this.state.toggled ? 15 : 0 },
          ]}
        >
          {this.state.toggled
            ? this.renderTextBubble()
            : this.renderTypingBubble()}
        </AniamtedStyledTransfertBubbleCenterContent>
      </AnimatedStyledTransfertBubbleContainer>
    );
  }
}

TransfertBubble.propTypes = {
  position: string.isRequired,
  isSame: bool.isRequired,
  speech: arrayOf(string.isRequired).isRequired,
  updateMessage: func.isRequired,
  animated: bool.isRequired,
  width: number.isRequired,
  height: number.isRequired,
  amount: string.isRequired,
};

export default TransfertBubble;
