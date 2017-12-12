import React from 'react';
import { Animated } from 'react-native';
import { bool, string, func, shape, instanceOf } from 'prop-types';

import { getTranslations } from 'utils/i18n';

import * as Styles from './styles';

let secondInput = null;
let thirdInput = null;

const BirthDayInput = ({ setData, form, validate, error, animations }) => {
  return (
    <Styles.SContainerBirthday>
      <Styles.SInput
        name="birthdayDay"
        defaultValue={form.birthdayDay}
        placeholder={getTranslations('pairing.day')}
        setData={(name, text) => {
          if (Number(text) <= 31 || text === '') {
            setData(name, text);
            if (secondInput && text.length === 2) {
              secondInput._component.focus();
            }
          }
        }}
        validate={validate}
        error={error}
        keyboardType="number-pad"
        maxLength={2}
        animations={animations.day}
      />
      <Styles.SInput
        name="birthdayMonth"
        innerRef={element => {
          secondInput = element;
        }}
        autoFocus={false}
        defaultValue={form.birthdayMonth}
        placeholder={getTranslations('pairing.month')}
        setData={(name, text) => {
          if (Number(text) <= 12 || text === '') {
            setData(name, text);
            if (thirdInput && text.length === 2) {
              thirdInput._component.focus();
            }
          }
        }}
        validate={validate}
        error={error}
        keyboardType="number-pad"
        maxLength={2}
        animations={animations.month}
      />
      <Styles.SInputYear
        name="birthdayYear"
        innerRef={element => {
          thirdInput = element;
        }}
        autoFocus={false}
        defaultValue={form.birthdayYear}
        placeholder={getTranslations('pairing.year')}
        setData={(name, text) => {
          const currentYear = new Date().getFullYear();

          if (Number(text) <= currentYear || text === '') {
            setData(name, text);
          }
        }}
        validate={validate}
        error={error}
        keyboardType="number-pad"
        maxLength={4}
        animations={animations.year}
      />
    </Styles.SContainerBirthday>
  );
};

BirthDayInput.propTypes = {
  setData: func.isRequired,
  form: shape({
    birthdayDay: string.isRequired,
    birthdayMonth: string.isRequired,
    birthdayYear: string.isRequired,
  }).isRequired,
  validate: func.isRequired,
  error: bool.isRequired,
  animations: shape({
    day: shape({
      borderOpacity: instanceOf(Animated.Value).isRequired,
      borderTranslateY: instanceOf(Animated.Value).isRequired,
      inputOpacity: instanceOf(Animated.Value).isRequired,
      inputTranslateY: instanceOf(Animated.Value).isRequired,
    }).isRequired,
    month: shape({
      borderOpacity: instanceOf(Animated.Value).isRequired,
      borderTranslateY: instanceOf(Animated.Value).isRequired,
      inputOpacity: instanceOf(Animated.Value).isRequired,
      inputTranslateY: instanceOf(Animated.Value).isRequired,
    }).isRequired,
    year: shape({
      borderOpacity: instanceOf(Animated.Value).isRequired,
      borderTranslateY: instanceOf(Animated.Value).isRequired,
      inputOpacity: instanceOf(Animated.Value).isRequired,
      inputTranslateY: instanceOf(Animated.Value).isRequired,
    }).isRequired,
  }).isRequired,
};

export default BirthDayInput;
