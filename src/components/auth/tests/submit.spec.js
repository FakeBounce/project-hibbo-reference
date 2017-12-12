import { TouchableOpacity } from 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import Submit from '../components/Submit';

describe('Submit', () => {
  it('should render the component', () => {
    const fn = jest.fn();
    const submit = renderer.create(<Submit validate={fn} title="" />).toJSON();

    expect(submit).toMatchSnapshot();
  });

  it('should handle press events', () => {
    const fn = jest.fn();
    const tree = shallow(<Submit validate={fn} title="" />);

    tree.find(TouchableOpacity).first().simulate('press');
    expect(fn).toHaveBeenCalled();
  });
});
