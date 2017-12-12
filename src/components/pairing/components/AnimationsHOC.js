import React, { PureComponent } from 'react';
import { Animated, Easing } from 'react-native';
import { bind } from 'decko';

const AnimationsHOCHandler = Target => {
  class AnimationsHOC extends PureComponent {
    constructor() {
      super();

      this.titleAnimations = {
        opacity: new Animated.Value(1),
        translateY: new Animated.Value(0),
        scaleY: new Animated.Value(1),
      };
      this.controlsAnimations = {
        left: {
          opacity: new Animated.Value(0),
          translateY: new Animated.Value(25),
          scale: new Animated.Value(1),
          colorInterpolate: new Animated.Value(0),
        },
        right: {
          opacity: new Animated.Value(0),
          translateY: new Animated.Value(25),
          scale: new Animated.Value(1),
          colorInterpolate: new Animated.Value(0),
        },
      };
      this.inputAnimations = {
        borderOpacity: new Animated.Value(0),
        borderTranslateY: new Animated.Value(200),
        inputOpacity: new Animated.Value(0),
        inputTranslateY: new Animated.Value(150),
      };
      this.wifiListAnimations = {
        opacity: new Animated.Value(0),
        translateY: new Animated.Value(400),
      };
      this.birthdayAnimations = {
        day: {
          borderOpacity: new Animated.Value(0),
          borderTranslateY: new Animated.Value(200),
          inputOpacity: new Animated.Value(0),
          inputTranslateY: new Animated.Value(150),
        },
        month: {
          borderOpacity: new Animated.Value(0),
          borderTranslateY: new Animated.Value(200),
          inputOpacity: new Animated.Value(0),
          inputTranslateY: new Animated.Value(150),
        },
        year: {
          borderOpacity: new Animated.Value(0),
          borderTranslateY: new Animated.Value(200),
          inputOpacity: new Animated.Value(0),
          inputTranslateY: new Animated.Value(150),
        },
      };
      this.globalAnimations = {
        opacity: new Animated.Value(1),
      };
      this.pictureAnimations = {
        opacity: new Animated.Value(0),
      };
    }

    generateInputAnim(
      borderOpacity,
      borderTranslateY,
      inputOpacity,
      inputTranslateY,
    ) {
      return Animated.stagger(100, [
        Animated.parallel([
          Animated.timing(borderOpacity, {
            toValue: 1,
            duration: 300,
            easing: Easing.in(Easing.quad),
          }),
          Animated.timing(borderTranslateY, {
            toValue: 0,
            duration: 300,
          }),
        ]),
        Animated.parallel([
          Animated.timing(inputOpacity, {
            toValue: 1,
            duration: 200,
            easing: Easing.in(Easing.quad),
          }),
          Animated.timing(inputTranslateY, {
            toValue: 0,
            duration: 200,
          }),
        ]),
      ]);
    }

    @bind
    titleAppear() {
      const { opacity, translateY, scaleY } = this.titleAnimations;

      translateY.setValue(0);
      scaleY.setValue(1);

      return Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        easing: Easing.in(Easing.quad),
      });
    }

    @bind
    titleDisappear() {
      const { opacity, translateY, scaleY } = this.titleAnimations;

      return Animated.sequence([
        Animated.timing(translateY, {
          toValue: 25,
          duration: 100,
          easing: Easing.in(Easing.quad),
        }),
        Animated.parallel([
          Animated.timing(translateY, {
            toValue: -50,
            duration: 300,
            easing: Easing.in(Easing.quad),
          }),
          Animated.timing(opacity, {
            toValue: 0,
            duration: 300,
            easing: Easing.in(Easing.quad),
          }),
          Animated.timing(scaleY, {
            toValue: 0.5,
            duration: 300,
            easing: Easing.in(Easing.quad),
          }),
        ]),
      ]);
    }

    @bind
    controlsAppear() {
      const { left, right } = this.controlsAnimations;

      left.translateY.setValue(25);
      left.scale.setValue(1);
      left.colorInterpolate.setValue(0);
      right.translateY.setValue(25);
      right.scale.setValue(1);
      right.colorInterpolate.setValue(0);

      return Animated.stagger(100, [
        Animated.parallel([
          Animated.timing(left.opacity, {
            toValue: 1,
            duration: 300,
            easing: Easing.in(Easing.quad),
          }),
          Animated.timing(left.translateY, {
            toValue: 0,
            duration: 300,
          }),
        ]),
        Animated.parallel([
          Animated.timing(right.opacity, {
            toValue: 1,
            duration: 200,
            easing: Easing.in(Easing.quad),
          }),
          Animated.timing(right.translateY, {
            toValue: 0,
            duration: 200,
          }),
        ]),
      ]);
    }

    @bind
    controlsDisappear() {
      const { left, right } = this.controlsAnimations;

      return Animated.parallel([
        Animated.timing(left.opacity, {
          toValue: 0,
          easing: Easing.in(Easing.quad),
        }),
        Animated.timing(right.opacity, {
          toValue: 0,
          easing: Easing.in(Easing.quad),
        }),
      ]);
    }

    @bind
    controlsClick(position, cb = null) {
      const { left, right } = this.controlsAnimations;

      return Animated.sequence([
        Animated.parallel([
          Animated.timing(this.controlsAnimations[position].scale, {
            toValue: 1.2,
            duration: 300,
            easing: Easing.in(Easing.quad),
          }),
          Animated.timing(this.controlsAnimations[position].colorInterpolate, {
            toValue: 1,
            duration: 300,
          }),
        ]),
        Animated.parallel([
          Animated.timing(left.opacity, {
            toValue: 150,
          }),
          Animated.timing(right.opacity, {
            toValue: 150,
          }),
        ]),
      ]).start(() => {
        if (cb) {
          cb();
        }
      });
    }

    @bind
    inputAppear() {
      const {
        borderOpacity,
        borderTranslateY,
        inputOpacity,
        inputTranslateY,
      } = this.inputAnimations;

      borderTranslateY.setValue(200);
      inputTranslateY.setValue(150);

      return this.generateInputAnim(
        borderOpacity,
        borderTranslateY,
        inputOpacity,
        inputTranslateY,
      );
    }

    @bind
    inputDisappear() {
      const { inputOpacity, borderOpacity } = this.inputAnimations;

      return Animated.parallel([
        Animated.timing(inputOpacity, {
          toValue: 0,
          easing: Easing.in(Easing.quad),
        }),
        Animated.timing(borderOpacity, {
          toValue: 0,
          easing: Easing.in(Easing.quad),
        }),
      ]);
    }

    @bind
    wifiAppear() {
      const { opacity, translateY } = this.wifiListAnimations;

      translateY.setValue(400);

      return Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          easing: Easing.in(Easing.quad),
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          easing: Easing.in(Easing.quad),
        }),
      ]);
    }

    @bind
    wifiDisappear(duration = 300) {
      const { opacity } = this.wifiListAnimations;

      return Animated.timing(opacity, {
        toValue: 0,
        duration,
        easing: Easing.in(Easing.quad),
      });
    }

    @bind
    pictureAppear() {
      const { opacity } = this.pictureAnimations;

      return Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        easing: Easing.in(Easing.quad),
      });
    }

    @bind
    pictureDisappear() {
      const { opacity } = this.pictureAnimations;

      return Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        easing: Easing.in(Easing.quad),
      });
    }

    @bind
    birthdayAppear() {
      const { day, month, year } = this.birthdayAnimations;
      const { opacity } = this.globalAnimations;

      opacity.setValue(1);
      day.borderOpacity.setValue(0);
      day.borderTranslateY.setValue(200);
      day.inputOpacity.setValue(0);
      day.inputTranslateY.setValue(150);
      month.borderOpacity.setValue(0);
      month.borderTranslateY.setValue(200);
      month.inputOpacity.setValue(0);
      month.inputTranslateY.setValue(150);
      year.borderOpacity.setValue(0);
      year.borderTranslateY.setValue(200);
      year.inputOpacity.setValue(0);
      year.inputTranslateY.setValue(150);

      return Animated.stagger(100, [
        this.generateInputAnim(
          day.borderOpacity,
          day.borderTranslateY,
          day.inputOpacity,
          day.inputTranslateY,
        ),
        this.generateInputAnim(
          month.borderOpacity,
          month.borderTranslateY,
          month.inputOpacity,
          month.inputTranslateY,
        ),
        this.generateInputAnim(
          year.borderOpacity,
          year.borderTranslateY,
          year.inputOpacity,
          year.inputTranslateY,
        ),
      ]);
    }

    @bind
    birthdayDisappear() {
      const { opacity } = this.globalAnimations;

      return Animated.timing(opacity, {
        toValue: 0,
        easing: Easing.in(Easing.quad),
      });
    }

    render() {
      return (
        <Target
          {...this.props}
          titleAnimations={this.titleAnimations}
          controlsAnimations={this.controlsAnimations}
          inputAnimations={this.inputAnimations}
          wifiListAnimations={this.wifiListAnimations}
          globalAnimations={this.globalAnimations}
          birthdayAnimations={this.birthdayAnimations}
          pictureAnimations={this.pictureAnimations}
          titleAppear={this.titleAppear}
          titleDisappear={this.titleDisappear}
          controlsAppear={this.controlsAppear}
          controlsClick={this.controlsClick}
          controlsDisappear={this.controlsDisappear}
          inputAppear={this.inputAppear}
          inputDisappear={this.inputDisappear}
          wifiAppear={this.wifiAppear}
          wifiDisappear={this.wifiDisappear}
          pictureAppear={this.pictureAppear}
          pictureDisappear={this.pictureDisappear}
          birthdayAppear={this.birthdayAppear}
          birthdayDisappear={this.birthdayDisappear}
        />
      );
    }
  }

  return AnimationsHOC;
};

export default AnimationsHOCHandler;
