import { TextInput } from 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import { getTranslations } from 'utils/i18n';
import Input from '../components/Input';

describe('Input', () => {
  const form = {
    email: '',
    firstName: '',
    lastName: '',
    pwd: '',
  };

  it('should render the component', () => {
    const fn = jest.fn();
    const component = renderer
      .create(
        <Input form={form} title="" label="" name="" onChange={fn} validate={fn} error={false} />,
      )
      .toJSON();

    expect(component).toMatchSnapshot();
  });

  it('should handle text change', () => {
    const fn = jest.fn();
    const fn2 = jest.fn();
    const tree = shallow(
      <Input form={form} title="" label="" name="" onChange={fn} validate={fn2} error={false} />,
    );

    tree.find(TextInput).first().simulate('ChangeText');
    expect(fn).toHaveBeenCalled();
  });

  it('should handle submit editing', () => {
    const fn = jest.fn();
    const fn2 = jest.fn();
    const tree = shallow(
      <Input form={form} title="" label="" name="" onChange={fn2} validate={fn} error={false} />,
    );

    tree.find(TextInput).first().simulate('SubmitEditing');
    expect(fn).toHaveBeenCalled();
  });

  it('should have a red placeholder if error', () => {
    const fn = jest.fn();
    const tree = shallow(
      <Input form={form} title="" label="" name="" onChange={fn} validate={fn} error />,
    );

    expect(tree.find(TextInput).get(0).props.placeholderTextColor).toEqual('#D5492F');
    expect(tree.find(TextInput).get(0).props.style).toEqual([undefined, { color: '#D5492F' }]);
  });

  it('should have autoCapitalize if label is "Prénom"', () => {
    const fn = jest.fn();
    const tree = shallow(
      <Input
        form={form}
        title=""
        label={getTranslations('auth.label.firstname')}
        name=""
        onChange={fn}
        validate={fn}
        error={false}
      />,
    );

    expect(tree.find(TextInput).get(0).props.autoCapitalize).toEqual('sentences');
  });

  it('should have autoCapitalize if label is "Nom"', () => {
    const fn = jest.fn();
    const tree = shallow(
      <Input
        form={form}
        title=""
        label={getTranslations('auth.label.lastname')}
        name=""
        onChange={fn}
        validate={fn}
        error={false}
      />,
    );

    expect(tree.find(TextInput).get(0).props.autoCapitalize).toEqual('sentences');
  });

  it('should have keyboardType of email if label is "Mail"', () => {
    const fn = jest.fn();
    const tree = shallow(
      <Input
        form={form}
        title=""
        label={getTranslations('auth.label.mail')}
        name=""
        onChange={fn}
        validate={fn}
        error={false}
      />,
    );

    expect(tree.find(TextInput).get(0).props.keyboardType).toEqual('email-address');
  });

  it('should have keyboardType of default if label is not "Mail"', () => {
    const fn = jest.fn();
    const tree = shallow(
      <Input form={form} title="" label="" name="" onChange={fn} validate={fn} error={false} />,
    );

    expect(tree.find(TextInput).get(0).props.keyboardType).toEqual('default');
  });

  it('should have returnKeyType of done if label is "Mot de passe"', () => {
    const fn = jest.fn();
    const tree = shallow(
      <Input
        form={form}
        title=""
        label={getTranslations('auth.label.password')}
        name=""
        onChange={fn}
        validate={fn}
        error={false}
      />,
    );

    expect(tree.find(TextInput).get(0).props.returnKeyType).toEqual('done');
  });

  it('should have returnKeyType of next if label is not "Mot de passe"', () => {
    const fn = jest.fn();
    const tree = shallow(
      <Input form={form} title="" label="" name="" onChange={fn} validate={fn} error={false} />,
    );

    expect(tree.find(TextInput).get(0).props.returnKeyType).toEqual('next');
  });

  it('should have secureTextEntry if label is "Mot de passe"', () => {
    const fn = jest.fn();
    const tree = shallow(
      <Input
        form={form}
        title=""
        label={getTranslations('auth.label.password')}
        name=""
        onChange={fn}
        validate={fn}
        error={false}
      />,
    );

    expect(tree.find(TextInput).get(0).props.secureTextEntry).toEqual(true);
  });

  it('should not have secureTextEntry if label is not "Mot de passe"', () => {
    const fn = jest.fn();
    const tree = shallow(
      <Input form={form} title="" label="" name="" onChange={fn} validate={fn} error={false} />,
    );

    expect(tree.find(TextInput).get(0).props.secureTextEntry).toEqual(false);
  });
});
