import React, { PureComponent } from 'react';
import { ScrollView, Animated, StyleSheet } from 'react-native';
import {
  func,
  node,
  string,
  number,
  oneOfType,
  object,
  array,
} from 'prop-types';

import theme from 'styles/appStyles';
import { StyledContainerBasic } from 'styles/styledComponents/containers';
import {
  AnimatedFlexibleHeaderView,
  SFlexHeaderMain,
  SFlexBackArrow,
  SFlexHeaderTitle,
  SFlexTitle,
  SFlexHeaderTitleRight,
} from '../styles';
import Back from '../Back';

const styles = StyleSheet.create({
  scrollViewContentContainer: {
    flexGrow: 1,
  },
});

class FlexibleHeaderLayout extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      headerHeight: new Animated.Value(this.props.maxHeight),
    };

    this.headerAnimationOngoing = false;
    this.headerClosed = false;
  }

  componentWillReceiveProps(nextProps) {
    const { scrollPosY } = nextProps;
    if (!this.headerAnimationOngoing) {
      if (scrollPosY > 10 && !this.headerClosed) {
        this.headerAnimationOngoing = true;
        Animated.timing(this.state.headerHeight, {
          toValue: this.props.minHeight,
          duration: 150,
        }).start(() => {
          this.headerAnimationOngoing = false;
          this.headerClosed = true;
        });
      }

      if (scrollPosY <= 10 && this.headerClosed) {
        this.headerAnimationOngoing = true;
        Animated.timing(this.state.headerHeight, {
          toValue: this.props.maxHeight,
          duration: 150,
        }).start(() => {
          this.headerAnimationOngoing = false;
          this.headerClosed = false;
        });
      }
    }
  }

  render() {
    return (
      <StyledContainerBasic style={this.props.style}>
        <AnimatedFlexibleHeaderView
          style={[
            {
              backgroundColor: this.state.headerHeight.interpolate({
                inputRange: [this.props.minHeight, this.props.maxHeight],
                outputRange: [theme.colors.moneyPotText, theme.colors.white],
              }),
              height: this.state.headerHeight,
            },
          ]}
        >
          <SFlexHeaderMain>
            <SFlexBackArrow>
              <Back
                type={this.props.arrowType}
                action={this.props.onBack}
                color={this.props.arrowColor}
              />
            </SFlexBackArrow>
            <SFlexHeaderTitle>
              <SFlexTitle>{this.props.title}</SFlexTitle>
            </SFlexHeaderTitle>
            <SFlexHeaderTitleRight />
          </SFlexHeaderMain>
          {this.props.menuChildren}
        </AnimatedFlexibleHeaderView>

        <ScrollView
          showsVerticalScrollIndicator={false}
          onScroll={this.props.onScroll}
          scrollEventThrottle={14}
          contentContainerStyle={styles.scrollViewContentContainer}
        >
          {this.props.children}
        </ScrollView>
      </StyledContainerBasic>
    );
  }
}

FlexibleHeaderLayout.propTypes = {
  onBack: func.isRequired,
  onScroll: func.isRequired,
  children: node.isRequired,
  menuChildren: node,
  title: string.isRequired,
  style: oneOfType([object, number, array]),
  minHeight: number,
  maxHeight: number,
  scrollPosY: number,
  arrowColor: string,
  arrowType: string,
};

FlexibleHeaderLayout.defaultProps = {
  style: {},
  menuChildren: null,
  minHeight: 60,
  maxHeight: 120,
  scrollPosY: 0,
  arrowColor: 'black',
  arrowType: 'straight',
};

export default FlexibleHeaderLayout;
