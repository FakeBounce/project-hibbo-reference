import React, { Component } from 'react';
import { Dimensions, View, ScrollView } from 'react-native';
import { arrayOf, func, object } from 'prop-types';
import { bind } from 'decko';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    marginBottom: 30,
  },
  thumbnailsWrapper: {
    flexDirection: 'row',
  },
});

class Carousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentItem: 0,
    };
  }

  @bind
  onScroll(event) {
    this.setState({
      currentItem: Math.round(
        event.nativeEvent.contentOffset.x / Dimensions.get('window').width,
      ),
    });
  }

  @bind
  renderThumbnail(item, index) {
    if (this.state.currentItem === index) {
      return this.props.renderActiveThumbnail(item, index);
    }

    return this.props.renderEmptyThumbnail(item, index);
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={Dimensions.get('window').width}
          // @todo: Doesn't work on android, see pairing to correct
          snapToAlignment="start"
          decelerationRate={0}
          scrollEventThrottle={3}
          onScroll={this.onScroll}
          style={styles.scrollView}
        >
          {this.props.items.map(this.props.renderItem)}
        </ScrollView>

        <View style={styles.thumbnailsWrapper}>
          {this.props.items.map(this.renderThumbnail)}
        </View>
      </View>
    );
  }
}

Carousel.propTypes = {
  items: arrayOf(object).isRequired,
  renderItem: func.isRequired,
  renderActiveThumbnail: func.isRequired,
  renderEmptyThumbnail: func.isRequired,
};

export default Carousel;
