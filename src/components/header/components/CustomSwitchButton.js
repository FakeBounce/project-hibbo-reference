import React, { PureComponent } from 'react';
import { func, oneOf, shape, object } from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';
import { TouchableWithoutFeedback, View, LayoutAnimation, UIManager, Platform } from 'react-native';
import { bind } from 'decko';

const styles = EStyleSheet.create({
  customSwitch: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 37,
    width: 47,
    position: 'absolute',
    right: 22.5,
    top: 20,
  },
  container: {
    height: 37,
    width: 37,
  },
  buttonContainer: {
    height: 3,
    width: 37,
    backgroundColor: '$colors.primary',
    marginTop: 17,
    borderRadius: 5,
  },
  button: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '$colors.primary',
    position: 'absolute',
    top: 12,
  },
  led: {
    height: 6,
    width: 6,
    borderRadius: 3,
    position: 'absolute',
    right: 3,
    top: 3,
  },
});

class CustomSwitchButton extends PureComponent {
  constructor(props) {
    super(props);
    this.status = this.props.status;
    this.state = {
      position: this.props.switchStyle[this.status].position,
      backgroundColor: this.props.switchStyle[this.status].backgroundColor,
    };
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  @bind
  onPressButton() {
    this.status = this.status === 'on' ? 'off' : 'on';
    LayoutAnimation.spring();
    this.setState({
      position: this.props.switchStyle[this.status].position,
      backgroundColor: this.props.switchStyle[this.status].backgroundColor,
    });
    this.props.action();
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.onPressButton}>
        <View style={styles.customSwitch}>
          <View style={styles.container}>
            <View style={styles.buttonContainer} />
            <View style={[styles.button, this.state.position]}>
              <View style={[styles.led, this.state.backgroundColor]} />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

CustomSwitchButton.defaultProps = {
  switchStyle: {
    off: {
      position: { left: 0 },
      backgroundColor: { backgroundColor: '#eb16db' },
    },
    on: {
      position: { right: 0 },
      backgroundColor: { backgroundColor: '#16ebc5' },
    },
  },
};

CustomSwitchButton.propTypes = {
  status: oneOf(['on', 'off']).isRequired,
  action: func.isRequired,
  switchStyle: shape({
    off: shape({
      position: object,
      backgroundColor: object,
    }),
    on: shape({
      position: object,
      backgroundColor: object,
    }),
  }),
};

export default CustomSwitchButton;
