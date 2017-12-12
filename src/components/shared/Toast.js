import React from 'react';
import { Image, Animated } from 'react-native';
import { string, func, number } from 'prop-types';
import appStyle from 'styles/appStyles';
import toast from 'assets/auth/icons/toast.png';
import {
  SToastGlobalContainer,
  SToastText,
  SToastContainer,
  SToastContent,
  SToastImageContainer,
  SToastTextContainer,
  SToastTriangle,
} from './styles';

const Toast = ({ label, position, color, hideToast, hideDelay }) => {
  if (hideToast !== null) {
    // Func to hide toast within some time
    Animated.delay(hideDelay).start(hideToast);
  }
  return (
    <SToastGlobalContainer>
      <SToastContainer color={color} position={position}>
        <SToastContent>
          <SToastImageContainer>
            <Image source={toast} />
          </SToastImageContainer>
          <SToastTextContainer>
            <SToastText>{label}</SToastText>
          </SToastTextContainer>
        </SToastContent>
      </SToastContainer>
      <SToastTriangle color={color} position={position} />
    </SToastGlobalContainer>
  );
};

Toast.defaultProps = {
  color: appStyle.colors.red,
  hideToast: null,
  hideDelay: 2000,
};

Toast.propTypes = {
  color: string,
  label: string.isRequired,
  position: string.isRequired,
  hideToast: func,
  hideDelay: number,
};

export default Toast;
