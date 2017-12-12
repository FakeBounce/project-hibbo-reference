import React, { PureComponent } from 'react';
import { Animated } from 'react-native';
import { string, func } from 'prop-types';
import debitJson from 'assets/transfert/animation/debit.json';
import payJson from 'assets/transfert/animation/pay.json';
import { SHomeAnimation, SContainerHomeAnimation } from '../styles';

class HomeAnimation extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      progress: new Animated.Value(0),
    };
  }

  componentDidMount() {
    Animated.timing(this.state.progress, {
      toValue: 1,
      duration: this.props.type === 'pelican' ? 6760 : 6060,
    }).start(() => {
      this.props.action();
    });
  }

  render() {
    const { type } = this.props;
    const { progress } = this.state;
    switch (type) {
      case 'kangourou':
        return (
          <SContainerHomeAnimation
            jsonWidth={payJson.w / 3}
            jsonHeight={payJson.h / 3}
          >
            <SHomeAnimation
              jsonWidth={payJson.w / 3}
              jsonHeight={payJson.h / 3}
              source={payJson}
              progress={progress}
            />
          </SContainerHomeAnimation>
        );
      case 'pelican':
        return (
          <SContainerHomeAnimation
            jsonWidth={debitJson.w / 2}
            jsonHeight={debitJson.h / 2}
          >
            <SHomeAnimation
              jsonWidth={debitJson.w / 2}
              jsonHeight={debitJson.h / 2}
              source={debitJson}
              progress={progress}
            />
          </SContainerHomeAnimation>
        );
      default:
        return null;
    }
  }
}
HomeAnimation.propTypes = {
  type: string.isRequired,
  action: func.isRequired,
};

export default HomeAnimation;
