import React, { PureComponent } from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components/native';
import { bind } from 'decko';

import {
  StyledContainerBasic,
  AnimatedContainerModal,
} from 'styledComponents/containers';

import TransactionTicket from './TransactionTicket';

const StyledDetailWrapper = styled.View`
  position: absolute;
  top: 0;
  left: 12.5%;
  width: 75%;
`;

const TransactionTicketHandler = Target => {
  class TransactionTicketHOC extends PureComponent {
    state = {
      detailIsOpen: false,
      translateY: new Animated.Value(-1000),
      opacity: new Animated.Value(0),
      height: 0,
      width: 0,
      transaction: {},
    };

    onLayout(height, width) {
      if (height !== this.state.height) {
        this.setState(
          state => {
            return {
              ...state,
              height,
              width,
            };
          },
          () => {
            this.state.translateY.setValue(-this.state.height);
          },
        );
      }
    }

    @bind
    openModal(transaction) {
      this.setState(
        state => {
          return {
            ...state,
            transaction,
            detailIsOpen: true,
          };
        },
        () => {
          setTimeout(() => {
            this.animateDetailModal(true);
          }, 200);
        },
      );
    }

    @bind
    closeModal() {
      this.animateDetailModal(false);
    }

    animateDetailModal(detailIsOpening) {
      Animated.parallel([
        Animated.timing(this.state.translateY, {
          toValue: detailIsOpening ? 0 : -this.state.height,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(this.state.opacity, {
          toValue: detailIsOpening ? 0.5 : 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        if (!detailIsOpening) {
          this.setState(
            state => {
              return {
                ...state,
                detailIsOpen: false,
              };
            },
            () => {
              this.state.translateY.setValue(-1000);
            },
          );
        }
      });
    }

    render() {
      const { transaction, translateY, detailIsOpen, opacity } = this.state;
      const AnimatedDetailWrapper = Animated.createAnimatedComponent(
        StyledDetailWrapper,
      );

      return (
        <StyledContainerBasic>
          <Target {...this.props} openTransaction={this.openModal} />
          {detailIsOpen && <AnimatedContainerModal style={{ opacity }} />}
          {detailIsOpen && (
            <AnimatedDetailWrapper style={{ transform: [{ translateY }] }}>
              <TransactionTicket
                closeAction={this.closeModal}
                transaction={transaction}
                onLayout={({ nativeEvent: { layout: { height, width } } }) => {
                  this.onLayout(height, width);
                }}
                width={this.state.width}
              />
            </AnimatedDetailWrapper>
          )}
        </StyledContainerBasic>
      );
    }
  }

  return TransactionTicketHOC;
};

export default TransactionTicketHandler;
