import React, { PureComponent } from 'react';
import { TouchableWithoutFeedback, Animated } from 'react-native';
import { func, instanceOf } from 'prop-types';
import addPulse from 'assets/home/animation/addPulse.json';
import {
  StyledContainerCenter,
  StyledFlexContainerCenter,
} from 'styles/styledComponents/containers';
import { SaddPulseAnimation } from '../styles';

class Add extends PureComponent {
  componentDidMount() {
    if (this.animation !== null) {
      this.animation.play();
    }
  }

  animation = null;

  render() {
    const { action, scale } = this.props;
    return (
      <StyledFlexContainerCenter>
        <StyledContainerCenter>
          <TouchableWithoutFeedback onPress={action}>
            <Animated.View
              style={{
                transform: [{ scale }],
              }}
            >
              <SaddPulseAnimation
                innerRef={animation => {
                  this.animation = animation;
                }}
                loop
                size={addPulse.h}
                source={addPulse}
              />
            </Animated.View>
          </TouchableWithoutFeedback>
        </StyledContainerCenter>
      </StyledFlexContainerCenter>
    );
  }
}

Add.propTypes = {
  action: func.isRequired,
  scale: instanceOf(Animated.Value).isRequired,
};

export default Add;
