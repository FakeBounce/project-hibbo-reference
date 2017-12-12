import React from 'react';
import { View, Modal, TouchableWithoutFeedback } from 'react-native';
import {
  oneOf,
  bool,
  node,
  object,
  number,
  array,
  oneOfType,
  func,
} from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '$colors.blackModal',
  },
});

const ModalCustom = ({
  children,
  style,
  animationType,
  visible,
  switchModalVisible,
}) => (
  <Modal
    animationType={animationType}
    transparent
    visible={visible}
    onRequestClose={() => {}}
  >
    <TouchableWithoutFeedback onPress={switchModalVisible}>
      <View style={styles.wrapper}>
        <View style={style}>{children}</View>
      </View>
    </TouchableWithoutFeedback>
  </Modal>
);

ModalCustom.defaultProps = {
  animationType: 'fade',
  style: {},
};

ModalCustom.propTypes = {
  animationType: oneOf(['fade', 'none', 'slide']),
  visible: bool.isRequired,
  children: node.isRequired,
  style: oneOfType([object, number, array]),
  switchModalVisible: func.isRequired,
};

export default ModalCustom;
