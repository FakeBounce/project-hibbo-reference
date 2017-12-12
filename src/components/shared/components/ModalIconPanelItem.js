import React, { PureComponent } from 'react';
import { bind } from 'decko';
import { string, shape, oneOfType, array, object, number } from 'prop-types';
import { Animated, Image } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import { getTrueNumber } from 'utils/i18n';
import { StyledTextSmallWhite } from 'styles/styledComponents/texts';
import { StyledColumn } from 'styles/styledComponents/containers';

import arrowRight from 'assets/messenger/arrowRight.png';
import AppStyles from 'styles/appStyles';
import {
  SMIPIstart,
  SMIPImiddle,
  SMIPIend,
  AnimatedMIPIbuyableRow,
  SMIPIvideo,
  SMIPIredText,
} from '../styles';

const styles = EStyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingVertical: 60,
    paddingHorizontal: 20,
    marginBottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100% - 20',
  },
});

// @todo: Get icon from server maybe??
class ModalIconPanelItem extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      opacity: 0,
    };
  }

  @bind
  isReady() {
    this.setState({
      opacity: 1,
    });
  }

  render() {
    if (this.props.icon.buyable) {
      return (
        <AnimatedMIPIbuyableRow
          style={[
            styles.row,
            {
              backgroundColor: this.props.icon.buyable.color,
            },
            this.props.style,
          ]}
        >
          <SMIPIstart>
            <StyledTextSmallWhite>
              {this.props.icon.buyable.name}
            </StyledTextSmallWhite>
            <StyledTextSmallWhite>Pack</StyledTextSmallWhite>
            <StyledTextSmallWhite>
              {getTrueNumber(this.props.icon.buyable.price)}
            </StyledTextSmallWhite>
          </SMIPIstart>
          <SMIPImiddle>
            <SMIPIvideo
              source={AppStyles.icons[this.props.icon.icon]}
              rate={1.0}
              repeat
              resizeMode="cover" // Android fix for low scale videos, to rework ?
              style={[this.props.imageStyle, { opacity: this.state.opacity }]}
              onReadyForDisplay={this.isReady}
            />
          </SMIPImiddle>
          <SMIPIend>
            <Image source={arrowRight} />
          </SMIPIend>
        </AnimatedMIPIbuyableRow>
      );
    }
    if (this.props.icon.text) {
      return (
        <StyledColumn style={styles.row}>
          <SMIPIvideo
            source={AppStyles.icons[this.props.icon.icon]}
            rate={1.0}
            repeat
            resizeMode="cover" // Android fix for low scale videos, to rework ?
            style={[this.props.imageStyle, { opacity: this.state.opacity }]}
            onReadyForDisplay={this.isReady}
          />
          <SMIPIredText>{this.props.icon.text}</SMIPIredText>
        </StyledColumn>
      );
    }
    return (
      <Animated.View style={[styles.row, this.props.style]}>
        <SMIPIvideo
          source={AppStyles.icons[this.props.icon.icon]}
          rate={1.0}
          repeat
          resizeMode="cover" // Android fix for low scale videos, to rework ?
          style={[this.props.imageStyle, { opacity: this.state.opacity }]}
          onReadyForDisplay={this.isReady}
        />
      </Animated.View>
    );
  }
}

ModalIconPanelItem.defaultProps = {
  style: {},
  imageStyle: {},
};
ModalIconPanelItem.propTypes = {
  style: oneOfType([object, number, array]),
  icon: shape({
    icon: string.isRequired,
    buyable: shape({
      price: string.isRequired,
      color: string.isRequired,
      name: string.isRequired,
    }),
    text: string,
  }).isRequired,
  imageStyle: oneOfType([object, number, array]),
};

export default ModalIconPanelItem;
