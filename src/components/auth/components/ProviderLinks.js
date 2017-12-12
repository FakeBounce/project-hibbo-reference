import React from 'react';
import { Image, Text } from 'react-native';
import {
  bool,
  func,
  string,
  number,
  oneOfType,
  object,
  array,
} from 'prop-types';

import hourglass from 'assets/shared/json/hourglass.json';

import { SRow, SButtonProvider, SProviderAnim } from '../styles';

const ProviderLinks = ({
  name,
  bordered,
  onPress,
  handlePosition,
  elementPosition,
  imageSource,
  imageStyle,
  label,
  labelStyle,
  isButtonDisabled,
  authProvider,
}) => {
  return (
    <SButtonProvider
      bordered={bordered}
      activeOpacity={1}
      onLayout={({ nativeEvent: { layout: { x, y } } }) => {
        handlePosition(elementPosition, { x, y });
      }}
      onPress={() => {
        onPress();
      }}
      disabled={isButtonDisabled}
    >
      {name === authProvider ? (
        <SRow>
          <SProviderAnim
            innerRef={anim => {
              if (anim) {
                anim.play();
              }
            }}
            source={hourglass}
            loop
          />
        </SRow>
      ) : (
        <SRow>
          <Image style={imageStyle} source={imageSource} />
          <Text style={labelStyle}>{label}</Text>
        </SRow>
      )}
    </SButtonProvider>
  );
};

ProviderLinks.defaultProps = {
  bordered: false,
  elementPosition: '',
  handlePosition: () => {},
};

ProviderLinks.propTypes = {
  name: string.isRequired,
  bordered: bool,
  onPress: func.isRequired,
  handlePosition: func,
  imageSource: oneOfType([object, number, array]).isRequired,
  label: string.isRequired,
  elementPosition: string,
  labelStyle: oneOfType([object, number, array]).isRequired,
  imageStyle: oneOfType([object, number, array]).isRequired,
  isButtonDisabled: bool.isRequired,
  authProvider: string.isRequired,
};

export default ProviderLinks;
