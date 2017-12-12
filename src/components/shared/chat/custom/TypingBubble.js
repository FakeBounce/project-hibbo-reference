import React from 'react';
import Animation from 'lottie-react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import loading from 'assets/transfert/animation/chargementMessagerie.json';

const styles = EStyleSheet.create({
  image: {
    width: 43,
    height: 23,
  },
});

const TypingBubble = () => (
  <Animation
    source={loading}
    speed={1}
    style={styles.image}
    ref={animation => {
      if (animation) {
        animation.play();
      }
    }}
  />
);

export default TypingBubble;
