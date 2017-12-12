import React from 'react';
import { func, bool, string, object, number, oneOfType } from 'prop-types';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 10,
  },
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#b2b2b2',
    borderRadius: 15,
    height: 30,
    paddingLeft: 10,
    paddingRight: 10,
  },
  text: {
    backgroundColor: 'transparent',
    color: '#fff',
    fontSize: 12,
  },
  activityIndicator: {
    marginTop: Platform.select({
      ios: -14,
      android: -16,
    }),
  },
  opacit: {
    opacity: 0,
  },
});

export default class LoadEarlier extends React.Component {
  renderLoading() {
    if (this.props.isLoadingEarlier === false) {
      return (
        <Text style={[styles.text, this.props.textStyle]}>
          {this.props.label}
        </Text>
      );
    }
    return (
      <View>
        <Text style={[styles.text, this.props.textStyle, styles.opacit]}>
          {this.props.label}
        </Text>
        <ActivityIndicator
          color="white"
          size="small"
          style={[styles.activityIndicator, this.props.activityIndicatorStyle]}
        />
      </View>
    );
  }
  render() {
    return (
      <TouchableOpacity
        style={[styles.container, this.props.containerStyle]}
        onPress={() => {
          if (this.props.onLoadEarlier) {
            this.props.onLoadEarlier();
          }
        }}
        disabled={this.props.isLoadingEarlier === true}
        accessibilityTraits="button"
      >
        <View style={[styles.wrapper, this.props.wrapperStyle]}>
          {this.renderLoading()}
        </View>
      </TouchableOpacity>
    );
  }
}

LoadEarlier.defaultProps = {
  onLoadEarlier: () => {},
  isLoadingEarlier: false,
  label: 'Load earlier messages',
  containerStyle: {},
  wrapperStyle: {},
  textStyle: {},
  activityIndicatorStyle: {},
};

LoadEarlier.propTypes = {
  onLoadEarlier: func,
  isLoadingEarlier: bool,
  label: string,
  containerStyle: oneOfType([string, object, number]),
  wrapperStyle: oneOfType([string, object, number]),
  textStyle: oneOfType([string, object, number]),
  activityIndicatorStyle: oneOfType([string, object, number]),
};
