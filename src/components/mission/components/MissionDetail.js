import React, { PureComponent } from 'react';
import { bind } from 'decko';
import ms from 'ms';
import { Animated, Dimensions, StyleSheet } from 'react-native';
import { shape, func, string, arrayOf, number, bool } from 'prop-types';
import { getTranslations } from 'utils/i18n';
import getNewColorTheme from 'utils/styleGenerator';
import { daysLeft, videoDimensions } from 'utils/operations';
import Header from 'shared/Header';
import ProgressiveButton from 'shared/components/ProgressiveButton';
import { GreyRoundedButton } from 'shared/Button';
import { StyledContainerCenter } from 'styles/styledComponents/containers';
import LoaderModal from 'shared/LoaderModal';
import appStyles from 'styles/appStyles';
import Toast from '../../shared/Toast';
import {
  StyledWrapperRound,
  StyledDetailContainer,
  StyledDetailTitle,
  StyledDetailRelaunch,
  StyledDetailDeadline,
  StyledDetailIcon,
  StyledDetailAmount,
  StyledDetailRelaunchText,
  StyledDetailToastView,
} from '../styles';

const imageDimensions = videoDimensions(Dimensions.get('window').width);
const height =
  Dimensions.get('window').height - appStyles.cardStyle.borderRadius - 150;
const styles = StyleSheet.create({
  amountWrapper: {
    width: 65,
    height: 37,
  },
  greyButton: {
    width: 117,
    height: 56,
    opacity: 0.3,
    backgroundColor: appStyles.colors.buttonGrey,
    marginBottom: 40,
  },
  maxImageStyle: {
    maxWidth: 240,
    maxHeight: 96,
  },
});
class MissionDetail extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      successMsg: '',
      loader: false,
    };
  }

  componentDidMount() {
    if (this.props.isTransfering) {
      this.props.isInTransfer();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.state.successMsg === '' &&
      nextProps.missions.success !== this.state.successMsg
    ) {
      this.setState(
        {
          successMsg: nextProps.missions.success,
          loader: false,
        },
        Animated.delay(3000).start(() => {
          this.props.missionCompleted();
          this.props.navigation.goBack(null);
          this.props.navigation.goBack(null);
          this.props.navigation.goBack(null);
        }),
      );
    }
    if (nextProps.isTransfering !== this.state.loader) {
      this.setState(state => ({
        ...state,
        loader: nextProps.isTransfering,
      }));
    } else if (
      nextProps.error !== this.props.error &&
      (nextProps.error !== '' ||
        (nextProps.error === '' && nextProps.isTransfering))
    ) {
      this.setState(
        state => ({
          ...state,
          loader: false,
        }),
        () => {
          this.props.isInTransfer();
        },
      );
    }
  }

  @bind
  onPress() {
    if (this.props.navigation.state.params.status === 'in progress') {
      this.setState(
        state => ({
          ...state,
          loader: true,
        }),
        () => {
          this.props.navigation.navigate(
            'MissionPayment',
            this.props.navigation.state.params,
          );
        },
      );
    }
  }

  @bind
  relaunchMission() {
    const { child, parent, missions } = this.props;
    const form = this.props.navigation.state.params;
    if (form.status === 'done') {
      const theme = getNewColorTheme(missions.missions[0].theme);
      // Report time given to the new mission
      const t = new Date();
      // Calculate difference between deadline/creation
      const daysMargin = Math.ceil(
        (form.deadline - form.creationDate) / ms('1d'),
      );
      // Set new deadline date
      t.setDate(t.getDate() + daysMargin);
      const formData = {
        title: form.title,
        icon: form.icon,
        amount: parseFloat(form.amount) * 100,
        deadline: t,
        status: 'in progress',
        creationDate: new Date(),
        theme,
        profileGiverId: parent.id,
        profileAssigneeId: child.id,
      };
      this.props.addMissionToProfile(formData);
      this.props.navigation.goBack(null);
    }
  }

  render() {
    const {
      theme,
      icon,
      status,
      deadline,
      title,
      amount,
    } = this.props.navigation.state.params;
    const { successMsg, loader } = this.state;

    return (
      <StyledWrapperRound style={{ backgroundColor: theme }}>
        {successMsg !== '' && (
          <StyledDetailToastView>
            <Toast
              label={successMsg}
              position="bottom"
              color={appStyles.colors.balanceGreen}
            />
          </StyledDetailToastView>
        )}
        {loader && <LoaderModal />}
        <Header
          navigation={this.props.navigation}
          text={getTranslations('mission.detail.title')}
          showBack
          arrowColor="white"
          textColor="white"
        />
        <StyledDetailContainer sHeight={height}>
          <StyledContainerCenter>
            <StyledDetailIcon
              icon={icon}
              theme={theme}
              imageStyle={[imageDimensions, styles.maxImageStyle]}
            />
            <StyledDetailDeadline
              daysLeft={daysLeft(deadline)}
              status={status}
              printCalendar={false}
              centered
            />
            <StyledDetailTitle>{title}</StyledDetailTitle>
          </StyledContainerCenter>
          <StyledDetailAmount
            amount={amount}
            wrapperStyle={styles.amountWrapper}
          />
          {status === 'done' ? (
            <GreyRoundedButton
              text={getTranslations('mission.detail.paid')}
              action={() => {}}
              styleButton={styles.greyButton}
            />
          ) : (
            <ProgressiveButton
              rounded
              text={getTranslations('mission.detail.pay')}
              action={this.onPress}
              width={117}
            />
          )}
        </StyledDetailContainer>
        <StyledDetailRelaunch>
          <StyledDetailRelaunchText onPress={this.relaunchMission}>
            {getTranslations('mission.detail.relaunch')}
          </StyledDetailRelaunchText>
        </StyledDetailRelaunch>
      </StyledWrapperRound>
    );
  }
}

MissionDetail.propTypes = {
  navigation: shape({
    goBack: func.isRequired,
    navigate: func.isRequired,
    state: shape({
      params: shape({
        theme: string.isRequired,
        title: string.isRequired,
        icon: string.isRequired,
        deadline: number.isRequired,
        status: string.isRequired,
        amount: string.isRequired,
      }),
    }),
  }).isRequired,
  child: shape({
    id: number.isRequired,
  }).isRequired,
  parent: shape({
    id: number.isRequired,
  }).isRequired,
  missions: shape({
    missions: arrayOf(
      shape({
        theme: string.isRequired,
      }),
    ).isRequired,
    success: string.isRequired,
  }).isRequired,
  addMissionToProfile: func.isRequired,
  missionCompleted: func.isRequired,
  isInTransfer: func.isRequired,
  isTransfering: bool.isRequired,
  error: string.isRequired,
};

export default MissionDetail;
