import React from 'react';
import { func, bool, node, object, number, array, oneOfType } from 'prop-types';
import { View, StyleSheet } from 'react-native';

import TouchableRipple from 'shared/TouchableRipple';

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    flex: 1,
  },
  hide: {
    opacity: 0.2,
  },
});
const SecurityCodeContent = ({
  onPress,
  isClickable,
  children,
  contentStyle,
}) => {
  if (!isClickable) {
    return (
      <TouchableRipple
        onPress={onPress}
        styleTouchable={[styles.content, contentStyle, styles.hide]}
      >
        {children}
      </TouchableRipple>
    );
  }
  return <View style={[styles.content, contentStyle]}>{children}</View>;
};

SecurityCodeContent.propTypes = {
  onPress: func.isRequired,
  isClickable: bool.isRequired,
  children: node.isRequired,
  contentStyle: oneOfType([object, number, array]).isRequired,
};

export default SecurityCodeContent;
