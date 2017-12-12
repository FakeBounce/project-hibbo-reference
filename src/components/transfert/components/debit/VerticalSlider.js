import React, { PureComponent } from 'react';
import { PanResponder, Animated, Easing, Dimensions } from 'react-native';
import { func, number } from 'prop-types';
import sliderSub from 'assets/transfert/slider_sub_line.png';
import zipper from 'assets/transfert/animation/zipper.json';
import {
  SSliderMainContainer,
  SSliderBackground,
  SSlider,
  SSliderAnimated,
  ASlideProgress,
  SSliderAnimation,
} from '../../styles';

const top = 0;

class VerticalSlider extends PureComponent {
  constructor(props) {
    super(props);

    this.endSlide = false;
    this.done = false;
    this.state = {
      pan: new Animated.Value(top),
      haloScale: new Animated.Value(1),
    };
    this.animationZipper = null;
  }

  componentWillMount() {
    const { heightSlider, confirmButtonSlider, onSlideFinish } = this.props;
    const { pan } = this.state;
    this.panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,

      onMoveShouldSetPanResponderCapture: () => true,

      onStartShouldSetPanResponder: () => {
        this.pressIn();
      },

      onPanResponderGrant: () => {
        pan.setValue(top);
      },

      onPanResponderMove: (event, gestureState) => {
        const { dy } = gestureState;

        if (dy >= heightSlider - confirmButtonSlider) {
          this.endSlide = true;
          return false;
        } else if (dy <= -10) {
          return false;
        }

        if (this.endSlide) {
          this.endSlide = false;
        }

        return Animated.event([null, { dy: pan }])(event, gestureState);
      },

      onPanResponderRelease: () => {
        this.pressOut();

        if (this.endSlide) {
          this.animationZipper.play();
          onSlideFinish();

          this.done = true;

          Animated.timing(pan, {
            toValue: heightSlider - confirmButtonSlider,
            duration: 200,
            easing: Easing.elastic(0.8),
          }).start();
        } else {
          this.goBackUp();
        }
      },
    });
  }

  componentWillUpdate() {
    if (this.done) {
      this.animationZipper.reset();
      this.state.pan.setValue(top);
      this.done = false;
    }
  }

  pressIn() {
    if (this.done) {
      return;
    }
    Animated.timing(this.state.haloScale, {
      toValue: 1.3,
      duration: 500,
    }).start();
  }

  pressOut() {
    Animated.spring(this.state.haloScale, {
      toValue: 1,
      friction: 1,
    }).start();
  }

  goBackUp() {
    Animated.timing(this.state.pan, {
      toValue: top,
      duration: 200,
      easing: Easing.elastic(0.8),
    }).start();
  }

  render() {
    const { confirmButtonSlider, heightSlider } = this.props;
    const { pan, haloScale } = this.state;

    return (
      <SSliderMainContainer heightSlider={heightSlider}>
        <SSlider heightSlider={heightSlider}>
          <SSliderBackground source={sliderSub} />
          <ASlideProgress style={{ height: pan }} />
        </SSlider>
        <SSliderAnimated
          {...this.panResponder.panHandlers}
          confirmButtonSlider={confirmButtonSlider}
          style={{
            transform: [{ translateY: pan }, { scale: haloScale }],
          }}
        >
          <SSliderAnimation
            innerRef={animation => {
              if (animation) {
                this.animationZipper = animation;
              }
            }}
            source={zipper}
            speed={1}
            confirmButtonSlider={confirmButtonSlider}
          />
        </SSliderAnimated>
      </SSliderMainContainer>
    );
  }
}
VerticalSlider.defaultProps = {
  confirmButtonSlider: 60,
  heightSlider: Dimensions.get('window').height * 0.35,
};
VerticalSlider.propTypes = {
  onSlideFinish: func.isRequired,
  confirmButtonSlider: number,
  heightSlider: number,
};

export default VerticalSlider;
