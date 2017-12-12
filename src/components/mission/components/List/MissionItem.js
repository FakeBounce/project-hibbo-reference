import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bind } from 'decko';
import { string, number, bool, func, shape } from 'prop-types';
import { daysLeft } from 'utils/operations';
import { Animated, Easing } from 'react-native';
import getNewColorTheme from 'utils/styleGenerator';
import EStyleSheet from 'react-native-extended-stylesheet';
import { deleteMissionFromProfile } from 'actions/missionActions';
import deleteIcon from 'assets/mission/delete-icon.png';
import modifyIcon from 'assets/mission/modify-icon.png';
import TouchableRipple from 'shared/TouchableRipple';
import {
  AnimatedImageModifyIcon,
  StyledTouchableRippleDeleteZone,
  StyledTouchableRippleModifyZone,
  AnimatedViewItem,
} from '../../styles';
import MissionLeftPanel from './MissionLeftPanel';
import MissionRightPanel from './MissionRightPanel';

const styles = EStyleSheet.create({
  modifyZone: {
    width: '100% - 100',
  },
});

class MissionItem extends PureComponent {
  constructor(props) {
    super(props);

    this.opacity = new Animated.Value(0);
    this.paddingLeft = new Animated.Value(30);
    this.removeIconLeft = new Animated.Value(-40);
    this.height = new Animated.Value(225);

    if (this.props.added) {
      this.height = new Animated.Value(0);
    }

    this.state = {
      deleted: this.props.deleted,
      isAnimated: this.props.added, // eslint-disable-line
      overlayOpacity: this.props.added
        ? new Animated.Value(0)
        : new Animated.Value(1),
    };
  }

  componentDidMount() {
    Animated.parallel([
      Animated.timing(this.height, {
        toValue: 225,
        duration: 750,
        easing: Easing.in(Easing.bounce),
      }),
      Animated.timing(this.state.overlayOpacity, {
        toValue: 1,
        duration: 800,
      }),
    ]).start(() => {
      this.setState({
        isAnimated: false, // eslint-disable-line
      });
    });
  }

  componentWillUpdate(nextProps, nextState) {
    if (!nextState.isAnimated) {
      this.animateParallel(nextProps);
    }
    if (nextState.deleted && nextState.deleted !== this.state.deleted) {
      Animated.sequence([
        Animated.parallel([
          Animated.timing(this.state.overlayOpacity, {
            toValue: 0,
            duration: 350,
          }),
          Animated.timing(this.opacity, {
            toValue: 0,
            duration: 350,
          }),
        ]),
        Animated.timing(this.height, {
          toValue: 0,
          duration: 500,
          easing: Easing.in(Easing.bounce),
        }),
      ]).start(() => {
        this.props.deleteMissionFromProfile(this.props.id);
      });
    }
  }

  @bind
  onPressItem() {
    if (this.props.editMode && this.props.status !== 'done') {
      const t = new Date(this.props.deadline);
      const formData = {
        form: {
          ...this.props,
          icon: { icon: this.props.icon },
          amount: this.props.amount.toString(),
          day: t.getDate().toString(),
          month: (t.getMonth() + 1).toString(),
          year: t.getFullYear().toString(),
        },
        editMode: this.props.editMode,
      };
      this.props.disableEdit();
      this.props.navigation.navigate('MissionAdd', formData);
    } else this.props.navigation.navigate('MissionDetail', this.props);
  }

  @bind
  onDeleteItem() {
    if (this.props.editMode) {
      if (this.props.last) {
        this.props.deleteMissionFromProfile(this.props.id);
        this.props.navigation.navigate('MissionAdd', {
          form: {
            id: '',
            status: 'in progress',
            day: '',
            month: '',
            year: '',
            title: '',
            amount: '',
            icon: { icon: '' },
            theme: getNewColorTheme(''),
          },
          editMode: false,
        });
      } else {
        this.setState({
          deleted: true,
          isAnimated: true, // eslint-disable-line
        });
      }
    }
  }

  animateParallel(nextProps) {
    Animated.parallel([
      Animated.spring(this.state.overlayOpacity, {
        toValue: nextProps.editMode ? 0.3 : 1,
      }),
      Animated.spring(this.opacity, {
        toValue: nextProps.editMode ? 1 : 0,
      }),
      Animated.spring(this.paddingLeft, {
        toValue: nextProps.editMode ? 85 : 30,
      }),
      Animated.spring(this.removeIconLeft, {
        toValue: nextProps.editMode ? 40 : -40,
      }),
    ]).start();
  }

  render() {
    const {
      amount,
      status,
      editMode,
      icon,
      theme,
      title,
      deadline,
    } = this.props;
    return (
      <Animated.View style={{ height: this.height }}>
        <StyledTouchableRippleDeleteZone zIndex={editMode ? 55 : 0}>
          <TouchableRipple onPress={this.onDeleteItem}>
            <AnimatedImageModifyIcon
              source={deleteIcon}
              style={{ opacity: this.opacity, left: this.removeIconLeft }}
            />
          </TouchableRipple>
        </StyledTouchableRippleDeleteZone>
        <StyledTouchableRippleModifyZone
          zIndex={editMode ? 55 : 0}
          style={styles.modifyZone}
        >
          <TouchableRipple onPress={this.onPressItem}>
            <AnimatedImageModifyIcon
              source={modifyIcon}
              style={{ opacity: this.opacity, right: this.removeIconLeft }}
            />
          </TouchableRipple>
        </StyledTouchableRippleModifyZone>
        <TouchableRipple onPress={() => this.onPressItem(this.props)}>
          <AnimatedViewItem
            style={[
              {
                height: this.height,
                opacity: this.state.overlayOpacity,
                paddingLeft: this.paddingLeft,
              },
              { backgroundColor: theme },
            ]}
          >
            <MissionLeftPanel
              amount={amount}
              status={status}
              title={title}
              daysLeft={daysLeft(deadline)}
              editMode={editMode}
            />
            {!editMode && (
              <MissionRightPanel status={status} icon={icon} theme={theme} />
            )}
          </AnimatedViewItem>
        </TouchableRipple>
      </Animated.View>
    );
  }
}

MissionItem.defaultProps = {
  deadline: 0,
  deleted: false,
  added: false,
  last: false,
};

MissionItem.propTypes = {
  id: number.isRequired,
  amount: string.isRequired,
  deadline: number,
  icon: string.isRequired,
  status: string.isRequired,
  theme: string.isRequired,
  title: string.isRequired,
  editMode: bool.isRequired,
  deleted: bool,
  added: bool,
  last: bool,
  deleteMissionFromProfile: func.isRequired,
  disableEdit: func.isRequired,
  navigation: shape({
    goBack: func.isRequired,
    navigate: func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = dispatch => {
  return {
    deleteMissionFromProfile: missionId => {
      dispatch(deleteMissionFromProfile(missionId));
    },
  };
};

export default connect(null, mapDispatchToProps)(MissionItem);
