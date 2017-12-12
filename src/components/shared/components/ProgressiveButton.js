import React, { PureComponent } from 'react';
import { bind } from 'decko';
import {
  string,
  number,
  bool,
  object,
  oneOfType,
  array,
  func,
} from 'prop-types';
import { TouchableWithoutFeedback, Animated } from 'react-native';
import {
  SProgressiveButton,
  SProgressiveButtonText,
  AnimatedProgress,
} from '../styles';

class ProgressiveButton extends PureComponent {
  constructor(props) {
    super(props);

    this.endWidth = this.props.width;
    this.progressWidth = new Animated.Value(0);

    this.animationProgressButton = Animated.timing(this.progressWidth, {
      toValue: this.endWidth,
      duration: 1000,
    });
  }

  @bind
  onBeginPress() {
    this.animationProgressButton.start(() => {
      if (this.progressWidth._value === this.endWidth) {
        this.progressWidth.setValue(0);
        this.props.action();
      }
    });
  }

  @bind
  onStopPress() {
    this.animationProgressButton.stop();
    if (this.progressWidth._value < this.endWidth)
      Animated.timing(this.progressWidth, {
        toValue: 0,
        duration: 300,
      }).start();
  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPressIn={this.onBeginPress}
        onPressOut={this.onStopPress}
      >
        <SProgressiveButton
          rounded={this.props.rounded}
          style={{ width: this.props.width }}
        >
          <AnimatedProgress style={{ width: this.progressWidth }} />
          <SProgressiveButtonText style={this.props.styleText}>
            {this.props.text}
          </SProgressiveButtonText>
        </SProgressiveButton>
      </TouchableWithoutFeedback>
    );
  }
}

ProgressiveButton.defaultProps = {
  styleText: {},
};

ProgressiveButton.propTypes = {
  rounded: bool.isRequired,
  text: string.isRequired,
  action: func.isRequired,
  width: number.isRequired,
  styleText: oneOfType([object, number, array]),
};

export default ProgressiveButton;
