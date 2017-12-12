import { TouchableOpacity } from 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import Back from '../components/Back';

describe('Back', () => {
  it('should render the component', () => {
    const fn = jest.fn();
    const component = renderer.create(<Back goBack={fn} title="" />).toJSON();

    expect(component).toMatchSnapshot();
  });

  it('should handle press events', () => {
    const fn = jest.fn();
    const tree = shallow(<Back goBack={fn} title="" />);

    tree.find(TouchableOpacity).at(0).simulate('press');
    expect(fn).toHaveBeenCalled();
  });
});
