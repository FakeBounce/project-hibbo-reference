import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import PadNumberItem from 'shared/PadNumberItem';
import erasePic from 'assets/padnumber/erase.png';

describe('PadNumberItem', () => {
  it('should render the component without image and with underscore', () => {
    const value = '1';
    const parseInput = jest.fn();

    const padNumberItem = renderer
      .create(<PadNumberItem parseInput={parseInput} value={value} />)
      .toJSON();

    expect(padNumberItem).toMatchSnapshot();
  });

  it('should render the component with image and with underscore', () => {
    const value = '1';
    const parseInput = jest.fn();

    const padNumberItem = renderer
      .create(
        <PadNumberItem
          parseInput={parseInput}
          value={value}
          image={erasePic}
        />,
      )
      .toJSON();

    expect(padNumberItem).toMatchSnapshot();
  });

  it('should render the component without image and without underscore', () => {
    const value = '0';
    const parseInput = jest.fn();

    const padNumberItem = renderer
      .create(
        <PadNumberItem
          parseInput={parseInput}
          value={value}
          removeUnderScore
        />,
      )
      .toJSON();

    expect(padNumberItem).toMatchSnapshot();
  });

  it('should render the component with image and without underscore', () => {
    const value = '0';
    const parseInput = jest.fn();

    const padNumberItem = renderer
      .create(
        <PadNumberItem
          parseInput={parseInput}
          value={value}
          image={erasePic}
          removeUnderScore
        />,
      )
      .toJSON();

    expect(padNumberItem).toMatchSnapshot();
  });

  it('should click the component', () => {
    const value = '0';
    const parseInput = jest.fn();

    const tree = shallow(
      <PadNumberItem
        parseInput={parseInput}
        value={value}
        image={erasePic}
        removeUnderScore
      />,
    );

    tree
      .find('TouchableRipple')
      .first()
      .simulate('press');
    expect(parseInput).toHaveBeenCalled();
  });
});
