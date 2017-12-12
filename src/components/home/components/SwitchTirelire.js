import React, { PureComponent } from 'react';
import { bind } from 'decko';
import { Dimensions, Animated } from 'react-native';
import { number, arrayOf, shape, func, bool, string } from 'prop-types';
import SwitchList from './SwitchList';
import { SAnimatedYellowContainer } from '../styles';

const { width } = Dimensions.get('window');

class SwitchTirelire extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      scroll: { x: 0, y: 0 },
      loader: 0,
    };

    this.switchIndex = new Animated.Value(0);
    this.switchOpacity = new Animated.Value(0);
    this.switchScale = new Animated.Value(0);
  }

  componentDidMount() {
    this.scrollToChild(this.props.kids);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.switchMode !== this.props.switchMode) {
      if (nextProps.childId !== this.props.childId) {
        this.scrollToChild(nextProps.kids);
        this.animatedSwitch(0, 0, 0, true, false, true);
      } else if (nextProps.switchMode) {
        this.props.setSwitchParticles();
        Animated.delay(600).start(() => {
          this.animatedSwitch(10, 1, 1, false, false, true);
        });
      } else {
        this.animatedSwitch(0, 0, 0, true, false, true);
      }
    }
  }

  @bind
  switchNavigate() {
    this.props.setSwitchMode();
    this.switchIndex.setValue(0);
    this.switchOpacity.setValue(0);
    this.switchScale.setValue(0);
    this.props.navigation.navigate('Pairing');
  }

  animatedSwitch(
    zIndex = 0,
    opacity = 0,
    scale = 0,
    setParticle = false,
    setSwitch = false,
    togHeader = false,
  ) {
    const { toggleHeader, setSwitchParticles, setSwitchMode } = this.props;
    if (togHeader) toggleHeader();
    Animated.parallel([
      Animated.timing(this.switchIndex, {
        toValue: zIndex,
        duration: 600,
      }),
      Animated.timing(this.switchOpacity, {
        toValue: opacity,
        duration: 600,
      }),
      Animated.timing(this.switchScale, {
        toValue: scale,
        duration: 600,
      }),
    ]).start(() => {
      this.setState(
        state => ({
          ...state,
          loader: 0,
        }),
        () => {
          if (setParticle) setSwitchParticles();
          if (setSwitch) setSwitchMode();
        },
      );
    });
  }

  scrollToChild(kids) {
    const { childId, dimensions } = this.props;
    kids.some((kid, index) => {
      if (index !== 0 && kid.childProfileId === childId) {
        this.setState(state => ({
          ...state,
          scroll: { x: 0, y: (index - 1) * (dimensions.holeSize + 50) },
        }));
        return true;
      }
      return false;
    });
  }

  render() {
    const { scroll, loader } = this.state;
    const { currentKid, kids, onPress, dimensions } = this.props;
    return (
      <SAnimatedYellowContainer
        realWidth={width}
        style={[
          {
            zIndex: this.switchIndex,
            opacity: this.switchOpacity,
            transform: [
              {
                scale: this.switchScale,
              },
            ],
          },
        ]}
      >
        <SwitchList
          kids={kids.length > 0 ? kids : [currentKid]}
          onPress={childId => {
            this.setState(
              state => ({
                ...state,
                loader: childId,
              }),
              () => {
                onPress(childId);
              },
            );
          }}
          loader={loader}
          addAction={this.switchNavigate}
          scroll={scroll}
          dimensions={dimensions}
        />
      </SAnimatedYellowContainer>
    );
  }
}

SwitchTirelire.defaultProps = {
  kids: [],
};

SwitchTirelire.propTypes = {
  switchMode: bool.isRequired,
  setSwitchMode: func.isRequired,
  setSwitchParticles: func.isRequired,
  onPress: func.isRequired,
  childId: number.isRequired,
  toggleHeader: func.isRequired,
  navigation: shape({
    navigate: func.isRequired,
  }).isRequired,
  kids: arrayOf(
    shape({
      avatar: string.isRequired,
      childProfileId: number.isRequired,
    }),
  ),
  currentKid: shape({
    avatar: string.isRequired,
    childProfileId: number.isRequired,
  }).isRequired,
  dimensions: shape({
    holeSize: number.isRequired,
  }).isRequired,
};

export default SwitchTirelire;
