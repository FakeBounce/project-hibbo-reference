import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { string, oneOfType, array, object, number } from 'prop-types';
import { videoDimensions } from 'utils/operations';
import appStyles from 'styles/appStyles';
import { StyledModalIconPanelItemIcon } from '../../styles';

const imageDimensions = videoDimensions(Dimensions.get('window').width / 2);
const styles = StyleSheet.create({
  imageStyle: {
    width: imageDimensions.width,
    height: imageDimensions.height,
    alignSelf: 'center',
  },
});

const colorTheme = {};
appStyles.colorList.map((color, index) => {
  colorTheme[color] = appStyles.colorListSuffix[index];
  return true;
});

const MissionIcon = ({ style, imageStyle, icon, theme }) => {
  let iconName = icon;
  if (typeof colorTheme[theme] !== 'undefined') {
    iconName += colorTheme[theme];
  }
  const iconObject = { icon: iconName };
  return (
    <StyledModalIconPanelItemIcon
      style={style}
      icon={iconObject}
      imageStyle={[styles.imageStyle, imageStyle]}
    />
  );
};

MissionIcon.defaultProps = {
  style: {},
  imageStyle: {},
};

MissionIcon.propTypes = {
  style: oneOfType([object, number, array]),
  imageStyle: oneOfType([object, number, array]),
  icon: string.isRequired,
  theme: string.isRequired,
};

export default MissionIcon;
