import React from 'react';
import { TouchableOpacity } from 'react-native';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import source from 'assets/auth/icons/mail.png';

import ProviderLinks from '../components/ProviderLinks';

describe('ProviderLinks', () => {
  const fn = jest.fn();

  it('should render the component', () => {
    const component = renderer
      .create(
        <ProviderLinks
          bordered
          onPress={fn}
          handlePosition={() => {}}
          elementPosition=""
          imageSource={source}
          imageStyle={0}
          label="Label"
          labelStyle={0}
        />,
      )
      .toJSON();

    expect(component).toMatchSnapshot();
  });

  it('should handle press events', () => {
    const tree = shallow(
      <ProviderLinks
        bordered
        onPress={fn}
        handlePosition={() => {}}
        elementPosition=""
        imageSource={source}
        imageStyle={0}
        label="Label"
        labelStyle={0}
      />,
    );

    tree.find(TouchableOpacity).at(0).simulate('press');
    expect(fn).toHaveBeenCalled();
  });

  it('should trigger onLayout fun', () => {
    shallow(
      <ProviderLinks
        bordered
        handlePosition={fn}
        onPress={() => {}}
        elementPosition="fbPosition"
        imageSource={source}
        imageStyle={0}
        label="Label"
        labelStyle={0}
      />,
    );

    expect(fn).toHaveBeenCalled();
  });
});
