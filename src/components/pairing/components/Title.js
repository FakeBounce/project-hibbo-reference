import React, { PureComponent } from 'react';
import { Animated } from 'react-native';
import { string, arrayOf, instanceOf, shape, func } from 'prop-types';

import mouki from 'assets/pairing/names/mouki.png';
import mona from 'assets/pairing/names/mona.png';
import miko from 'assets/pairing/names/miko.png';

import * as Styles from '../styles';

const monimalz = {
  whale: { icon: mona, height: 88 },
  panda: { icon: miko, height: 96 },
  monkey: { icon: mouki, height: 94 },
};

export default class Title extends PureComponent {
  constructor(props) {
    super(props);

    this.values = {};
    this.props.label.map((val, index) => {
      return Object.assign(this.values, {
        [index]: 0,
      });
    });

    this.state = {
      resetTyping: false,
      typing: this.values,
      showName: false,
    };

    this.animation = {
      opacity: new Animated.Value(0),
      scale: new Animated.Value(6),
    };
  }

  componentWillMount() {
    Animated.delay(250).start(() => {
      this.startTyping();
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.label[0] !== nextProps.label[0]) {
      this.resetTyping();
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.showName !== nextState.showName && nextState.showName) {
      // trigger name anim
      const { opacity, scale } = this.animation;

      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }

  startTyping() {
    this.setState(state => {
      return {
        ...state,
        resetTyping: false,
        typing: {
          ...state.typing,
          0: 1,
        },
      };
    });
  }

  handleTypingEnd(line) {
    const { label, type, showContent } = this.props;

    this.setState(
      state => {
        return {
          ...state,
          typing: {
            ...state.typing,
            [line]: 1,
          },
          showName: line === label.length && type !== '',
        };
      },
      () => {
        const filteredLabels = label.filter(v => v !== '');

        if (showContent && filteredLabels.length === line) {
          showContent();
        }
      },
    );
  }

  resetTyping() {
    this.setState(
      state => {
        return {
          ...state,
          resetTyping: true,
          typing: {},
        };
      },
      () => {
        Animated.delay(250).start(() => {
          this.startTyping();
        });
      },
    );
  }

  render() {
    const {
      label,
      color,
      type,
      animations: { opacity, translateY, scaleY },
    } = this.props;
    const { typing, resetTyping, showName } = this.state;

    return (
      <Styles.AnimatedWrapperTitle
        style={{ opacity, transform: [{ translateY }, { scaleY }] }}
      >
        {!resetTyping && (
          <Styles.StyledContainerTitle>
            {label.map((val, index) => {
              if (label.length === index + 1 && val === '') {
                return null;
              }
              return (
                <Styles.StyledTypeWritter
                  key={`${val}${index}`}
                  style={{ color }}
                  typing={typing[index]}
                  maxDelay={25}
                  onTypingEnd={() => {
                    this.handleTypingEnd(index + 1);
                  }}
                >
                  {label[index]}
                </Styles.StyledTypeWritter>
              );
            })}
          </Styles.StyledContainerTitle>
        )}
        {showName && (
          <Styles.SMonimalzName
            source={monimalz[type].icon}
            heightStyle={monimalz[type].height}
            style={{
              opacity: this.animation.opacity,
              transform: [{ scale: this.animation.scale }],
            }}
          />
        )}
      </Styles.AnimatedWrapperTitle>
    );
  }
}

Title.defaultProps = {
  type: '',
  showContent: null,
};

Title.propTypes = {
  label: arrayOf(string).isRequired,
  color: string.isRequired,
  type: string,
  animations: shape({
    opacity: instanceOf(Animated.Value).isRequired,
    translateY: instanceOf(Animated.Value).isRequired,
    scaleY: instanceOf(Animated.Value).isRequired,
  }).isRequired,
  showContent: func,
};
