import React from 'react';
import { number, shape, func, instanceOf } from 'prop-types';
import { Animated } from 'react-native';

import { AConnected, SContainerRipple, SLogo, SIcon } from '../styles';

const Logo = ({ imgSrc, style, onPress }) => {
  return (
    <SLogo>
      <SContainerRipple onPress={onPress}>
        <SIcon source={imgSrc} />
      </SContainerRipple>
      <AConnected style={style} />
    </SLogo>
  );
};

Logo.defaultProps = {
  style: {
    opacity: new Animated.Value(0),
  },
};

Logo.propTypes = {
  imgSrc: number.isRequired,
  style: shape({
    opacity: instanceOf(Animated.Value),
  }),
  onPress: func.isRequired,
};

export default Logo;
