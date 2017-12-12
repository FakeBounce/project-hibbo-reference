import React, { PureComponent } from 'react';
import { shape, string, func, bool, instanceOf } from 'prop-types';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { bind } from 'decko';

import { getTranslations } from 'utils/i18n';

import { AContainerBasic } from 'styledComponents/containers';
import ModalIconPanelItem from 'shared/components/ModalIconPanelItem';

import {
  StyledMessengerMainText,
  StyledMessengerMainPlaceHolder,
} from '../styles';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});

class MessengerMain extends PureComponent {
  constructor(props) {
    super(props);

    this.animatedScale = new Animated.Value(1);
    this.animatedHeight = new Animated.Value(0);

    this.listHeight = Dimensions.get('window').height;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.input === false) {
      if (nextProps.messages.text || nextProps.messages.image) {
        this.animatedScale = new Animated.Value(0);
        this.animatedHeight = new Animated.Value(this.listHeight);

        Animated.parallel([
          Animated.spring(this.animatedHeight, {
            toValue: 0,
            friction: 25,
            tension: 200,
          }),
          Animated.spring(this.animatedScale, {
            toValue: 1,
            friction: 25,
            tension: 200,
          }),
        ]).start();
      }
    }
  }

  @bind
  saveListHeight(event) {
    this.listHeight = event.nativeEvent.layout.height;
  }

  render() {
    const {
      animHide,
      messages,
      showTextBox,
      choosePicto,
      firstname,
    } = this.props;
    return (
      <AContainerBasic style={{ opacity: animHide }}>
        <ScrollView
          enableEmptySections
          contentContainerStyle={styles.wrapper}
          onLayout={this.saveListHeight}
          {...this.props}
        >
          <Animated.View
            style={{
              transform: [
                {
                  translateY: this.animatedHeight,
                },
                {
                  scale: this.animatedScale,
                },
              ],
            }}
          >
            <TouchableOpacity onPress={showTextBox}>
              {messages.text ? (
                <StyledMessengerMainText>
                  {messages.text}
                </StyledMessengerMainText>
              ) : (
                <StyledMessengerMainPlaceHolder>
                  {getTranslations('messenger.main.placeholder', { firstname })}
                </StyledMessengerMainPlaceHolder>
              )}
            </TouchableOpacity>
          </Animated.View>
          {messages.image && (
            <Animated.View
              style={{
                transform: [
                  {
                    translateY: this.animatedHeight,
                  },
                  {
                    scale: this.animatedScale,
                  },
                ],
              }}
            >
              <TouchableOpacity onPress={choosePicto}>
                <ModalIconPanelItem
                  icon={{ icon: `${messages.image}_blanc` }}
                />
              </TouchableOpacity>
            </Animated.View>
          )}
        </ScrollView>
      </AContainerBasic>
    );
  }
}

MessengerMain.defaultProps = {
  showTextBox: null,
  choosePicto: null,
};

MessengerMain.propTypes = {
  messages: shape({
    text: string,
    image: string,
  }).isRequired,
  showTextBox: func,
  choosePicto: func,
  input: bool.isRequired,
  animHide: instanceOf(Animated.Value).isRequired,
  firstname: string.isRequired,
};

export default MessengerMain;
