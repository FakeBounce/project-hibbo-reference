import {
  TextInput,
} from 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import appStyles from 'styles/appStyles';

import { getTranslations } from 'utils/i18n';
import Input from '../components/Input';

describe('Input', () => {
  const fn1 = jest.fn();
  const fn2 = jest.fn();
  const input = (
    <Input
      value=""
      label=""
      name=""
      onChange={fn1}
      validate={fn2}
      error={false}
      width={300}
      maxLength={3}
    />
  );
  let component = renderer.create(input).toJSON();
  let tree = shallow(input);

  it('should render the component', () => {
    expect(component).toMatchSnapshot();
  });

  it('should handle text change', () => {
    tree.find(TextInput).first().simulate('ChangeText');
    expect(fn1).toHaveBeenCalled();
  });

  it('should handle submit editing', () => {
    tree.find(TextInput).first().simulate('SubmitEditing');
    expect(fn2).toHaveBeenCalled();
  });

  it('should have a value converted to string if props value is 0', () => {
    component = renderer.create(
      <Input
        value={0}
        label=""
        name=""
        onChange={fn1}
        validate={fn2}
        error={false}
        width={300}
        maxLength={3}
      />,
    ).toJSON();

    expect(component).toMatchSnapshot();
  });

  it('should have a red placeholder if error', () => {
    tree = shallow(
      <Input
        value=""
        label={getTranslations('cardScanner.label.cardHolder')}
        name=""
        onChange={fn1}
        validate={fn2}
        error
        width={300}
        maxLength={3}
      />,
    );

    expect(tree.find(TextInput).get(0).props.placeholderTextColor).toEqual(appStyles.colors.google);
    expect(tree.find(TextInput).get(0).props.style).toEqual([
      undefined,
      {
        color: appStyles.colors.google,
        width: 300,
      },
    ]);
  });

  it(`should have keyboardType of type default if label is ${getTranslations('cardScanner.label.cardHolder')}`, () => {
    tree = shallow(
      <Input
        value=""
        label={getTranslations('cardScanner.label.cardHolder')}
        name=""
        onChange={fn1}
        validate={fn2}
        error={false}
        width={300}
        maxLength={3}
      />,
    );

    expect(tree.find(TextInput).get(0).props.keyboardType).toEqual('default');
  });

  it(`should have keyboardType of type numeric if label is not ${getTranslations('cardScanner.label.cardHolder')}`, () => {
    tree = shallow(
      <Input
        value=""
        label="toto"
        name=""
        onChange={fn1}
        validate={fn2}
        error={false}
        width={300}
        maxLength={3}
      />,
    );

    expect(tree.find(TextInput).get(0).props.keyboardType).toEqual('numeric');
  });

  it(`should have returnKeyType of done if label is ${getTranslations('cardScanner.label.cvv')}`, () => {
    tree = shallow(
      <Input
        value=""
        label={getTranslations('cardScanner.label.cvv')}
        name=""
        onChange={fn1}
        validate={fn2}
        error={false}
        width={300}
        maxLength={3}
      />,
    );

    expect(tree.find(TextInput).get(0).props.returnKeyType).toEqual('done');
  });
});
