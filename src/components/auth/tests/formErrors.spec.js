import React from 'react';
import renderer from 'react-test-renderer';

import FormErrors from '../components/FormErrors';

describe('FormErrors', () => {
  const position = {
    x: 0,
    y: 0,
  };

  it('should render the component', () => {
    const component = renderer
      .create(<FormErrors error={false} errorMsg="" errorApi="" inputPosition={position} />)
      .toJSON();

    expect(component).toMatchSnapshot();
  });

  it('should render the component with API error', () => {
    const component = renderer
      .create(<FormErrors error={false} errorMsg="" errorApi="Error" inputPosition={position} />)
      .toJSON();

    expect(component).toMatchSnapshot();
  });

  it('should render the component with an error', () => {
    const component = renderer
      .create(<FormErrors error errorMsg="Error" errorApi="" inputPosition={position} />)
      .toJSON();

    expect(component).toMatchSnapshot();
  });
});
