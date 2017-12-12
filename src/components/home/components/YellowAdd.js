import React from 'react';
import { func, shape, number } from 'prop-types';
import yellow from 'assets/home/yellowAdd.png';

import { SYellowAddImage, SAddTouchableOpacity } from '../styles';

const YellowAdd = ({ action, dimensions }) => {
  return (
    <SAddTouchableOpacity onPress={action} holeSize={dimensions.holeSize}>
      <SYellowAddImage source={yellow} />
    </SAddTouchableOpacity>
  );
};

YellowAdd.propTypes = {
  action: func.isRequired,
  dimensions: shape({
    holeSize: number.isRequired,
  }).isRequired,
};

export default YellowAdd;
