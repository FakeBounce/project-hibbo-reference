import React, { PureComponent } from 'react';
import { bind } from 'decko';
import { shape, func, arrayOf, number, string } from 'prop-types';
import { getTranslations } from 'utils/i18n';
import FlexibleHeaderLayout from 'shared/components/FlexibleHeaderLayout';
import getNewColorTheme from 'utils/styleGenerator';
import MissionList from './List/MissionList';
import MissionSubHeader from './MissionSubHeader';

class Mission extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      currentMission: 4,
      scrollPosY: 0,
      list: this.props.missionList,
    };
  }

  componentWillMount() {
    if (this.props.missionList.length === 0) {
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
          theme: getNewColorTheme(
            typeof this.props.missionList[0] !== 'undefined'
              ? this.props.missionList[0].theme
              : '',
          ),
        },
        editMode: false,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const newList = [...nextProps.missionList];
    if (nextProps.missionList.length === 0) {
      this.setState(state => ({
        ...state,
        editMode: false,
        list: [],
      }));
    } else {
      newList.sort((b, a) => {
        if (a.status === b.status) return 0;
        if (
          a.status === 'in progress' &&
          (b.status === 'done' || b.status === 'canceled')
        )
          return 1;
        if (a.status === 'done' && b.status === 'canceled') return 1;
        if (a.status === 'done' && b.status === 'in progress') return -1;

        return -1;
      });
      if (newList.length === 1) newList[0].last = true;

      newList[0].added = false;

      if (nextProps.missionList.length > this.props.missionList.length) {
        newList[0].added = true;
      }
      this.setState(state => ({
        ...state,
        list: newList,
      }));
    }
  }

  @bind
  onPressBack() {
    this.props.navigation.goBack(null);
  }

  @bind
  onPressAdd() {
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
        theme: getNewColorTheme(
          typeof this.props.missionList[0] !== 'undefined'
            ? this.props.missionList[0].theme
            : '',
        ),
      },
      editMode: this.state.editMode,
    });
  }

  @bind
  onPressEdit() {
    if (this.state.list.length > 0) {
      this.setState({
        editMode: !this.state.editMode,
      });
    }
  }

  @bind
  onScroll({ nativeEvent }) {
    let { currentMission } = this.state;
    if (
      nativeEvent.contentOffset.y > 0 &&
      Math.ceil(nativeEvent.contentOffset.y / 200) + 4 > currentMission
    ) {
      currentMission = Math.floor(nativeEvent.contentOffset.y / 160) + 4;
    }
    const scrollPosY = nativeEvent.contentOffset.y;
    this.setState({
      scrollPosY,
      currentMission,
    });
  }

  @bind
  disableEdit() {
    this.setState({
      editMode: !this.state.editMode,
    });
  }

  render() {
    const missionList = [];
    this.state.list.map((mission, index) => {
      if (index < this.state.currentMission) missionList.push(mission);
      return true;
    });
    return (
      <FlexibleHeaderLayout
        navigation={this.props.navigation}
        title={getTranslations('mission.menu.homeTitle')}
        onBack={this.onPressBack}
        onScroll={this.onScroll}
        menuChildren={
          <MissionSubHeader
            onPressAdd={this.onPressAdd}
            onPressEdit={this.onPressEdit}
            editMode={this.state.editMode}
          />
        }
        minHeight={100}
        maxHeight={150}
        scrollPosY={this.state.scrollPosY}
      >
        <MissionList
          list={missionList}
          navigation={this.props.navigation}
          editMode={this.state.editMode}
          disableEdit={this.disableEdit}
        />
      </FlexibleHeaderLayout>
    );
  }
}

Mission.propTypes = {
  navigation: shape({
    goBack: func.isRequired,
    navigate: func.isRequired,
  }).isRequired,
  missionList: arrayOf(
    shape({
      amount: number.isRequired,
      completionDate: string,
      creationDate: number.isRequired,
      deadline: number.isRequired,
      icon: string.isRequired,
      id: number.isRequired,
      profileGiver: shape({
        nickname: string.isRequired,
      }).isRequired,
      status: string.isRequired,
      theme: string.isRequired,
      title: string.isRequired,
    }),
  ).isRequired,
};

export default Mission;
