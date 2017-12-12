import React from 'react';
import { Animated } from 'react-native';
import renderer from 'react-test-renderer';

import Question from '../components/setupForm/Question';

describe('Question', () => {
  const fn = jest.fn();
  const title = {
    label1: '',
    label2: '',
    label3: '',
  };
  const controls = {
    rightLabel: '',
    leftLabel: '',
  };
  const animatedStyles = {
    titleOpacity: new Animated.Value(1),
    buttonOpacity: new Animated.Value(1),
  };
  const form = {
    name: '',
    picture: '',
  };
  const navigation = {
    navigate: fn,
  };
  const component = renderer.create(
    <Question
      step={1}
      setData={fn}
      validate={fn}
      error={false}
      title={title}
      controls={controls}
      animatedStyles={animatedStyles}
      form={form}
      navigation={navigation}
    />,
  ).toJSON();

  it('should render the component', () => {
    expect(component).toMatchSnapshot();
  });
});
