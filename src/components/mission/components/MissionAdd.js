import React, { PureComponent } from 'react';
import { bind } from 'decko';
import { Keyboard, Animated } from 'react-native';
import { shape, func, number, arrayOf, string } from 'prop-types';
import { getTranslations } from 'utils/i18n';
import ModalIconPanel from 'shared/ModalIconPanel';
import Header from 'shared/Header';
import { StyledContainerDeepBlue } from 'styles/styledComponents/containers';
import Toast from 'shared/Toast';
import getNewColorTheme from 'utils/styleGenerator';
import isValidDate from 'utils/dateValidation';
import MissionForm from './Form/MissionForm';
import { SMissionAddToast, StyledAddTouchableOpacity } from '../styles';

class MissionAdd extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      label: [
        getTranslations('mission.label.expiracyDay'),
        getTranslations('mission.label.expiracyMonth'),
        getTranslations('mission.label.expiracyYear'),
        getTranslations('mission.label.title'),
        getTranslations('mission.label.amount'),
      ],
      name: ['day', 'month', 'year', 'title', 'amount'],
      form:
        typeof this.props.navigation.state.params !== 'undefined'
          ? this.props.navigation.state.params.form
          : {
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
      error: {
        day: false,
        month: false,
        year: false,
        title: false,
        icon: false,
        amount: false,
      },
      bgModalOpen: false,
      editMode: false,
      errorMsg: '',
      showError: false,
      isFrontFace: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const navigationParams = nextProps.navigation.state.params;
    if (typeof navigationParams !== 'undefined') {
      if (this.state.form !== navigationParams.form) {
        this.setState(state => ({
          ...state,
          editMode:
            state.editMode !== navigationParams.editMode
              ? navigationParams.editMode
              : state.editMode,
          form: navigationParams.form,
          isFrontFace: true,
        }));
      }
    }
  }

  @bind
  onChange(name, text) {
    if (name === 'bgModalOpen') {
      this.setState({
        bgModalOpen: !this.state.bgModalOpen,
      });
    } else {
      if (name === 'icon' && typeof text.icon === 'undefined') {
        text = { icon: '' }; // eslint-disable-line
      }

      this.setState(state => {
        return {
          ...state,
          error: {
            ...state.error,
            [name]: false,
          },
          form: {
            ...state.form,
            [name]: text,
          },
          errorMsg: '',
          showError: false,
        };
      });
    }
  }

  @bind
  onPress() {
    this.onChange('bgModalOpen', !this.state.bgModalOpen);
  }

  onAddMission() {
    const { child, parent } = this.props;
    const { form } = this.state;
    const icon = form.icon.icon.split('_')[0];
    let formData = {
      title: form.title,
      icon,
      amount: parseFloat(form.amount) * 100,
      deadline: new Date(form.year, form.month - 1, form.day),
      status: 'in progress',
    };
    this.setState(state => ({
      ...state,
      isFrontFace: false,
    }));
    if (!this.state.editMode) {
      formData = {
        ...formData,
        creationDate: new Date(),
        theme: this.state.form.theme,
        profileGiverId: parent.id,
        profileAssigneeId: child.id,
      };
      this.props.addMissionToProfile(formData);
      this.props.navigation.goBack(null);
    } else {
      formData.id = form.id;
      this.props.editMissionFromProfile(formData);
      this.props.navigation.goBack(null);
    }
  }

  @bind
  validate() {
    const { form } = this.state;
    let isValid = true;
    let text = '';
    if (!isValidDate(form.day, form.month, form.year)) {
      text += `${getTranslations('mission.add.dateError')}`;
      isValid = false;
      this.toggleError('day');
      this.toggleError('month');
      this.toggleError('year', text);
    }
    if (form.title === '') {
      text += isValid
        ? `${getTranslations('mission.add.titleError')}`
        : `\r${getTranslations('mission.add.titleError')}`;
      isValid = false;
      this.toggleError('title', text);
    }
    if (form.amount === 0 || form.amount === '') {
      text += isValid
        ? `${getTranslations('mission.add.amountError')}`
        : `\r${getTranslations('mission.add.amountError')}`;
      isValid = false;
      this.toggleError('amount', text);
    }
    if (form.icon === '' || form.icon.icon === '') {
      text += isValid
        ? `${getTranslations('mission.add.iconError')}`
        : `\r${getTranslations('mission.add.iconError')}`;
      isValid = false;
      this.toggleError('icon', text);
    }
    if (isValid) this.onAddMission();
  }

  toggleError(name, text) {
    this.setState(
      state => {
        return {
          ...state,
          error: {
            ...state.error,
            [name]: true,
          },
          errorMsg: text,
          showError: true,
        };
      },
      Animated.delay(2500).start(() => {
        this.setState(state => {
          return {
            ...state,
            error: {
              ...state.error,
              [name]: false,
            },
            errorMsg: '',
            showError: false,
          };
        });
      }),
    );
  }

  render() {
    const { form, bgModalOpen, editMode, showError, errorMsg } = this.state;
    return (
      <StyledContainerDeepBlue style={{ backgroundColor: form.theme }}>
        {bgModalOpen && (
          <ModalIconPanel
            action={getIcon => {
              this.onChange('icon', { icon: getIcon });
              this.onChange('bgModalOpen', !bgModalOpen);
            }}
            openShop={() => {
              this.props.navigation.navigate('Shop');
            }}
            backgroundFill={form.theme}
          />
        )}
        <Header
          navigation={this.props.navigation}
          text={
            editMode
              ? getTranslations('mission.edit.title')
              : getTranslations('mission.add.title')
          }
          arrowType="flip"
          showBack
          arrowColor="white"
          textColor="white"
          backAction={() => {
            Keyboard.dismiss();
            this.setState({
              editMode: false,
              error: {
                day: false,
                month: false,
                year: false,
                title: false,
                amount: false,
                icon: false,
              },
              isFrontFace: false,
            });
            this.props.navigation.goBack(null);
          }}
        />
        <StyledAddTouchableOpacity activeOpacity={1} onPress={Keyboard.dismiss}>
          <MissionForm
            {...this.state}
            onChange={this.onChange}
            onPress={this.onPress}
            navigation={this.props.navigation}
            icon={form.icon}
            onAddMission={this.validate}
            theme={form.theme}
          />
        </StyledAddTouchableOpacity>
        {showError &&
          errorMsg && (
            <SMissionAddToast>
              <Toast label={errorMsg} position="top" />
            </SMissionAddToast>
          )}
      </StyledContainerDeepBlue>
    );
  }
}

MissionAdd.propTypes = {
  navigation: shape({
    goBack: func.isRequired,
    navigate: func.isRequired,
    state: shape({
      params: shape({
        id: number,
        status: string,
        day: string,
        month: string,
        year: string,
        title: string,
        amount: string,
        icon: shape({
          icon: string,
        }),
        theme: string,
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
    missions: arrayOf(shape({})),
  }).isRequired,
  addMissionToProfile: func.isRequired,
  editMissionFromProfile: func.isRequired,
};

export default MissionAdd;
