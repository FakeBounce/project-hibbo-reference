import React from 'react';

import { Image } from 'react-native';
import medal from 'assets/mission/medal.png';
import { StyledMedal } from '../../styles';

const MissionCompleted = () => {
  return (
    <StyledMedal>
      <Image source={medal} />
    </StyledMedal>
  );
};

export default MissionCompleted;
