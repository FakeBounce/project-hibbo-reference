import React from 'react';
import { View, Dimensions } from 'react-native';
import { shape, string, arrayOf, bool, func } from 'prop-types';

import { contriesList } from 'utils/countries';

import FormInput from 'shared/FormInput';
import DropDownSelector from 'shared/DropdownSelector';

const margin = 40;
const inputWidth = Dimensions.get('window').width - 2 * margin;

const Form = ({
  innerRefs,
  homeAddress,
  birthday,
  ssn,
  labels,
  error,
  onChange,
  onSubmit,
}) => {
  const refs = innerRefs;

  return (
    <View>
      {Object.keys(homeAddress).map((field, index) => {
        if (index === 0) {
          return (
            <DropDownSelector
              key={`${field}${index}`}
              name={labels[index][1]}
              label={labels[index][0]}
              placeholder={labels[index][0]}
              value={homeAddress[labels[index][1]]}
              onChange={onChange}
              list={contriesList}
              error={error}
            />
          );
        } else if (index === 4 && homeAddress.country === 'US') {
          return (
            <FormInput
              key={`${field}${index}`}
              value={homeAddress[labels[index + 1][1]]}
              label={labels[index + 1][0]}
              name={labels[index + 1][1]}
              onChange={onChange}
              onSubmit={() => {
                if (homeAddress[field] !== '') {
                  refs[labels[index + 2][1]].focus();
                }
                onSubmit(labels[index][1]);
              }}
              placeholder={labels[index + 1][0]}
              keyboardType={index === 2 ? 'numeric' : 'default'}
              innerRef={element => {
                refs[labels[index][1]] = element;
              }}
              error={error}
              inputWidth={inputWidth}
            />
          );
        }

        return (
          <FormInput
            key={`${field}${index}`}
            value={homeAddress[labels[index][1]]}
            label={labels[index][0]}
            name={labels[index][1]}
            onChange={onChange}
            onSubmit={() => {
              if (homeAddress[field] !== '') {
                refs[labels[index + 1][1]].focus();
              }
              onSubmit(labels[index][1]);
            }}
            placeholder={labels[index][0]}
            keyboardType={index === 2 ? 'numeric' : 'default'}
            innerRef={element => {
              refs[labels[index][1]] = element;
            }}
            error={error}
            inputWidth={inputWidth}
          />
        );
      })}
      <FormInput
        value={birthday}
        label={labels[6][0]}
        name={labels[6][1]}
        onChange={onChange}
        onSubmit={onSubmit}
        placeholder={labels[6][0]}
        keyboardType="numeric"
        innerRef={element => {
          refs.birthday = element;
        }}
        error={error}
        maxLength={10}
        inputWidth={inputWidth}
      />
      {homeAddress.country.toUpperCase() === 'US' && (
        <FormInput
          value={ssn}
          label={labels[7][0]}
          name={labels[7][1]}
          onChange={onChange}
          onSubmit={onSubmit}
          placeholder={labels[7][0]}
          returnKeyType="done"
          keyboardType="numeric"
          innerRef={element => {
            refs.ssn = element;
          }}
          error={error}
          maxLength={4}
          inputWidth={inputWidth}
        />
      )}
    </View>
  );
};

Form.propTypes = {
  homeAddress: shape({
    country: string.isRequired,
    address: string.isRequired,
    postalCode: string.isRequired,
    city: string.isRequired,
    region: string.isRequired,
  }).isRequired,
  birthday: string.isRequired,
  ssn: string.isRequired,
  labels: arrayOf(arrayOf(string)).isRequired,
  error: bool.isRequired,
  onChange: func.isRequired,
  onSubmit: func.isRequired,
  innerRefs: shape({}).isRequired,
};

export default Form;
