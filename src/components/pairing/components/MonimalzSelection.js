import React from 'react';
import { Animated } from 'react-native';
import { string, number, func, shape, instanceOf } from 'prop-types';

import { getTranslations } from 'utils/i18n';

import appStyles from 'styles/appStyles';

import Title from './Title';
import MonimalzSwiper from './MonimalzSwiper';

import * as Styles from '../styles';

const MonimalzSelection = ({
  type,
  chooseType,
  animatedStyles,
  step,
  titleAnimations,
}) => {
  return (
    <Styles.StyledWrapperMZSelection>
      <Styles.StyledWrapperTopMZSelection>
        {type === '' && (
          <Title
            label={[
              getTranslations(`pairing.selection.${type}1`),
              getTranslations(`pairing.selection.${type}2`),
              getTranslations(`pairing.selection.${type}3`),
            ]}
            color={appStyles.colors.primary}
            animations={titleAnimations}
          />
        )}
        {type !== '' &&
          step === 0 && (
            <Styles.STitleName>
              <Title
                label={[
                  getTranslations(`pairing.selection.thank1`),
                  getTranslations(`pairing.selection.thank2`),
                  getTranslations(`pairing.selection.thank3`),
                ]}
                color={appStyles.colors.white}
                type={type}
                animations={titleAnimations}
              />
            </Styles.STitleName>
          )}
      </Styles.StyledWrapperTopMZSelection>
      <Styles.StyledWrapperBottomMZSelection>
        <MonimalzSwiper
          type={type}
          chooseType={chooseType}
          animatedStyles={animatedStyles}
        />
      </Styles.StyledWrapperBottomMZSelection>
    </Styles.StyledWrapperMZSelection>
  );
};

MonimalzSelection.propTypes = {
  chooseType: func.isRequired,
  type: string.isRequired,
  animatedStyles: shape({
    monimalzBounce: instanceOf(Animated.Value).isRequired,
    monimalzScale: instanceOf(Animated.Value).isRequired,
  }).isRequired,
  titleAnimations: shape({
    opacity: instanceOf(Animated.Value).isRequired,
    translateY: instanceOf(Animated.Value).isRequired,
    scaleY: instanceOf(Animated.Value).isRequired,
  }).isRequired,
  step: number.isRequired,
};

export default MonimalzSelection;
