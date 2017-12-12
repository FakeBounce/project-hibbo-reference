import React from 'react';
import { Animated } from 'react-native';
import {
  instanceOf,
  shape,
  string,
  number,
  oneOfType,
  object,
} from 'prop-types';

import getOutputRange from 'utils/rangeGenerator';

import theme from 'styles/appStyles';
import * as Styles from '../styles';

const SliderDots = ({ monimalz, index, style, scrollX }) => {
  const opacity = scrollX.interpolate({
    inputRange: theme.swiperRange,
    outputRange: getOutputRange(1, 0.1, theme.swiperRange.length),
  });

  return (
    <Styles.SDotWraper>
      <Styles.SDotBg style={style} />
      {Object.keys(monimalz).map((current, ind) => {
        return (
          <Styles.SDot
            key={`${monimalz[current].name}${ind}`}
            isCurrent={index === ind}
            style={[
              {
                opacity:
                  index === ind || index - 1 === ind || index + 1 === ind
                    ? opacity
                    : 1,
              },
            ]}
          />
        );
      })}
    </Styles.SDotWraper>
  );
};

SliderDots.propTypes = {
  monimalz: shape({
    monkey: shape({
      name: string.isRequired,
      image: shape({}).isRequired,
    }).isRequired,
    whale: shape({
      name: string.isRequired,
      image: shape({}).isRequired,
    }).isRequired,
    panda: shape({
      name: string.isRequired,
      image: shape({}).isRequired,
    }).isRequired,
  }).isRequired,
  index: number.isRequired,
  style: oneOfType([number, string, object]).isRequired,
  scrollX: instanceOf(Animated.Value).isRequired,
};

export default SliderDots;
