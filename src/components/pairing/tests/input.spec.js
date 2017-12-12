import {
  TextInput,
} from 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import appStyles from 'styles/appStyles';

import Input from '../components/setupForm/Input';

describe('Input', () => {
  const fn1 = jest.fn();
  const fn2 = jest.fn();
  const input = (
    <Input
      value=""
      label=""
      name=""
      defaultValue=""
      placeholder=""
      validate={fn2}
      setData={fn1}
      error={false}
    />
  );
  const component = renderer.create(input).toJSON();
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

  it('should have a red placeholder if error', () => {
    tree = shallow(
      <Input
        value=""
        label=""
        name=""
        defaultValue=""
        placeholder=""
        validate={fn2}
        setData={fn1}
        error
      />,
    );

    expect(tree.find(TextInput).get(0).props.placeholderTextColor).toEqual(appStyles.colors.google);
    expect(tree.find(TextInput).get(0).props.style).toEqual([
      undefined,
      {},
      {
        color: appStyles.colors.google,
      },
    ]);
  });
});
