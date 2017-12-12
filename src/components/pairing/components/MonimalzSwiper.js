import React, { PureComponent } from 'react';
import { Dimensions, Animated } from 'react-native';
import { string, func, shape, instanceOf } from 'prop-types';

import monkey from 'assets/pairing/json/monkey.json';
import whale from 'assets/pairing/json/whale.json';
import panda from 'assets/pairing/json/panda.json';

import { getTranslations } from 'utils/i18n';
import getOutputRange from 'utils/rangeGenerator';

import theme from 'styles/appStyles';
import { StyledContainerBasic } from 'styledComponents/containers';

import MonimalzSlide from './MonimalzSlide';
import SliderDots from './SliderDots';

import * as Styles from '../styles';

const { width } = Dimensions.get('window');
const monimalz = {
  monkey: {
    name: 'monkey',
    image: monkey,
    width: width / 1.5,
    height: width / 1.5 / 1.2,
  },
  whale: {
    name: 'whale',
    image: whale,
    width: width / 1.1,
    height: width / 1.1 / 1.6,
  },
  panda: {
    name: 'panda',
    image: panda,
    width: width / 1.5,
    height: width / 1.5 / 1.2,
  },
};

class MonimalzSwiper extends PureComponent {
  state = {
    index: 0,
    scrollX: new Animated.Value(0),
  };

  getAnimatedStyles() {
    const { scrollX } = this.state;
    const swiperLength = theme.swiperRange.length;

    return {
      opacity: scrollX.interpolate({
        inputRange: theme.swiperRange,
        outputRange: getOutputRange(1, 0.5, swiperLength),
      }),
      transform: [
        {
          scale: scrollX.interpolate({
            inputRange: theme.swiperRange,
            outputRange: getOutputRange(1, 0.9, swiperLength),
          }),
        },
      ],
    };
  }

  getDotStyles() {
    const { scrollX } = this.state;
    const swiperLength = theme.swiperRange.length;

    return {
      height: scrollX.interpolate({
        inputRange: theme.swiperRange,
        outputRange: getOutputRange(10, 5, swiperLength),
        extrapolate: 'clamp',
      }),
      transform: [
        {
          translateX: scrollX.interpolate({
            inputRange: [0, width, width * 2],
            outputRange: [15, 35, 55],
            extrapolate: 'clamp',
          }),
        },
        {
          scale: scrollX.interpolate({
            inputRange: theme.swiperRange,
            outputRange: getOutputRange(1, 0.8, swiperLength),
            extrapolate: 'clamp',
          }),
        },
      ],
    };
  }

  setIndex(index) {
    return this.setState(state => {
      return {
        ...state,
        index,
      };
    });
  }

  getMonimalzIndex({ contentOffset }) {
    const posX = contentOffset.x;

    if (posX < width + width / 10 && posX > width - width / 10) {
      return this.setIndex(1);
    } else if (posX < width * 2 + width / 10 && posX > width * 2 - width / 10) {
      return this.setIndex(2);
    }

    return this.setIndex(0);
  }

  renderName() {
    const { index } = this.state;

    switch (index) {
      case 1:
        return getTranslations('pairing.mona');
      case 2:
        return getTranslations('pairing.miko');
      default:
        return getTranslations('pairing.momo');
    }
  }

  renderNameDescr() {
    const { index } = this.state;

    switch (index) {
      case 1:
        return getTranslations('pairing.monaDescr');
      case 2:
        return getTranslations('pairing.mikoDescr');
      default:
        return getTranslations('pairing.momoDescr');
    }
  }

  render() {
    const { index, scrollX } = this.state;
    const { type, chooseType, animatedStyles } = this.props;

    return (
      <StyledContainerBasic>
        <Animated.ScrollView
          scrollEnabled={type === '' && true}
          horizontal
          pagingEnabled
          onMomentumScrollEnd={({ nativeEvent }) => {
            this.getMonimalzIndex(nativeEvent);
          }}
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event([
            {
              nativeEvent: { contentOffset: { x: scrollX } },
            },
          ])}
          scrollEventThrottle={16}
          style={[
            {
              height: 125,
              opacity: animatedStyles.monimalzOpacity,
              transform: [
                {
                  translateY: animatedStyles.monimalzBounce,
                },
                {
                  scale: animatedStyles.monimalzScale,
                },
              ],
            },
          ]}
        >
          {Object.keys(monimalz).map(current => {
            return (
              <MonimalzSlide
                key={`${current}`}
                name={monimalz[current].name}
                source={monimalz[current].image}
                imageWidth={monimalz[current].width}
                imageHeight={monimalz[current].height}
                action={chooseType}
                style={this.getAnimatedStyles()}
                type={type}
              />
            );
          })}
        </Animated.ScrollView>

        <Styles.SWraper style={{ opacity: animatedStyles.sliderOpacity }}>
          <SliderDots
            monimalz={monimalz}
            index={index}
            style={this.getDotStyles()}
            scrollX={scrollX}
          />
          <Styles.StextMonimalzNameSwiper>
            {this.renderName()}
          </Styles.StextMonimalzNameSwiper>
          <Styles.StextSwiper>{this.renderNameDescr()}</Styles.StextSwiper>
        </Styles.SWraper>
      </StyledContainerBasic>
    );
  }
}

MonimalzSwiper.propTypes = {
  chooseType: func.isRequired,
  type: string.isRequired,
  animatedStyles: shape({
    sliderOpacity: instanceOf(Animated.Value).isRequired,
    monimalzBounce: instanceOf(Animated.Value).isRequired,
    monimalzScale: instanceOf(Animated.Value).isRequired,
    monimalzOpacity: instanceOf(Animated.Value).isRequired,
  }).isRequired,
};

export default MonimalzSwiper;
