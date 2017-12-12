import { Animated, TouchableOpacity } from 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import EStyleSheet from 'react-native-extended-stylesheet';

import appStyles from 'styles/appStyles';

import Visual from '../components/Visual';

EStyleSheet.build(appStyles);

describe('Visual', () => {
  const fn = jest.fn();
  const styling = {
    opacity: new Animated.Value(100),
  };
  const modalStyle = {
    opacity: new Animated.Value(100),
  };
  const imageStyle = {
    transform: [
      {
        translateY: new Animated.Value(100),
      },
    ],
  };

  it('should render the component', () => {
    const visual = renderer
      .create(
        <Visual
          step={0}
          styling={styling}
          modalStyle={modalStyle}
          imageStyle={imageStyle}
          selectAuthType={fn}
          animatedToPreviousStep={fn}
        />,
      )
      .toJSON();

    expect(visual).toMatchSnapshot();
  });

  it('should render the component on step 1', () => {
    const visual = renderer
      .create(
        <Visual
          step={1}
          styling={styling}
          modalStyle={modalStyle}
          imageStyle={imageStyle}
          selectAuthType={fn}
          animatedToPreviousStep={fn}
        />,
      )
      .toJSON();

    expect(visual).toMatchSnapshot();
  });

  it('should handle press events on step 1', () => {
    const tree = shallow(
      <Visual
        step={1}
        styling={styling}
        modalStyle={modalStyle}
        imageStyle={imageStyle}
        selectAuthType={fn}
        animatedToPreviousStep={fn}
      />,
    );

    tree.find(TouchableOpacity).at(0).simulate('press');
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
