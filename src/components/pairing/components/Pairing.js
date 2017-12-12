import React, { PureComponent } from 'react';
import { Animated, Easing } from 'react-native';
import { string, number, func, shape } from 'prop-types';
import { bind } from 'decko';

import appStyles from 'styles/appStyles';

import {
  StyledContainerBlack,
  StyledContainerWrapper,
} from 'styledComponents/containers';

import Wrapper from './Wrapper';

const StyledWrapper = StyledContainerWrapper.extend`
  background-color: ${props => props.theme.colors.white};
`;

class Pairing extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      reset: false,
      autoFocus: false,
      type: '',
      animatedStyles: {
        sliderOpacity: new Animated.Value(1),
        monimalzBounce: new Animated.Value(0),
        monimalzScale: new Animated.Value(1),
        monimalzOpacity: new Animated.Value(1),
      },
    };

    this.direction = null;
    this.changeStep = this.props.changeStep.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.changingStep !== nextProps.changingStep &&
      (nextProps.changingStep === 'forward' ||
        nextProps.changingStep === 'backward')
    ) {
      this.hideContentAndNavigate(nextProps.changingStep);
    } else if (this.props.step !== nextProps.step) {
      const direction =
        this.props.step < nextProps.step ? 'forward' : 'backward';
      this.direction = direction;
      this.showTitle();
    }

    if (
      this.props.navIndex !== nextProps.navIndex &&
      this.props.navIndex === 1 &&
      nextProps.navIndex === 0
    ) {
      this.showContent();
    }
  }

  hideContentAndNavigate(direction) {
    const {
      step,
      wifiDisappear,
      inputDisappear,
      pictureDisappear,
      birthdayDisappear,
      controlsDisappear,
      titleAppear,
      navigate,
    } = this.props;

    const delayWelcomeMsg = Animated.delay(4000);
    let animsOut = [this.props.titleDisappear()];

    switch (step) {
      case 1:
        animsOut = [...animsOut, wifiDisappear()];
        break;
      case 2:
      case 4:
        animsOut = [...animsOut, inputDisappear()];
        break;
      case 5:
      case 6:
        animsOut = [...animsOut, pictureDisappear()];
        break;
      case 7:
        animsOut = [...animsOut, birthdayDisappear()];
        break;
      default:
        break;
    }

    if (step >= 2) {
      animsOut = [...animsOut, controlsDisappear()];
    }

    if (step === 0) {
      // Specific step for Monimalz welcome message
      Animated.sequence([
        titleAppear(),
        delayWelcomeMsg,
        Animated.parallel(animsOut),
      ]).start(() => {
        if (direction !== '') {
          navigate(direction);
        }
      });
    } else {
      Animated.sequence([
        Animated.parallel(animsOut),
        Animated.delay(150),
      ]).start(() => {
        if (direction !== '') {
          navigate(direction);
        }
      });
    }

    return true;
  }

  showTitle() {
    const { titleAppear } = this.props;

    Animated.sequence([Animated.delay(250), titleAppear()]).start();
  }

  @bind
  showContent() {
    const {
      step,
      wifiAppear,
      inputAppear,
      pictureAppear,
      birthdayAppear,
      controlsAppear,
    } = this.props;
    let animsIn = [];

    switch (step) {
      case 1:
        animsIn = [...animsIn, wifiAppear()];
        break;
      case 2:
        animsIn = [...animsIn, inputAppear()];
        break;
      case 4:
        animsIn = [...animsIn, inputAppear()];
        break;
      case 5:
      case 6:
        animsIn = [...animsIn, pictureAppear()];
        break;
      case 7:
        animsIn = [...animsIn, birthdayAppear()];
        break;
      default:
        break;
    }

    if (step >= 2) {
      animsIn = [...animsIn, controlsAppear()];
    }

    Animated.parallel(animsIn).start();
  }

  resetAnim() {
    const {
      sliderOpacity,
      monimalzBounce,
      monimalzScale,
      monimalzOpacity,
    } = this.state.animatedStyles;

    Animated.parallel([
      Animated.timing(monimalzBounce, {
        toValue: 0,
        duration: 250,
        delay: 200,
        useNativeDriver: true,
      }),
      Animated.timing(monimalzScale, {
        toValue: 1,
        duration: 250,
        delay: 200,
        useNativeDriver: true,
      }),
      Animated.timing(monimalzOpacity, {
        toValue: 1,
        delay: 250,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start(() => {
      this.setState(
        state => {
          return {
            ...state,
            type: '',
          };
        },
        () => {
          Animated.parallel([
            Animated.timing(sliderOpacity, {
              toValue: 1,
              duration: 100,
              useNativeDriver: true,
            }),
            this.props.titleAppear(),
          ]).start();
        },
      );
    });
  }

  animateBounceIn(type) {
    const {
      sliderOpacity,
      monimalzBounce,
      monimalzScale,
    } = this.state.animatedStyles;

    Animated.sequence([
      this.props.titleDisappear(),
      Animated.parallel([
        Animated.timing(sliderOpacity, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(monimalzBounce, {
          toValue: -75,
          duration: 250,
          easing: Easing.in(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      this.setState(
        state => {
          return {
            ...state,
            type,
            reset: false,
          };
        },
        () => {
          Animated.parallel([
            Animated.timing(monimalzBounce, {
              toValue: 75,
              duration: 350,
              easing: Easing.elastic(1.2),
              useNativeDriver: true,
            }),
            Animated.timing(monimalzScale, {
              toValue: 1.1,
              duration: 150,
              easing: Easing.quad,
              useNativeDriver: true,
            }),
          ]).start(() => {
            this.changeStep('forward');
          });
        },
      );
    });
  }

  animateBounceOut(type) {
    const {
      sliderOpacity,
      monimalzBounce,
      monimalzScale,
      monimalzOpacity,
    } = this.state.animatedStyles;

    Animated.sequence([
      this.props.titleDisappear(),
      Animated.parallel([
        Animated.timing(sliderOpacity, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(monimalzBounce, {
          toValue: -75,
          duration: 250,
          easing: Easing.in(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      this.setState(
        state => {
          return {
            ...state,
            type,
            reset: false,
          };
        },
        () => {
          Animated.parallel([
            Animated.timing(monimalzBounce, {
              toValue: 400,
              duration: 350,
              easing: Easing.elastic(1.2),
              useNativeDriver: true,
            }),
            Animated.timing(monimalzScale, {
              toValue: 1.1,
              duration: 150,
              easing: Easing.quad,
              useNativeDriver: true,
            }),
            Animated.timing(monimalzOpacity, {
              toValue: 0,
              delay: 200,
              duration: 50,
              useNativeDriver: true,
            }),
          ]).start(() => {
            this.changeStep('forward');
          });
        },
      );
    });
  }

  @bind
  chooseType(type = '') {
    this.props.selectMonimalzType(type);

    if (type === '') {
      this.setState(
        state => {
          return {
            ...state,
            reset: true,
          };
        },
        () => {
          Animated.parallel([
            this.props.titleDisappear(),
            this.props.wifiDisappear(100),
          ]).start(() => {
            this.resetAnim();
            this.changeStep('backward');
          });
        },
      );
    } else if (type === 'panda' || type === 'monkey') {
      this.animateBounceIn(type);
    } else if (type === 'whale') {
      this.animateBounceOut(type);
    }
  }

  render() {
    const { reset, type, animatedStyles, autoFocus } = this.state;
    const { step } = this.props;

    return (
      <StyledContainerBlack>
        <StyledWrapper style={appStyles.cardStyle}>
          <Wrapper
            step={step}
            reset={reset}
            type={type}
            autoFocus={autoFocus}
            chooseType={this.chooseType}
            moveStep={this.changeStep}
            animatedStyles={animatedStyles}
            showContent={this.showContent}
            {...this.props}
          />
        </StyledWrapper>
      </StyledContainerBlack>
    );
  }
}

Pairing.propTypes = {
  step: number.isRequired,
  changingStep: string.isRequired,
  navigate: func.isRequired,
  currentKid: shape({
    childProfileId: number,
  }).isRequired,
  navigation: shape({
    goBack: func.isRequired,
  }).isRequired,
  changeStep: func.isRequired,
  selectMonimalzType: func.isRequired,
  titleDisappear: func.isRequired,
  titleAppear: func.isRequired,
  wifiDisappear: func.isRequired,
  wifiAppear: func.isRequired,
  inputDisappear: func.isRequired,
  inputAppear: func.isRequired,
  pictureDisappear: func.isRequired,
  pictureAppear: func.isRequired,
  birthdayDisappear: func.isRequired,
  birthdayAppear: func.isRequired,
  controlsAppear: func.isRequired,
  controlsDisappear: func.isRequired,
  navIndex: number.isRequired,
};

export default Pairing;
