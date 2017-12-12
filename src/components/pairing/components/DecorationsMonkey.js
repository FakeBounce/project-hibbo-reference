import React, { PureComponent } from 'react';
import { Dimensions, Animated, Easing } from 'react-native';
import { bool } from 'prop-types';
import styled from 'styled-components/native';

import bigCloudImage from 'assets/pairing/monkey/bigCloud.png';
import smallCloudImage from 'assets/pairing/monkey/smallCloud.png';
import rockImage from 'assets/pairing/monkey/rock.png';

import leftTreeImage from 'assets/pairing/monkey/json/leftTree.json';
import rightTreeImage from 'assets/pairing/monkey/json/rightTree.json';
import lianaImage from 'assets/pairing/monkey/json/liana.json';

import * as Styles from '../styles';

const StyledTest = styled.View`
  position: absolute;
  top: 0px;
  left: 0px;
  width: ${Dimensions.get('window').width}px;
  height: ${Dimensions.get('window').height}px;
`;

class DecorationsMonkey extends PureComponent {
  state = {
    liana: new Animated.Value(0),
    leftTree: new Animated.Value(0),
    rightTree: new Animated.Value(0),
    rock: new Animated.Value(0),
    bigCloud: new Animated.Value(0),
    smallCloud: new Animated.Value(0),
    topY: new Animated.Value(0),
    bottomY: new Animated.Value(0),
    leftX: new Animated.Value(0),
    rightX: new Animated.Value(0),
  };

  componentDidMount() {
    const {
      liana,
      leftTree,
      rightTree,
      rock,
      bigCloud,
      smallCloud,
    } = this.state;

    if (this.props.animated) {
      Animated.parallel([
        Animated.timing(liana, {
          toValue: 1,
          delay: 350,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(leftTree, {
          toValue: 1,
          delay: 150,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(rightTree, {
          toValue: 1,
          delay: 100,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(rock, {
          toValue: -30,
          duration: 300,
          easing: Easing.in(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(bigCloud, {
          toValue: -200,
          duration: 4500,
          easing: Easing.in(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(smallCloud, {
          toValue: -250,
          duration: 3500,
          easing: Easing.in,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      liana.setValue(1);
      leftTree.setValue(1);
      rightTree.setValue(1);
      rock.setValue(-30);
      bigCloud.setValue(-200);
      smallCloud.setValue(-250);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.reset !== nextProps.reset && nextProps.reset) {
      this.resetAnims();
    }
  }

  resetAnims() {
    const { topY, bottomY, leftX, rightX } = this.state;

    Animated.parallel([
      Animated.timing(topY, {
        toValue: -400,
        duration: 300,
      }),
      Animated.timing(bottomY, {
        toValue: 400,
        duration: 300,
      }),
      Animated.timing(leftX, {
        toValue: -400,
        duration: 300,
      }),
      Animated.timing(rightX, {
        toValue: 400,
        duration: 300,
      }),
    ]).start();
  }

  render() {
    const {
      liana,
      leftTree,
      rightTree,
      rock,
      bigCloud,
      smallCloud,
      topY,
      bottomY,
      leftX,
      rightX,
    } = this.state;

    return (
      <StyledTest>
        <Styles.AImageContainer
          style={{
            transform: [
              {
                translateY: topY,
              },
            ],
          }}
        >
          <Styles.SLiana source={lianaImage} progress={liana} />
        </Styles.AImageContainer>

        <Styles.AImageContainer
          style={{
            transform: [
              {
                translateY: bottomY,
              },
            ],
          }}
        >
          <Styles.ARock
            style={{
              transform: [
                {
                  translateY: rock,
                },
              ],
            }}
            source={rockImage}
          />
        </Styles.AImageContainer>

        <Styles.AImageContainer
          style={{
            transform: [
              {
                translateX: rightX,
              },
            ],
          }}
        >
          <Styles.ABigCloud
            style={{
              transform: [
                {
                  translateX: bigCloud,
                },
              ],
            }}
            source={bigCloudImage}
          />
          <Styles.ASmallCloud
            style={{
              transform: [
                {
                  translateX: smallCloud,
                },
              ],
            }}
            source={smallCloudImage}
          />
          <Styles.SRightTree source={rightTreeImage} progress={rightTree} />
        </Styles.AImageContainer>

        <Styles.AImageContainer
          style={{
            transform: [
              {
                translateX: leftX,
              },
            ],
          }}
        >
          <Styles.SLeftTree source={leftTreeImage} progress={leftTree} />
        </Styles.AImageContainer>
      </StyledTest>
    );
  }
}

DecorationsMonkey.propTypes = {
  animated: bool.isRequired,
  reset: bool.isRequired,
};

export default DecorationsMonkey;
