import { Dimensions, View, Image } from 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import EStyleSheet from 'react-native-extended-stylesheet';

import bigPiggy from 'assets/settings/big-piggy.png';
import Carousel from '../components/Carousel';

const { width } = Dimensions.get('window');

const styles = EStyleSheet.create({
  slideWrapper: {
    alignItems: 'center',
  },
  thumbnailItemWrapper: {
    borderRadius: 16,
    borderColor: '$colors.lightGrey',
    padding: 2,
    margin: 5,
  },
  activeThumbnailItemWrapper: {
    borderWidth: 1,
  },
  thumbnail: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '$colors.lightGrey',
  },
});

const carouselItems = [{ uri: bigPiggy }, { uri: bigPiggy }, { uri: bigPiggy }];

const renderItem = (item, index) => (
  <View key={index} style={[styles.slideWrapper, { width }]}>
    <Image source={item.uri} />
  </View>
);

const renderActiveThumbnail = (item, index) => (
  <View
    key={index}
    style={[styles.thumbnailItemWrapper, styles.activeThumbnailItemWrapper]}
  >
    <View style={styles.thumbnail} />
  </View>
);

const renderEmptyThumbnail = (item, index) => (
  <View key={index} style={styles.thumbnailItemWrapper}>
    <View style={styles.thumbnail} />
  </View>
);

describe('Carousel', () => {
  it('should render the component', () => {
    const carousel = renderer
      .create(
        <Carousel
          items={carouselItems}
          renderItem={renderItem}
          renderActiveThumbnail={renderActiveThumbnail}
          renderEmptyThumbnail={renderEmptyThumbnail}
        />,
      )
      .toJSON();

    expect(carousel).toMatchSnapshot();
  });
});
