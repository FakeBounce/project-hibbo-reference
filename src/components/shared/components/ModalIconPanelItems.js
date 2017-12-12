import React, { PureComponent } from 'react';
import { arrayOf, string, shape, func } from 'prop-types';
import { FlatList, TouchableOpacity, Animated } from 'react-native';
import { bind } from 'decko';
import { iconData } from 'utils/storedData';
import { StyledContainerBasic } from 'styles/styledComponents/containers';
//  Components
import ModalIconPanelItem from './ModalIconPanelItem';

class ModalIconPanelItems extends PureComponent {
  constructor(props) {
    super(props);

    const animatedScale = {};
    const iconsInfo = {};

    // eslint-disable-next-line
    for (const icon of this.props.iconData) {
      animatedScale[icon.icon] = new Animated.Value(0);
      iconsInfo[icon.icon] = icon;
    }
    this.state = {
      dataSource: this.props.iconData,
      animatedTranslateValue: new Animated.Value(0),
      iconToAnimate: this.props.iconData[0].icon,
      animatedScale,
      iconsInfo,
      iconsToRender: 5,
    };

    this.mustClose = false;
    this.scrollView = null;
    this.endScroll = false;
  }

  componentDidMount() {
    const animatedSequence = [];

    // eslint-disable-next-line
    for (const scale in this.state.animatedScale) {
      animatedSequence.push(
        Animated.spring(this.state.animatedScale[scale], {
          toValue: 1,
          friction: 20,
          tension: 200,
        }),
      );
    }
    Animated.stagger(200, animatedSequence).start();
  }

  @bind
  onScroll({ nativeEvent }) {
    let { iconsToRender } = this.state;
    if (
      nativeEvent.contentOffset.y > 0 &&
      Math.ceil(nativeEvent.contentOffset.y / 200) + 5 > iconsToRender
    ) {
      iconsToRender = Math.floor(nativeEvent.contentOffset.y / 160) + 5;
    }
    if (iconsToRender !== this.state.iconsToRender) {
      this.setState({
        iconsToRender,
      });
    }
    if (
      nativeEvent.contentOffset.y >= 0 &&
      this.state.iconToAnimate !==
        this.props.iconData[Math.ceil(nativeEvent.contentOffset.y / 240)].icon
    ) {
      this.setState({
        ...this.state,
        iconToAnimate: this.props.iconData[
          Math.ceil(nativeEvent.contentOffset.y / 240)
        ].icon,
      });
    }

    if (this.endScroll) {
      this.closingModal();
      this.endScroll = false;
    } else if (nativeEvent.contentOffset.y <= -100 && !this.mustClose) {
      this.mustClose = true;
      this.setState({
        ...this.state,
        animatedTranslateValue: new Animated.Value(nativeEvent.contentOffset.y),
      });
    }
  }

  @bind
  onUnTouch() {
    if (this.mustClose && this.state.animatedTranslateValue._value <= -100) {
      this.mustClose = false;
      this.endScroll = true;
    }
  }

  // eslint-disable-next-line
  pushElementInSequence(animatedSequence, elem) {
    return animatedSequence.push(
      Animated.spring(elem, {
        toValue: 0,
        friction: 20,
        tension: 200,
      }),
    );
  }

  closingModal(icon) {
    const animatedSequence = [];
    const previousScale = [];

    // eslint-disable-next-line
    for (const scale in this.state.animatedScale) {
      if (!icon) {
        this.pushElementInSequence(
          animatedSequence,
          this.state.animatedScale[scale],
        );
      } else if (scale === icon) {
        this.pushElementInSequence(
          animatedSequence,
          this.state.animatedScale[scale],
        );
        if (previousScale.length > 0) {
          this.pushElementInSequence(
            animatedSequence,
            this.state.animatedScale[previousScale[0]],
          );
          if (previousScale[1]) {
            this.pushElementInSequence(
              animatedSequence,
              this.state.animatedScale[previousScale[1]],
            );
          }
        }
      } else if (animatedSequence.length > 0) {
        this.pushElementInSequence(
          animatedSequence,
          this.state.animatedScale[scale],
        );
      }
      if (
        (animatedSequence.length > 3 && !icon) ||
        animatedSequence.length >= 5
      ) {
        break;
      }
      if (previousScale.length <= 1) {
        previousScale.push(scale);
      } else {
        previousScale.shift();
        previousScale.push(scale);
      }
    }
    // animatedSequence.reverse();

    Animated.stagger(200, animatedSequence).start(() => {
      this.props.clickItem(icon);
    });
  }

  @bind
  // eslint-disable-next-line
  keyExtractor(item, index) {
    return `${item.icon}${index}`;
  }

  @bind
  renderRow({ item }) {
    if (item.buyable) {
      return (
        <ModalIconPanelItem
          icon={item}
          style={{
            transform: [
              {
                scale: this.state.animatedScale[item.icon],
              },
            ],
          }}
        />
      );
    }
    return (
      <TouchableOpacity
        onPress={() => {
          if (item.text) {
            this.props.openShop();
          } else {
            this.closingModal(item.icon);
          }
        }}
      >
        <ModalIconPanelItem
          icon={item}
          style={{
            transform: [
              {
                scale: this.state.animatedScale[item.icon],
              },
            ],
          }}
        />
      </TouchableOpacity>
    );
  }

  render() {
    const itemList = [];
    this.state.dataSource.map((icon, index) => {
      if (index < this.state.iconsToRender) itemList.push(icon);
      return true;
    });
    return (
      <StyledContainerBasic>
        <FlatList
          ref={scrollView => {
            this.scrollView = scrollView;
          }}
          data={itemList}
          renderItem={this.renderRow}
          keyExtractor={this.keyExtractor}
          onScroll={this.onScroll}
          showsVerticalScrollIndicator={false}
          initialNumToRender={5}
          onResponderRelease={this.onUnTouch}
          extraData={this.state}
        />
      </StyledContainerBasic>
    );
  }
}

ModalIconPanelItems.propTypes = {
  iconData: arrayOf(
    shape({
      icon: string.isRequired,
      buyable: shape({
        price: string.isRequired,
        color: string.isRequired,
        name: string.isRequired,
      }),
      text: string,
    }),
  ),
  clickItem: func,
  openShop: func.isRequired,
};

ModalIconPanelItems.defaultProps = {
  clickItem: icon => {
    console.log('Item clicked ', icon);
  },
  iconData,
};

export default ModalIconPanelItems;
