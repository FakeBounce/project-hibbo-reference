import React, { PureComponent } from 'react';
import { Animated, Easing } from 'react-native';
import { shape, string, func } from 'prop-types';

const initPosCross = {
  x: 0,
  y: 40,
};

const initPosCircle = {
  x: 0,
  y: 20,
};

const initPosCurve = {
  x: 25,
  y: 40,
};

const AvatarDebitHOCHandler = Target => {
  class AvatarDebitHOC extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        hasPulse: false,
      };

      this.pulse1ScaleValues = new Animated.Value(0);
      this.pulsePicture = new Animated.Value(1);
      this.pulse2ScaleValues = new Animated.Value(0);
      this.yellowScaleValues = new Animated.Value(0);
      this.gimmickOpacity = new Animated.Value(0);

      this.circleAnimValues = {
        translateY: new Animated.Value(initPosCircle.y),
        translateX: new Animated.Value(initPosCircle.x),
        scale: new Animated.Value(1),
        rotate: new Animated.Value(0),
      };

      this.crossAnimValues = {
        translateY: new Animated.Value(initPosCross.y),
        translateX: new Animated.Value(initPosCross.x),
        scale: new Animated.Value(0.4),
        rotate: new Animated.Value(0),
      };

      this.curvesAnimValues = {
        translateY: new Animated.Value(initPosCurve.y),
        translateX: new Animated.Value(initPosCurve.x),
        scale: new Animated.Value(0.3),
        rotate: new Animated.Value(0),
      };
    }

    resetAnimation() {
      this.pulse1ScaleValues.setValue(0);
      this.pulsePicture.setValue(1);
      this.pulse2ScaleValues.setValue(0);
      this.yellowScaleValues.setValue(0);
      this.gimmickOpacity.setValue(0);

      this.crossAnimValues.translateX.setValue(initPosCross.x);
      this.crossAnimValues.translateY.setValue(initPosCross.y);
      this.crossAnimValues.rotate.setValue(0);

      this.curvesAnimValues.translateX.setValue(initPosCurve.x);
      this.curvesAnimValues.translateY.setValue(initPosCurve.y);

      this.circleAnimValues.translateX.setValue(initPosCircle.x);
      this.circleAnimValues.translateY.setValue(initPosCircle.y);
    }

    firstPulse() {
      return [
        Animated.timing(this.pulse1ScaleValues, {
          toValue: 1.4,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(this.pulse2ScaleValues, {
          toValue: 0.9,
          duration: 400,
          delay: 200,
          useNativeDriver: true,
        }),
      ];
    }

    secondPulse() {
      return [
        Animated.timing(this.pulsePicture, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(this.yellowScaleValues, {
          toValue: 1.4,
          useNativeDriver: true,
        }),
      ];
    }

    gimmickMove() {
      return [
        Animated.timing(this.pulse2ScaleValues, {
          toValue: 0,
          duration: 600,
          easing: Easing.elastic(0.8),
          useNativeDriver: true,
        }),
        Animated.timing(this.yellowScaleValues, {
          toValue: 0,
          useNativeDriver: true,
        }),
        Animated.timing(this.gimmickOpacity, {
          toValue: 1,
          useNativeDriver: true,
        }),

        // Gimmick Move
        Animated.timing(this.circleAnimValues.translateX, {
          toValue: -40,
          useNativeDriver: true,
        }),
        Animated.timing(this.curvesAnimValues.translateY, {
          toValue: 85,
          useNativeDriver: true,
        }),
        Animated.timing(this.curvesAnimValues.translateX, {
          toValue: 30,
          useNativeDriver: true,
        }),
        Animated.timing(this.crossAnimValues.translateX, {
          toValue: 50,
          useNativeDriver: true,
        }),
      ];
    }

    gimmickAnimation() {
      return [
        Animated.timing(this.crossAnimValues.scale, {
          toValue: 0.5,
          easing: Easing.elastic(0.8),
          useNativeDriver: true,
        }),
        Animated.timing(this.curvesAnimValues.scale, {
          toValue: 0.4,
          easing: Easing.elastic(0.8),
          useNativeDriver: true,
        }),
      ];
    }

    animateAvatar = () => {
      this.setState({ hasPulse: true }, () => {
        Animated.sequence([
          Animated.parallel(this.firstPulse()),
          Animated.parallel(this.secondPulse()),
          Animated.parallel(this.gimmickMove()),
          Animated.parallel(this.gimmickAnimation()),
        ]).start(() => {
          this.props.action();
          this.resetAnimation();
          this.setState({ hasPulse: false });
        });
      });
    };

    render() {
      const { user } = this.props;
      const { hasPulse } = this.state;

      return (
        <Target
          {...this.props}
          user={user}
          hasPulse={hasPulse}
          pulsePicture={this.pulsePicture}
          yellowScaleValues={this.yellowScaleValues}
          gimmickOpacity={this.gimmickOpacity}
          circleAnimValues={this.circleAnimValues}
          curvesAnimValues={this.curvesAnimValues}
          crossAnimValues={this.crossAnimValues}
          pulse1ScaleValues={this.pulse1ScaleValues}
          pulse2ScaleValues={this.pulse2ScaleValues}
        />
      );
    }
  }

  AvatarDebitHOC.propTypes = {
    user: shape({
      name: string.isRequired,
      avatar: string,
    }).isRequired,
    action: func.isRequired,
  };

  return AvatarDebitHOC;
};

export default AvatarDebitHOCHandler;
