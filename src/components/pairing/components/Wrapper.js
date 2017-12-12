import React from 'react';
import { StyleSheet } from 'react-native';
import { string, bool, func, shape, number } from 'prop-types';

import { StyledContainerBasic } from 'styledComponents/containers';
import Back from 'shared/Back';

import Background from './Background';
import Decorations from './Decorations';
import DecorationsFront from './DecorationsFront';
import MonimalzSelection from './MonimalzSelection';
import FormView from './setupForm/FormView';

const SContainer = StyledContainerBasic.extend`
  background-color: ${props => props.theme.colors.white};
`;
const styles = StyleSheet.create({
  straight: {
    width: 30,
    maxHeight: 20,
    marginVertical: 23,
    marginLeft: 10,
    position: 'absolute',
    zIndex: 6,
  },
});
const Wrapper = ({
  type,
  reset,
  moveStep,
  currentKid,
  navigation,
  step,
  chooseType,
  ...props
}) => {
  return (
    <SContainer>
      <Back
        style={styles.straight}
        color={currentKid.childProfileId && step === 0 ? 'yellow' : 'white'}
        type="straight"
        action={() => {
          if (currentKid.childProfileId && step === 0) {
            navigation.goBack();
          } else if (step === 1) {
            chooseType();
          } else {
            moveStep('backward');
          }
        }}
      />
      <Background type={type} reset={reset} animated />
      <Decorations type={type} reset={reset} animated />
      <DecorationsFront type={type} reset={reset} animated />

      <MonimalzSelection
        {...props}
        chooseType={chooseType}
        step={step}
        type={type}
      />

      <FormView type={type} moveStep={moveStep} step={step} {...props} />
    </SContainer>
  );
};

Wrapper.propTypes = {
  type: string.isRequired,
  moveStep: func.isRequired,
  reset: bool.isRequired,
  currentKid: shape({
    childProfileId: number,
  }).isRequired,
  navigation: shape({
    goBack: func.isRequired,
  }).isRequired,
  step: number.isRequired,
  chooseType: func.isRequired,
};

export default Wrapper;
