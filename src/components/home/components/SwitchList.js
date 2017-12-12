import React from 'react';
import { ScrollView } from 'react-native';
import { number, arrayOf, shape, func, string } from 'prop-types';
import YellowAdd from './YellowAdd';
import SwitchItem from './SwitchItem';

const SwitchList = ({
  kids,
  onPress,
  loader,
  addAction,
  scroll,
  dimensions,
}) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} contentOffset={scroll}>
      {kids.map(kid => {
        return (
          <SwitchItem
            key={kid.childProfileId}
            childProfileId={kid.childProfileId}
            avatar={kid.avatar}
            onPress={onPress}
            loader={loader}
            dimensions={dimensions}
          />
        );
      })}
      <YellowAdd action={addAction} dimensions={dimensions} />
    </ScrollView>
  );
};

SwitchList.propTypes = {
  kids: arrayOf(
    shape({
      avatar: string.isRequired,
      childProfileId: number.isRequired,
    }),
  ).isRequired,
  onPress: func.isRequired,
  loader: number.isRequired,
  addAction: func.isRequired,
  scroll: shape({
    x: number.isRequired,
    y: number.isRequired,
  }).isRequired,
  dimensions: shape({
    holeSize: number.isRequired,
  }).isRequired,
};

export default SwitchList;
