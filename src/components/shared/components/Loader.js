import React, { PureComponent } from 'react';
import { Animated } from 'react-native';
import { oneOfType, object, number, array } from 'prop-types';
import loader from 'assets/loader.json';
import { SLoaderView, SLoaderAnimation } from '../styles';

class Loader extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      progress: new Animated.Value(0),
    };
  }

  componentDidMount() {
    Animated.loop(
      Animated.timing(this.state.progress, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ).start();
  }

  render() {
    return (
      <SLoaderView style={this.props.style}>
        <SLoaderAnimation
          style={this.props.style}
          source={loader}
          progress={this.state.progress}
        />
      </SLoaderView>
    );
  }
}

Loader.defaultProps = {
  style: {},
};

Loader.propTypes = {
  style: oneOfType([object, number, array]),
};

export default Loader;
