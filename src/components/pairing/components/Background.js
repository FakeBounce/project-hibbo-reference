import React, { PureComponent } from 'react';
import { Animated, Dimensions, StyleSheet } from 'react-native';
import { string, bool } from 'prop-types';

import monkey from 'assets/pairing/monkey/monkeyBg.png';
import whale from 'assets/pairing/whale/whaleBg.png';
import panda from 'assets/pairing/panda/pandaBg.png';

import { StyledContainerBasic } from 'styledComponents/containers';

const { width, height } = Dimensions.get('window');

const SContainer = StyledContainerBasic.extend`
  position: absolute;
  top: 0;
  left: 0;
  width: ${width}px;
  height: ${height}px;
  background-color: ${props => props.theme.colors.white};
`;
const styles = StyleSheet.create({
  image: {
    width,
    height,
  },
});

class Background extends PureComponent {
  state = {
    opacity: new Animated.Value(this.props.animated ? 0 : 1),
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.type !== nextProps.type) {
      this.state.opacity.setValue(0);

      Animated.timing(this.state.opacity, {
        toValue: 1,
        duration: 200,
      }).start();
    } else if (this.props.reset !== nextProps.reset && nextProps.reset) {
      Animated.timing(this.state.opacity, {
        toValue: 0,
        duration: 200,
      }).start();
    }
  }

  renderBg() {
    const { type } = this.props;

    switch (type) {
      default:
      case 'monkey':
        return monkey;
      case 'whale':
        return whale;
      case 'panda':
        return panda;
    }
  }

  render() {
    const { opacity } = this.state;
    const { type } = this.props;

    return (
      <SContainer>
        {type !== '' && (
          <Animated.Image
            source={this.renderBg()}
            style={[styles.image, { opacity }]}
            resizeMode="cover"
          />
        )}
      </SContainer>
    );
  }
}

Background.defaultProps = {
  animated: false,
};

Background.propTypes = {
  type: string.isRequired,
  reset: bool.isRequired,
  animated: bool,
};

export default Background;
