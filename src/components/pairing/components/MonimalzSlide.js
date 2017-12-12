import React from 'react';
import { Animated, Dimensions } from 'react-native';
import {
  string,
  number,
  func,
  oneOfType,
  object,
  array,
  shape,
} from 'prop-types';
import styled from 'styled-components/native';
import Animation from 'lottie-react-native';

const SContainerSlide = styled.TouchableOpacity`
  width: ${Dimensions.get('window').width}px;
  margin-top: 25px;
  align-items: center;
  z-index: 4;
`;
const SAnimation = styled(Animated.createAnimatedComponent(Animation))`
  width: ${props => props.imageWidth}px;
  height: ${props => props.imageHeight}px;
  right: ${props => (Dimensions.get('window').width - props.imageWidth) / 4};
`;

const MonimalzSlide = ({
  name,
  source,
  action,
  style,
  type,
  imageWidth,
  imageHeight,
}) => {
  return (
    <SContainerSlide
      activeOpacity={1}
      onPress={() => {
        if (type === '') {
          action(name);
        }

        return null;
      }}
    >
      <SAnimation
        innerRef={anim => {
          if (anim) {
            anim._component.play();
          }
        }}
        source={source}
        style={style}
        imageWidth={imageWidth}
        imageHeight={imageHeight}
        loop
      />
    </SContainerSlide>
  );
};

MonimalzSlide.defaultProps = {
  style: {},
};

MonimalzSlide.propTypes = {
  name: string.isRequired,
  source: shape({}).isRequired,
  action: func.isRequired,
  type: string.isRequired,
  style: oneOfType([object, number, array]),
  imageWidth: number.isRequired,
  imageHeight: number.isRequired,
};

export default MonimalzSlide;
