import React, { PureComponent } from 'react';
import { shape, func, bool, string, number, arrayOf } from 'prop-types';
import TypingBubble from './TypingBubble';
import BotBubble from './BotBubble';
import TransfertBubble from './TransfertBubble';
import Date from './DateBubble';
import DefaultTransfertBubble from './DefaultTransfertBubble';

class CustomView extends PureComponent {
  constructor(props) {
    super(props);

    this.updateMessage = this.props.updateMessage;
  }

  render() {
    const {
      isLoading,
      botBubble,
      transfertBubble,
      date,
      onDatePress,
      defaultTransfertBubble,
    } = this.props.currentMessage;

    if (isLoading) {
      return <TypingBubble />;
    } else if (date) {
      return <Date date={date} onDatePress={onDatePress} />;
    } else if (botBubble) {
      return (
        <BotBubble
          {...botBubble}
          isSame={this.props.isSame}
          updateMessage={this.updateMessage}
          currentMessage={this.props.currentMessage}
          position={this.props.position}
        />
      );
    } else if (transfertBubble) {
      return (
        <TransfertBubble
          isSame={this.props.isSame}
          {...transfertBubble}
          updateMessage={this.updateMessage}
          position={this.props.position}
        />
      );
    } else if (defaultTransfertBubble) {
      return (
        <DefaultTransfertBubble
          isSame={this.props.isSame}
          {...defaultTransfertBubble}
          updateMessage={this.updateMessage}
          position={this.props.position}
        />
      );
    }

    return null;
  }
}

CustomView.defaultProps = {
  currentMessage: {},
  updateMessage: () => {
    console.log('UPDATING MESSAGE');
  },
};

CustomView.propTypes = {
  position: string.isRequired,
  isSame: bool.isRequired,
  currentMessage: shape({
    isLoading: bool.isRequired,
    transfertBubble: shape({
      id: string.isRequired,
      animated: bool.isRequired,
      speech: arrayOf(string.isRequired).isRequired,
      width: number.isRequired,
      height: number.isRequired,
    }),
    botBubble: shape({
      id: string.isRequired,
      animated: bool.isRequired,
      speech: string.isRequired,
      width: number.isRequired,
      height: number.isRequired,
    }),
  }),
  updateMessage: func,
};

export default CustomView;
