import { TouchableOpacity } from 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import Link from 'shared/Link';

describe('Link', () => {
  it('should render the component', () => {
    const fn = jest.fn();
    const component = renderer
      .create(<Link label="" action={fn} linkStyle={[0]} buttonStyle={0} />)
      .toJSON();

    expect(component).toMatchSnapshot();
  });

  it('should handle press events', () => {
    const fn = jest.fn();
    const tree = shallow(
      <Link label="" action={fn} linkStyle={[0]} buttonStyle={0} />
    );

    tree
      .find(TouchableOpacity)
      .at(0)
      .simulate('press');
    expect(fn).toHaveBeenCalled();
  });
});
