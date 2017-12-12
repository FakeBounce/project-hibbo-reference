import React from 'react';
import PropTypes from 'prop-types';
import { Image, PixelRatio, Animated, Easing } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  image: {
    width: 48,
    height: 48,
    backgroundColor: 'transparent',
  },
  shadow: {
    overflow: 'visible',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: {
      height: 10,
      width: -20,
    },
  },
});

export const UserPicture = ({ source, style, scale }) => {
  // const defaultWidth = (this.props.size === 'big' ? 100 : 25);
  // const defaultHeight = (this.props.size === 'big' ? 100 : 25);

  const defaultHeight = style.height;
  const defaultWidth = style.width;

  let height = 0;
  let width = 0;

  if (scale !== undefined && scale === false) {
    width = defaultWidth;
    height = defaultHeight;
  } else if (PixelRatio.get() === 1.5) {
    width = defaultWidth * 1.5;
    height = defaultHeight * 1.5;
  } else if (PixelRatio.get() === 2) {
    width = defaultWidth * 2;
    height = defaultHeight * 2;
  } else if (PixelRatio.get() === 3) {
    width = defaultWidth * 2.5;
    height = defaultHeight * 2.5;
  } else if (PixelRatio.get() === 3.5) {
    width = defaultWidth * 2.5;
    height = defaultHeight * 2.5;
  } else {
    width = defaultWidth;
    height = defaultHeight;
  }

  return (
    <Image
      source={{ uri: source }}
      style={[styles.image, { borderRadius: width / 2, width, height }, style]}
    />
  );
};

UserPicture.propTypes = {
  source: PropTypes.string.isRequired,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
    PropTypes.array,
  ]),
  scale: PropTypes.bool,
};

UserPicture.defaultProps = {
  scale: false,
  style: {
    height: 48,
    width: 48,
  },
};

export const UserPictureWithShadow = ({ style, ...props }) => (
  <UserPicture {...props} style={[styles.shadow, style]} />
);

UserPictureWithShadow.propTypes = {
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
    PropTypes.array,
  ]),
};

UserPictureWithShadow.defaultProps = {
  style: {},
};

export class UserPictureAnimated extends UserPicture {
  constructor(props) {
    super(props);
    this.state = {
      bounce: new Animated.Value(0.001),
    };
  }

  componentDidMount() {
    Animated.timing(this.state.bounce, {
      toValue: 1,
      delay: 500,
      duration: 500,
      easing: Easing.bounce,
    }).start();
  }

  render() {
    return (
      <Animated.View
        style={[
          { transform: [{ scale: this.state.bounce }] },
          this.props.style,
        ]}
      >
        <UserPicture {...this.props} />
      </Animated.View>
    );
  }
}

export class UserPictureWithShadowAnimated extends UserPictureAnimated {
  render() {
    return (
      <Animated.View style={[{ transform: [{ scale: this.state.bounce }] }]}>
        <UserPictureWithShadow {...this.props} />
      </Animated.View>
    );
  }
}
