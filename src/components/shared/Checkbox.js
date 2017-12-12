import React, { PureComponent } from 'react';
import { Animated, Easing } from 'react-native';
import {
  string,
  bool,
  number,
  func,
  oneOfType,
  array,
  object,
} from 'prop-types';

import theme from 'styles/appStyles';

import {
  SCheckBoxContainer,
  SCheckBoxButtonUnChecked,
  SCheckBoxContent,
} from './styles';

class Checkbox extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      checked: props.checked,
      button: {
        width: new Animated.Value(props.size),
        height: new Animated.Value(props.size),
        color: new Animated.Value(props.checked ? 1 : 0),
      },
      content: {
        opacity: new Animated.Value(props.checked ? 1 : 0),
        scale: new Animated.Value(props.checked ? 1 : 0),
      },
    };
  }

  componentWillReceiveProps(nextProps) {
    const { button: { color }, content: { opacity, scale } } = this.state;

    if (this.props.checked !== nextProps.checked && !nextProps.checked) {
      this.setState(
        state => {
          return {
            ...state,
            checked: nextProps.checked,
          };
        },
        () => {
          opacity.setValue(0);
          scale.setValue(0);
          color.setValue(0);
        },
      );
    }
  }

  toggledChecked() {
    this.setState(
      state => {
        return {
          ...state,
          checked: !state.checked,
        };
      },
      () => {
        const {
          checked,
          button: { width, height, color },
          content: { opacity, scale },
        } = this.state;
        const { size, name } = this.props;

        this.props.pressedAction(name, checked);

        if (checked) {
          Animated.parallel([
            Animated.timing(width, {
              toValue: size + 10,
              duration: 150,
              easing: Easing.elastic(1.5),
            }),
            Animated.timing(height, {
              toValue: size - 15,
              duration: 150,
              easing: Easing.elastic(1.5),
            }),
            Animated.timing(color, {
              toValue: 1,
              duration: 150,
            }),
          ]).start(() => {
            Animated.parallel([
              Animated.parallel([
                Animated.timing(width, {
                  toValue: size,
                  duration: 150,
                  easing: Easing.elastic(1.5),
                }),
                Animated.timing(height, {
                  toValue: size,
                  duration: 150,
                  easing: Easing.elastic(1.5),
                }),
              ]),
              Animated.parallel([
                Animated.timing(opacity, {
                  toValue: 1,
                  duration: 150,
                }),
                Animated.timing(scale, {
                  toValue: 1,
                  duration: 150,
                  easing: Easing.elastic(1.5),
                }),
              ]),
            ]).start();
          });
        } else {
          opacity.setValue(0);
          scale.setValue(0);
          color.setValue(0);
        }
      },
    );
  }

  render() {
    const {
      checked,
      button: { width, height, color },
      content: { opacity, scale },
    } = this.state;
    const { bordered, radius, uncheckable, styling, size } = this.props;

    const checkboxColor = color.interpolate({
      inputRange: [0, 1],
      outputRange: [theme.colors.white, this.props.color],
    });

    return (
      <SCheckBoxContainer
        activeOpacity={1}
        style={styling}
        onPress={() => {
          if (!uncheckable || (uncheckable && !checked)) {
            return this.toggledChecked();
          }
          return null;
        }}
      >
        <SCheckBoxButtonUnChecked
          checked={checked}
          style={{
            width,
            height,
            backgroundColor: checkboxColor,
            borderWidth: !checked ? 1 : 0,
            borderColor: this.props.color,
            borderRadius: bordered ? radius : 0,
          }}
        >
          <SCheckBoxContent
            size={size}
            style={{
              opacity,
              transform: [{ scale }],
              borderRadius: bordered ? radius / 2 : 0,
            }}
          />
        </SCheckBoxButtonUnChecked>
      </SCheckBoxContainer>
    );
  }
}

Checkbox.defaultProps = {
  name: '',
  radius: 5,
  checked: false,
  bordered: true,
  color: theme.colors.green,
  pressedAction: () => {},
  uncheckable: false,
  styling: {},
  size: 25,
};

Checkbox.propTypes = {
  name: string,
  radius: number,
  checked: bool,
  bordered: bool,
  color: string,
  pressedAction: func,
  uncheckable: bool,
  styling: oneOfType([object, number, array]),
  size: number,
};

export default Checkbox;
