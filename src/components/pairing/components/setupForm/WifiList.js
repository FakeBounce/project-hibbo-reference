import React, { PureComponent } from 'react';
import { Animated } from 'react-native';
import { func, shape, string, instanceOf, bool } from 'prop-types';
import styled from 'styled-components/native';
import Config from 'react-native-config';

import appStyles from 'styles/appStyles';

import { StyledContainerBasic } from 'styledComponents/containers';

import Title from '../Title';
import WifiName from './WifiName';

const { IS_BLE_ON } = Config;
const SScrollView = styled.ScrollView`
  flex: 1;
  background-color: transparent;
`;
export const AnimatedScrollView = styled(
  Animated.createAnimatedComponent(SScrollView),
)``;

class WifiList extends PureComponent {
  componentDidMount() {
    if (IS_BLE_ON === 'true') {
      this.props.initBle();
    }
  }

  render() {
    const {
      title,
      setData,
      titleAnimations,
      wifiListAnimations,
      showContent,
      connected,
      scanning,
      scanStatus,
      SSIDs,
    } = this.props;

    return (
      <StyledContainerBasic>
        <Title
          label={[title.label1, title.label2, title.label3]}
          color={appStyles.colors.white}
          animations={titleAnimations}
          showContent={showContent}
        />

        <AnimatedScrollView
          style={{
            opacity: wifiListAnimations.opacity,
            transform: [{ translateY: wifiListAnimations.translateY }],
          }}
        >
          {!connected && <WifiName label="Non connecté" action={setData} />}
          {connected &&
            scanning && <WifiName label="Scanning" action={() => {}} />}
          {connected &&
            scanStatus === 'success' &&
            Array.from(SSIDs.keys()).map((value, index) => {
              return (
                <WifiName
                  key={`${value}${index}`}
                  label={value}
                  action={setData}
                />
              );
            })}
        </AnimatedScrollView>
      </StyledContainerBasic>
    );
  }
}

WifiList.propTypes = {
  setData: func.isRequired,
  title: shape({
    label1: string,
    label2: string,
    label3: string,
  }).isRequired,
  titleAnimations: shape({
    opacity: instanceOf(Animated.Value).isRequired,
    translateY: instanceOf(Animated.Value).isRequired,
    scaleY: instanceOf(Animated.Value).isRequired,
  }).isRequired,
  wifiListAnimations: shape({
    opacity: instanceOf(Animated.Value).isRequired,
    translateY: instanceOf(Animated.Value).isRequired,
  }).isRequired,
  showContent: func.isRequired,
  connected: bool.isRequired,
  scanning: bool.isRequired,
  scanStatus: string.isRequired,
  SSIDs: shape({
    ssid: string,
  }).isRequired,
  initBle: func.isRequired,
};

export default WifiList;
