import React, { PureComponent } from 'react';
import { number, shape, string } from 'prop-types';
import { Animated } from 'react-native';
import { connect } from 'react-redux';
import { bind } from 'decko';
import getRippleAnimation from 'utils/sharedAnimation';

import { StyledAbsolute } from 'styles/styledComponents/containers';
import { ARippleAndroid } from '../styles';

class AndroidRipple extends PureComponent {
  state = {
    isVisible: false,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.position !== this.props.position) {
      this.setState(
        state => ({
          ...state,
          isVisible: true,
        }),
        () => {
          Animated.parallel(
            getRippleAnimation(
              this.rippleOpacity,
              this.rippleScale,
              this.props.rippleMaxOpacity,
            ),
          ).start(() => {
            this.rippleOpacity.setValue(0);
            this.rippleScale.setValue(0.4);
            this.setState(state => ({
              ...state,
              isVisible: false,
            }));
          });
        },
      );
    }
  }

  rippleScale = new Animated.Value(0.4);
  rippleOpacity = new Animated.Value(0);

  @bind
  rippleFinish() {
    this.setState(state => ({
      ...state,
      isVisible: false,
    }));
  }

  render() {
    const { position, rippleColor, rippleSize } = this.props;
    const { isVisible } = this.state;

    return (
      <StyledAbsolute>
        {isVisible && (
          <ARippleAndroid
            rippleColor={rippleColor}
            rippleSize={rippleSize}
            style={[
              {
                left: position.x - rippleSize / 2,
                top: position.y - rippleSize / 2,
                transform: [{ scale: this.rippleScale }],
                opacity: this.rippleOpacity,
              },
            ]}
          />
        )}
      </StyledAbsolute>
    );
  }
}

AndroidRipple.defaultProps = {
  rippleMaxOpacity: 0.1,
  rippleColor: '#303030',
  rippleSize: 70,
};

AndroidRipple.propTypes = {
  position: shape({ x: number, y: number }).isRequired,
  rippleMaxOpacity: number,
  rippleColor: string,
  rippleSize: number,
};

const mapStateToProps = state => {
  return {
    position: state.app.ripplePosition,
  };
};

export default connect(mapStateToProps)(AndroidRipple);
