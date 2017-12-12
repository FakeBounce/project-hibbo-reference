import React, { PureComponent } from 'react';
import { string, func, bool, number, shape } from 'prop-types';
import { View, Animated, Easing } from 'react-native';

import {
  AnimatedStyledBotBubbleContainer,
  StyledBotBubbleFakeBubble,
  StyledBotBubbleText,
  AnimatedStyledBotBubbleCenterContent,
  StyledBotBubbleSizing,
} from './stylesCustom';

import TypingBubble from './TypingBubble';

class BotBubble extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      toggled: this.props.animated,
    };

    this.animetedStyles = {
      typingOpacity: new Animated.Value(1),
      textOpacity: new Animated.Value(this.state.toggled ? 1 : 0),
    };
    this.bubble = {
      width: new Animated.Value(this.state.toggled ? this.props.width : 70),
      height: new Animated.Value(this.state.toggled ? this.props.height : 50),
      margin: new Animated.Value(this.state.toggled ? 15 : 0),
    };
    this.main = {
      width: new Animated.Value(
        this.state.toggled ? this.props.width + 15 * 2 : 70,
      ),
      height: new Animated.Value(
        this.state.toggled ? this.props.height + 15 * 2 : 50,
      ),
    };

    this.transitionBubble = this.transitionBubble.bind(this);
    this.mounted = false;
  }

  componentDidMount() {
    this.mounted = true;
    if (!this.state.toggled) {
      setTimeout(() => {
        if (!this.mounted) return;
        this.fakeBubble.measure((a, b, width, height) => {
          this.width = width;
          this.height = height;

          this.props.updateMessage({
            width: this.width,
            height: this.height,
          });
        });

        this.transitionBubble();
      }, 500);
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  displayText() {
    Animated.timing(this.animetedStyles.textOpacity, {
      toValue: 1,
      duration: 300,
      easing: Easing.inOut(Easing.exp),
    }).start();
  }

  showText() {
    this.setState(
      state => {
        return {
          ...state,
          toggled: true,
        };
      },
      () => {
        this.displayText();
      },
    );
  }

  transitionBubble() {
    // Fade out the typing image
    setTimeout(() => {
      if (!this.mounted) return;

      this.fadeTyping();
    }, 500);

    // Resize the bubble
    setTimeout(() => {
      if (!this.mounted) return;

      this.resizeBubble(this.width, this.height);
    }, 1200);
  }

  fadeTyping() {
    Animated.timing(this.animetedStyles.typingOpacity, {
      toValue: 0,
      duration: 300,
      easing: Easing.inOut(Easing.exp),
    }).start();
  }

  resizeBubble(newWidth, newHeight) {
    Animated.parallel([
      Animated.timing(this.bubble.width, {
        toValue: newWidth + 10,
        duration: 300,
        easing: Easing.elastic(0.7),
      }),
      Animated.timing(this.bubble.height, {
        toValue: newHeight,
        duration: 300,
        easing: Easing.elastic(0.7),
      }),
      Animated.timing(this.main.width, {
        toValue: newWidth + 10 + 15 * 2,
        duration: 300,
        easing: Easing.elastic(0.7),
      }),
      Animated.timing(this.main.height, {
        toValue: newHeight + 15 * 2,
        duration: 300,
        easing: Easing.elastic(0.7),
      }),
      Animated.timing(this.bubble.margin, {
        toValue: 15,
        duration: 300,
        easing: Easing.elastic(0.7),
      }),
    ]).start(() => {
      // Set bubble to toggled & fade in the text
      this.showText();
    });
  }

  renderFakeBubble() {
    return (
      <StyledBotBubbleFakeBubble>
        <StyledBotBubbleSizing>
          <StyledBotBubbleFakeBubble>
            <View
              ref={fakeBubble => {
                this.fakeBubble = fakeBubble;
              }}
            >
              {this.renderContent()}
            </View>
          </StyledBotBubbleFakeBubble>
        </StyledBotBubbleSizing>
      </StyledBotBubbleFakeBubble>
    );
  }

  renderTypingBubble() {
    return (
      <Animated.View
        style={{
          opacity: this.animetedStyles.typingOpacity,
        }}
      >
        <TypingBubble />
      </Animated.View>
    );
  }

  renderContent() {
    return <StyledBotBubbleText>{this.props.speech}</StyledBotBubbleText>;
  }

  renderTextBubble() {
    return (
      <Animated.View
        style={{
          opacity: this.animetedStyles.textOpacity,
        }}
      >
        {this.renderContent()}
      </Animated.View>
    );
  }

  render() {
    return (
      <AnimatedStyledBotBubbleContainer
        currentMessage={this.props.currentMessage}
        isSame={this.props.isSame}
        bubblePosition={this.props.position}
        isToggled={this.state.toggled}
        style={this.main}
      >
        {!this.state.toggled && this.renderFakeBubble()}
        <AnimatedStyledBotBubbleCenterContent
          isToggled={this.state.toggled}
          style={this.bubble}
        >
          {this.state.toggled
            ? this.renderTextBubble()
            : this.renderTypingBubble()}
        </AnimatedStyledBotBubbleCenterContent>
      </AnimatedStyledBotBubbleContainer>
    );
  }
}

BotBubble.propTypes = {
  position: string.isRequired,
  isSame: bool.isRequired,
  speech: string.isRequired,
  updateMessage: func.isRequired,
  animated: bool.isRequired,
  width: number.isRequired,
  height: number.isRequired,
  currentMessage: shape().isRequired,
};

export default BotBubble;
