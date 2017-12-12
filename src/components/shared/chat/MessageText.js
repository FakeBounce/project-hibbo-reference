import React from 'react';
import {
  oneOf,
  objectOf,
  shape,
  oneOfType,
  string,
  object,
  number,
  func,
  any,
} from 'prop-types';
import { Linking, StyleSheet, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import ParsedText from 'react-native-parsed-text';
import Communications from 'react-native-communications';

const textStyle = {
  fontSize: 15,
  lineHeight: 20,
  marginHorizontal: 15,
  marginVertical: 15,
  fontFamily: '$fonts.circularBook',
};

const styles = {
  left: EStyleSheet.create({
    container: {},
    text: {
      color: '$colors.black',
      ...textStyle,
    },
    link: {
      color: '$colors.black',
      textDecorationLine: 'underline',
    },
  }),
  right: EStyleSheet.create({
    container: {},
    text: {
      color: '$colors.black',
      ...textStyle,
    },
    link: {
      color: '$colors.black',
      textDecorationLine: 'underline',
    },
  }),
};

export default class MessageText extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onUrlPress = this.onUrlPress.bind(this);
    this.onPhonePress = this.onPhonePress.bind(this);
    this.onEmailPress = this.onEmailPress.bind(this);
  }

  // eslint-disable-next-line
  onUrlPress(url) {
    Linking.openURL(url);
  }

  onPhonePress(phone) {
    const options = ['Text', 'Call', 'Cancel'];
    const cancelButtonIndex = options.length - 1;

    this.context.actionSheet().showActionSheetWithOptions({
      options,
      cancelButtonIndex,
    },
    buttonIndex => {
      switch (buttonIndex) { // eslint-disable-line
        case 0:
          Communications.phonecall(phone, true);
          break;
        case 1:
          Communications.text(phone);
          break;
      }
    });
  }

  // eslint-disable-next-line
  onEmailPress(email) {
    Communications.email(email, null, null, null, null);
  }

  render() {
    return (
      <View
        style={[
          styles[this.props.position].container,
          this.props.containerStyle[this.props.position],
        ]}
      >
        <ParsedText
          style={[
            styles[this.props.position].text,
            this.props.textStyle[this.props.position],
          ]}
          parse={[
            {
              type: 'url',
              style: StyleSheet.flatten([
                styles[this.props.position].link,
                this.props.linkStyle[this.props.position],
              ]),
              onPress: this.onUrlPress,
            },
            // { type: 'phone', style: StyleSheet.flatten([styles[this.props.position].link, this.props.linkStyle[this.props.position]]), onPress: this.onPhonePress },
            {
              type: 'email',
              style: StyleSheet.flatten([
                styles[this.props.position].link,
                this.props.linkStyle[this.props.position],
              ]),
              onPress: this.onEmailPress,
            },
          ]}
        >
          {this.props.currentMessage.text}
        </ParsedText>
      </View>
    );
  }
}

MessageText.contextTypes = {
  actionSheet: func,
};

MessageText.defaultProps = {
  position: 'left',
  currentMessage: {
    text: '',
  },
  containerStyle: {},
  textStyle: {},
  linkStyle: {},
};

MessageText.propTypes = {
  position: oneOf(['left', 'right']),
  currentMessage: objectOf(any),
  containerStyle: shape({
    left: oneOfType([string, object, number]),
    right: oneOfType([string, object, number]),
  }),
  textStyle: shape({
    left: oneOfType([string, object, number]),
    right: oneOfType([string, object, number]),
  }),
  linkStyle: shape({
    left: oneOfType([string, object, number]),
    right: oneOfType([string, object, number]),
  }),
};
