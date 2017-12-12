import { TouchableOpacity } from 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import Back from 'shared/Back';

describe('Back', () => {
  const fn = jest.fn();
  const component = renderer.create(<Back type="" action={fn} />).toJSON();
  const tree = shallow(<Back type="" action={fn} />);

  it('should render the component', () => {
    expect(component).toMatchSnapshot();
  });

  it('should render the component for a straight type', () => {
    const renderComponent = renderer.create(<Back type="straight" action={fn} />).toJSON();

    expect(renderComponent).toMatchSnapshot();
  });

  it('should handle press events', () => {
    tree.find(TouchableOpacity).at(0).simulate('press');
    expect(fn).toHaveBeenCalled();
  });
});
