import React, { PureComponent } from 'react';
import { bind } from 'decko';
import { Animated } from 'react-native';
import {
  string,
  func,
  bool,
  number,
  oneOfType,
  shape,
  instanceOf,
} from 'prop-types';
import appStyles from 'styles/appStyles';
import { SAnimatedWhiteBorderedinput, STextInput } from '../../styles';

class MissionInput extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isFocused: false,
      placeholderText: this.props.label,
      opacity: new Animated.Value(0.3),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value.length !== this.props.value.length) {
      if (nextProps.value.length === 0) this.resetLabel(nextProps);
      else
        this.setState(state => ({
          ...state,
          opacity: new Animated.Value(1),
        }));
    }
  }

  @bind
  onToggle() {
    this.setState(
      state => ({
        ...state,
        isFocused: !state.isFocused,
      }),
      () => {
        Animated.timing(this.state.opacity, {
          toValue:
            this.props.value.toString().length > 0 // eslint-disable-line
              ? 1
              : this.state.isFocused ? 0 : 0.3,
        }).start(() => {
          this.resetLabel(this.props);
        });
      },
    );
  }

  @bind
  resetLabel(props) {
    this.setState(
      state => ({
        ...state,
        placeholderText: state.isFocused ? '' : props.label,
      }),
      () => {
        Animated.timing(this.state.opacity, {
          toValue: 1,
        }).start();
      },
    );
  }

  render() {
    const {
      width,
      animation,
      error,
      value,
      onChange,
      maxLength,
      focus,
      keyboard,
      innerRef,
      name,
      onSubmitEditing,
    } = this.props;
    const { isFocused, placeholderText, opacity } = this.state;
    let val = value;
    if (keyboard !== 'numeric') val = value !== 0 ? value.toString() : '';
    return (
      <SAnimatedWhiteBorderedinput
        focused={isFocused}
        sWidth={width}
        style={{ opacity: animation.opacityBorder }}
        error={error}
      >
        <Animated.View
          style={[
            {
              opacity: animation.opacity,
              transform: [
                { translateY: animation.translateY },
                { scaleY: animation.scaleY },
              ],
            },
            { opacity },
          ]}
        >
          <STextInput
            keyboardType={keyboard}
            returnKeyType="next"
            value={val}
            autoCapitalize="sentences"
            maxLength={maxLength}
            autoCorrect={false}
            autoFocus={focus}
            onChangeText={text => {
              if (!isFocused) {
                this.onToggle();
              }
              onChange(name, text);
            }}
            onFocus={this.onToggle}
            onBlur={this.onToggle}
            placeholder={placeholderText}
            placeholderTextColor={
              error ? appStyles.colors.error : appStyles.colors.placeholderGrey
            }
            sWidth={width}
            color={error ? appStyles.colors.error : appStyles.colors.white}
            underlineColorAndroid="transparent"
            innerRef={innerRef}
            onSubmitEditing={onSubmitEditing}
          />
        </Animated.View>
      </SAnimatedWhiteBorderedinput>
    );
  }
}

MissionInput.defaultProps = {
  keyboard: 'default',
  focus: false,
  maxLength: 50,
  innerRef: null,
  onSubmitEditing: null,
};

MissionInput.propTypes = {
  innerRef: func,
  name: string.isRequired,
  label: string.isRequired,
  onChange: func.isRequired,
  value: oneOfType([string, number]).isRequired,
  error: bool.isRequired,
  width: number.isRequired,
  maxLength: number,
  keyboard: string,
  focus: bool,
  onSubmitEditing: func,
  animation: shape({
    translateY: instanceOf(Animated.Value).isRequired,
    opacity: instanceOf(Animated.Value).isRequired,
    opacityBorder: instanceOf(Animated.Value).isRequired,
    scaleY: instanceOf(Animated.Value).isRequired,
  }).isRequired,
};

export default MissionInput;
