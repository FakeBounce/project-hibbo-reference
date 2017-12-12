import React from 'react';
import { Dimensions, Animated } from 'react-native';
import { instanceOf, arrayOf, shape, oneOf, number, func } from 'prop-types';

import styled from 'styled-components/native';
import TouchableRipple from 'shared/TouchableRipple';

const StyledImageTips = styled.Image`
  margin: 10px;
`;

const StyledScrollViewTips = styled.ScrollView`
  flex: 1;
  width: ${Dimensions.get('window').width - 20};
`;

const Tips = ({ tipsHeight, tips, showTips }) => {
  return (
    <Animated.View style={{ height: tipsHeight, flex: 0 }}>
      <StyledScrollViewTips horizontal showsHorizontalScrollIndicator={false}>
        {tips.map((elem, index) => {
          if (elem.thumbnail) {
            return (
              <TouchableRipple
                onPress={() => {
                  console.log('SHOWING TIPS ', index);
                  showTips(index);
                }}
                key={index}
              >
                <StyledImageTips source={elem.thumbnail} />
              </TouchableRipple>
            );
          }
          return null;
        })}
      </StyledScrollViewTips>
    </Animated.View>
  );
};

Tips.propTypes = {
  tipsHeight: instanceOf(Animated.Value).isRequired,
  tips: arrayOf(
    shape({
      type: oneOf(['image', 'video']).isRequired,
      source: number.isRequired,
      thumbnail: number,
    }),
  ).isRequired,
  showTips: func.isRequired,
};

export default Tips;
