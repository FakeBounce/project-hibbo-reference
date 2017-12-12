import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { shape, string, func, arrayOf, bool } from 'prop-types';

import FormInput from 'shared/FormInput';
import Input from 'shared/Input';
import DropdownSelector from 'shared/DropdownSelector';

import { StyledContainerRow } from 'styledComponents/containers';
import { countriesCurrencies } from 'utils/countries';

import { SForm } from '../styles';

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  date: {
    marginRight: 15,
  },
  year: {
    marginTop: -4,
  },
});

let cardRef = null;
let monthRef = null;
let yearRef = null;
let cryptoRef = null;

const Form = ({ form, label, onChange, error }) => {
  return (
    <SForm>
      <FormInput
        label={label[0]}
        placeholder={label[0]}
        name="name"
        onChange={onChange}
        onSubmit={() => {
          cardRef.focus();
        }}
        error={error.name}
        inputWidth={width - 80}
        value={form.name}
      />

      <DropdownSelector
        name="currency"
        label={label[5]}
        value={form.currency}
        placeholder={label[5]}
        list={countriesCurrencies}
        onChange={onChange}
        error={error.currency}
      />

      <FormInput
        innerRef={element => {
          cardRef = element;
        }}
        label={label[1]}
        placeholder={label[1]}
        name="cardNumber"
        onChange={(name, text) => {
          if (text.length > 15) {
            monthRef.focus();
          }
          return onChange(name, text);
        }}
        error={error.cardNumber}
        inputWidth={width - 80}
        value={form.cardNumber}
        maxLength={16}
        keyboardType="numeric"
      />

      <StyledContainerRow>
        <FormInput
          innerRef={element => {
            monthRef = element;
          }}
          label={label[2]}
          placeholder={label[2]}
          name="month"
          onChange={(name, text) => {
            if (text.length > 1) {
              yearRef.focus();
            }
            return onChange(name, text);
          }}
          error={error.month}
          inputWidth={50}
          style={styles.date}
          value={form.month}
          maxLength={2}
          keyboardType="numeric"
        />
        <Input
          innerRef={element => {
            yearRef = element;
          }}
          label={label[3]}
          placeholder={label[3]}
          name="year"
          onChange={(name, text) => {
            if (text.length > 1) {
              cryptoRef.focus();
            }
            return onChange(name, text);
          }}
          error={error.year}
          inputWidth={50}
          value={form.year}
          maxLength={4}
          keyboardType="numeric"
          style={styles.year}
        />
        <FormInput
          innerRef={element => {
            cryptoRef = element;
          }}
          label={label[4]}
          placeholder={label[4]}
          name="crypto"
          onChange={onChange}
          error={error.crypto}
          inputWidth={70}
          value={form.crypto}
          maxLength={3}
          keyboardType="numeric"
        />
      </StyledContainerRow>
    </SForm>
  );
};

Form.propTypes = {
  form: shape({
    name: string.isRequired,
    cardNumber: string.isRequired,
    cardType: string.isRequired,
    month: string.isRequired,
    year: string.isRequired,
  }).isRequired,
  onChange: func.isRequired,
  label: arrayOf(string).isRequired,
  error: shape({
    name: bool.isRequired,
    cardNumber: bool.isRequired,
    cardType: bool.isRequired,
    month: bool.isRequired,
    year: bool.isRequired,
  }).isRequired,
};

export default Form;
