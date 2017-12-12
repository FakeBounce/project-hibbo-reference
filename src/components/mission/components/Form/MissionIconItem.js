import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { shape, string, bool } from 'prop-types';
import appStyles from 'styles/appStyles';
import IconSelect from 'assets/mission/IconSelect.png';
import IconSelectError from 'assets/mission/iconSelectError.png';
import { StyledModalIconPanelItemSelectIcon } from '../../styles';

const styles = StyleSheet.create({
  imageStyle: {
    maxWidth: 120,
    height: 48,
  },
});

const colorTheme = {};
appStyles.colorList.map((color, index) => {
  colorTheme[color] = appStyles.colorListSuffix[index];
  return true;
});

const MissionIconItem = ({ icon, theme, error }) => {
  let iconItem = error ? (
    <Image source={IconSelectError} />
  ) : (
    <Image source={IconSelect} />
  );

  let iconName = icon.icon;
  if (typeof colorTheme[theme] !== 'undefined') iconName += colorTheme[theme];
  const iconObject = { icon: iconName };

  if (icon.icon !== '') {
    iconItem = (
      <StyledModalIconPanelItemSelectIcon
        icon={iconObject}
        imageStyle={styles.imageStyle}
      />
    );
  }

  return iconItem;
};

MissionIconItem.propTypes = {
  icon: shape({
    icon: string.isRequired,
    buyable: shape({
      price: string,
      color: string,
      name: string,
    }),
  }).isRequired,
  error: bool.isRequired,
  theme: string.isRequired,
};

export default MissionIconItem;
