import React from 'react';
import { Animated } from 'react-native';
import {
  string,
  number,
  object,
  arrayOf,
  shape,
  func,
  bool,
  instanceOf,
} from 'prop-types';
import Avatar from './Avatar';
import Total from './Total';
import TotalHOC from './TotalHOC';
import SwitchTirelire from './SwitchTirelire';
import TransactionAmount from './TransactionAmount';
import Add from './Add';
import LastTransaction from './LastTransaction';
import HomeAnimation from './HomeAnimation';
import {
  StyledMainBottomContainer,
  StyledHeaderContainer,
  StyledMainContainer,
} from '../styles';

const TotalExtended = TotalHOC(Total);

const Home = ({
  avatar,
  kids,
  currentKid,
  childId,
  navigation,
  goTo,
  position,
  totalAmount,
  transactions,
  transactionAmount,
  transactionType,
  inTransaction,
  lastTransactionAnimatedValues,
  totalMoveValue,
  transactionAnimationValues,
  onFinishAnimation,
  needHomeAnimation,
  onPress,
  toggleHeader,
  switchMode,
  switchParticles,
  setSwitchMode,
  setSwitchParticles,
  scale,
  dimensions,
}) => {
  return (
    <StyledMainContainer>
      <SwitchTirelire
        switchMode={switchMode}
        setSwitchParticles={setSwitchParticles}
        setSwitchMode={setSwitchMode}
        childId={childId}
        toggleHeader={toggleHeader}
        navigation={navigation}
        onPress={onPress}
        kids={kids}
        currentKid={currentKid}
        avatar={avatar}
        dimensions={dimensions}
      />
      <StyledHeaderContainer />

      <Avatar
        source={avatar}
        position={position}
        onPress={onPress}
        dimensions={dimensions}
        switchMode={switchParticles}
      />

      <StyledMainBottomContainer>
        <TotalExtended
          animatedValues={totalMoveValue}
          amount={totalAmount}
          transactionType={transactionType}
          transactionAmount={transactionAmount}
          action={() => {
            if (transactions.length > 0) navigation.navigate('History');
            else goTo(navigation, 'TransfertStack', { tab: 0 });
          }}
          scale={scale}
        />
        {inTransaction ? (
          <TransactionAmount
            animatedValues={transactionAnimationValues}
            amount={transactionAmount}
            type={transactionType}
          />
        ) : (
          <LastTransaction
            animatedValues={lastTransactionAnimatedValues}
            type={transactions.length > 0 ? transactions[0].type : ''}
            amount={transactions.length > 0 ? transactions[0].amount : 0}
            date={transactions.length > 0 ? transactions[0].date : 0}
            action={() => {
              if (transactions.length > 0) navigation.navigate('History');
              else goTo(navigation, 'TransfertStack', { tab: 0 });
            }}
            scale={scale}
          />
        )}
        {needHomeAnimation ? (
          <HomeAnimation
            action={onFinishAnimation}
            type={transactionType === 'credit' ? 'kangourou' : 'pelican'}
          />
        ) : (
          <Add
            action={() => {
              goTo(navigation, 'TransfertStack', { tab: 0 });
            }}
            scale={scale}
          />
        )}
      </StyledMainBottomContainer>
    </StyledMainContainer>
  );
};

Home.propTypes = {
  goTo: func.isRequired,
  childId: number.isRequired,
  toggleHeader: func.isRequired,
  avatar: string.isRequired,
  totalAmount: number.isRequired,
  transactions: arrayOf(object).isRequired,
  navigation: shape({
    navigate: func.isRequired,
  }).isRequired,
  position: instanceOf(Animated.Value).isRequired,
  transactionAmount: number.isRequired,
  transactionType: string.isRequired,
  inTransaction: bool.isRequired,
  lastTransactionAnimatedValues: shape({
    translateY: instanceOf(Animated.Value),
    opacity: instanceOf(Animated.Value),
    scaleY: instanceOf(Animated.Value),
  }).isRequired,
  totalMoveValue: instanceOf(Animated.Interpolation).isRequired,
  transactionAnimationValues: shape({
    translateY: instanceOf(Animated.Value),
    opacity: instanceOf(Animated.Value),
    scaleY: instanceOf(Animated.Value),
  }).isRequired,
  onFinishAnimation: func.isRequired,
  needHomeAnimation: bool.isRequired,
  setSwitchParticles: func.isRequired,
  onPress: func.isRequired,
  setSwitchMode: func.isRequired,
  switchMode: bool.isRequired,
  switchParticles: bool.isRequired,
  kids: arrayOf(object).isRequired,
  currentKid: shape({
    avatar: string.isRequired,
    childProfileId: number.isRequired,
  }).isRequired,
  scale: instanceOf(Animated.Value).isRequired,
  dimensions: shape({
    holeWrapperWidth: number.isRequired,
    holeWrapperHeight: number.isRequired,
    cardWidth: number.isRequired,
    holeSize: number.isRequired,
  }).isRequired,
};

export default Home;
