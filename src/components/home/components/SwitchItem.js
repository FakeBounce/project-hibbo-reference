import React from 'react';
import { TouchableOpacity } from 'react-native';
import { number, func, string, shape } from 'prop-types';
import {
  SAbsoluteLoader,
  SSwitchAvatar,
  SSwitchWrapAvatar,
  SCenteredView,
} from '../styles';

const SwitchItem = ({
  avatar,
  onPress,
  loader,
  childProfileId,
  dimensions,
}) => {
  return (
    <SSwitchWrapAvatar width={dimensions.holeSize}>
      <TouchableOpacity
        onPress={() => {
          onPress(childProfileId);
        }}
      >
        {loader === childProfileId && (
          <SCenteredView width={dimensions.holeSize}>
            <SAbsoluteLoader />
          </SCenteredView>
        )}
        <SSwitchAvatar
          width={dimensions.holeSize}
          key={childProfileId}
          source={{ uri: avatar }}
        />
      </TouchableOpacity>
    </SSwitchWrapAvatar>
  );
};

SwitchItem.propTypes = {
  childProfileId: number.isRequired,
  avatar: string.isRequired,
  onPress: func.isRequired,
  loader: number.isRequired,
  dimensions: shape({
    holeSize: number.isRequired,
  }).isRequired,
};

export default SwitchItem;
