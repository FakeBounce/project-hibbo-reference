import {
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import ConfirmButton from '../components/ConfirmButton';

describe('ConfirmButton', () => {
  const fn = jest.fn();
  const confirmButton = (
    <ConfirmButton
      label=""
      action={fn}
    />
  );
  const component = renderer.create(confirmButton).toJSON();
  const tree = shallow(confirmButton);

  it('should render the component', () => {
    expect(component).toMatchSnapshot();
  });

  it('should handle press events', () => {
    tree.find(TouchableOpacity).at(0).simulate('press');
    expect(fn).toHaveBeenCalled();
  });
});
