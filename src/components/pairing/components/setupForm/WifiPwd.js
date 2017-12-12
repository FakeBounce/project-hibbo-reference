import React from 'react';
import { Animated } from 'react-native';
import { shape, string, func, bool, instanceOf } from 'prop-types';

import appStyles from 'styles/appStyles';

import { getTranslations } from 'utils/i18n';

import { StyledContainerBasic } from 'styledComponents/containers';

import Title from '../Title';
import Input from './Input';

import * as Styles from './styles';

const WifiPwd = ({
  form,
  setData,
  validate,
  error,
  controls,
  title,
  titleAnimations,
  inputAnimations,
  controlsAnimations,
  autoFocus,
  showContent,
}) => {
  return (
    <StyledContainerBasic>
      <Title
        label={[title.label1, title.label2, title.label3, title.label4]}
        color={appStyles.colors.white}
        animations={titleAnimations}
        showContent={showContent}
      />

      <Styles.AnimatedWrapperPwd>
        {/* <Styles.SCenteredPwd>
          <Styles.STextPwd>{form.wifiName}</Styles.STextPwd>
        </Styles.SCenteredPwd> */}
        <Input
          name="wifiPwd"
          defaultValue={form.wifiPwd}
          placeholder={getTranslations('pairing.pwd')}
          setData={setData}
          validate={validate}
          error={error}
          secureEntry
          animations={inputAnimations}
          autoFocus={autoFocus}
        />
      </Styles.AnimatedWrapperPwd>

      <Styles.SControls
        rightLabel={controls.rightLabel}
        rightAction={() => {
          validate('wifiPwd');
        }}
        animations={controlsAnimations}
      />
    </StyledContainerBasic>
  );
};

WifiPwd.defaultProps = {
  showContent: null,
};

WifiPwd.propTypes = {
  title: shape({
    label1: string,
    label2: string,
    label3: string,
    label4: string,
  }).isRequired,
  form: shape({
    wifiName: string.isRequired,
    wifiPwd: string.isRequired,
  }).isRequired,
  setData: func.isRequired,
  validate: func.isRequired,
  error: bool.isRequired,
  controls: shape({
    rightLabel: string,
  }).isRequired,
  titleAnimations: shape({
    opacity: instanceOf(Animated.Value).isRequired,
    translateY: instanceOf(Animated.Value).isRequired,
    scaleY: instanceOf(Animated.Value).isRequired,
  }).isRequired,
  inputAnimations: shape({
    borderOpacity: instanceOf(Animated.Value).isRequired,
    borderTranslateY: instanceOf(Animated.Value).isRequired,
    inputOpacity: instanceOf(Animated.Value).isRequired,
    inputTranslateY: instanceOf(Animated.Value).isRequired,
  }).isRequired,
  controlsAnimations: shape({
    left: shape({
      opacity: instanceOf(Animated.Value).isRequired,
      translateY: instanceOf(Animated.Value).isRequired,
      scale: instanceOf(Animated.Value).isRequired,
    }).isRequired,
    right: shape({
      opacity: instanceOf(Animated.Value).isRequired,
      translateY: instanceOf(Animated.Value).isRequired,
      scale: instanceOf(Animated.Value).isRequired,
    }).isRequired,
  }).isRequired,
  autoFocus: bool.isRequired,
  showContent: func,
};

export default WifiPwd;
