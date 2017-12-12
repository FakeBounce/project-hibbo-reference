import React, { PureComponent } from 'react';
import { func, string } from 'prop-types';
import { Animated } from 'react-native';
import { bind } from 'decko';

import appStyles from 'styles/appStyles';

import { SAnimatedContainerModal, SModalIconPanelItems } from './styles';

class ModalIconPanel extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      fill: new Animated.Value(0),
      isFilled: false,
    };
  }

  componentDidMount() {
    Animated.timing(this.state.fill, {
      toValue: 1,
      duration: 700,
    }).start(() => {
      this.setState({
        isFilled: true,
      });
    });
  }

  @bind
  exitModalIconPanel(icon) {
    Animated.timing(this.state.fill, {
      toValue: 0,
      duration: 700,
    }).start(() => {
      this.props.action(icon);
    });
  }

  render() {
    return (
      <SAnimatedContainerModal
        style={[
          appStyles.cardStyle,
          {
            backgroundColor: this.state.fill.interpolate({
              inputRange: [0, 1],
              outputRange: [
                this.props.backgroundFill,
                appStyles.colors.darkBlueModal,
              ],
            }),
          },
        ]}
      >
        {this.state.isFilled && (
          <SModalIconPanelItems
            clickItem={this.exitModalIconPanel}
            openShop={this.props.openShop}
          />
        )}
      </SAnimatedContainerModal>
    );
  }
}

ModalIconPanel.defaultProps = {
  backgroundFill: appStyles.colors.buttonGrey,
};

ModalIconPanel.propTypes = {
  action: func.isRequired,
  openShop: func.isRequired,
  backgroundFill: string,
};

// @todo: redo ??
// ModalIconPanel.defaultProps = {
//   action: id => {
//     if (id) {
//       Actions.pop({ refresh: { icon: id } });
//     } else {
//       Actions.pop();
//     }
//   },
// };

export default ModalIconPanel;
