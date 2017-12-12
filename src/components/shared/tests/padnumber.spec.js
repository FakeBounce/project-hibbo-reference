import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import PadNumber from 'shared/PadNumber';

describe('PadNumber', () => {
  it('should render the component', () => {
    const pressInput = jest.fn();

    const padNumber = renderer
      .create(<PadNumber pressInput={pressInput} />)
      .toJSON();

    expect(padNumber).toMatchSnapshot();
  });

  it('should click the component', () => {
    const pressInput = jest.fn();

    const tree = shallow(<PadNumber pressInput={pressInput} />);
    const res = '123456';

    for (let i = 0; i < tree.find('PadNumberItem').length; ++i) {
      tree
        .find('PadNumberItem')
        .at(i)
        .shallow()
        .find('TouchableRipple')
        .first()
        .shallow()
        .simulate('press');
      expect(pressInput).toHaveBeenCalled();
      if (i < 9) {
        expect(pressInput).toHaveBeenLastCalledWith(res.substr(0, i + 1));
      } else if (i === 10) {
        expect(pressInput).toHaveBeenLastCalledWith(`${res},0`);
      } else {
        expect(pressInput).toHaveBeenLastCalledWith(`${res},`);
      }
    }

    expect(pressInput).toHaveBeenCalledTimes(9);
  });
});
