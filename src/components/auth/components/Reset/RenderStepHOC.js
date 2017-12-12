import React, { PureComponent } from 'react';
import { number } from 'prop-types';
import { Animated } from 'react-native';
import { bind } from 'decko';

const RenderStepHOCHandler = Target => {
  class RenderStepHOC extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        step: this.props.step,
      };

      this.animatedOpacity = new Animated.Value(1);
    }

    componentWillReceiveProps(nextProps) {
      if (this.props.step !== nextProps.step) {
        if (nextProps.step === 1 || nextProps.step === 2) {
          this.animateFadeOutIn(nextProps.step);
        } else {
          this.setState(state => {
            return {
              ...state,
              step: nextProps.step,
            };
          });
        }
      }
    }

    @bind
    animateFadeOutIn(step) {
      Animated.timing(this.animatedOpacity, {
        toValue: 0,
      }).start(() => {
        this.setState(
          state => {
            return {
              ...state,
              step,
            };
          },
          () => {
            Animated.timing(this.animatedOpacity, {
              toValue: 1,
            }).start();
          },
        );
      });
    }

    render() {
      const { step } = this.state;
      return (
        <Animated.View style={{ opacity: this.animatedOpacity }}>
          <Target {...this.props} step={step} />
        </Animated.View>
      );
    }
  }
  RenderStepHOC.propTypes = {
    step: number.isRequired,
  };

  return RenderStepHOC;
};

export default RenderStepHOCHandler;
