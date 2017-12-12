import React, { PureComponent } from 'react';
import { Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { func, shape, number, string } from 'prop-types';
import { bind } from 'decko';
import uuid from 'uuid/v4';
import { NavigationActions } from 'react-navigation';
import styled from 'styled-components/native';

import { editChildProfile } from 'actions/profileActions';
import { createPiggyBank } from 'actions/piggyBankActions';
import { selectBackground } from 'actions/appActions';

import { getTranslations, getLanguage } from 'utils/i18n';
import defaultAvatarToChange from 'utils/defaultAvatars';

import isValidDate from 'utils/dateValidation';

import { StyledContainerBasic } from 'styledComponents/containers';

import Toast from 'shared/Toast';

const SWrapper = styled.View`
  position: absolute;
  top: 25px;
  left: 25px;
  z-index: 10;
`;

const SetupHOCHandler = Target => {
  class SetupHOC extends PureComponent {
    state = {
      step: 0,
      hasError: false,
      errorMessage: '',
      changingStep: '',
      type: '', // eslint-disable-line
      error: false,
      monimalzType: '',
      created: false,
      form: {
        wifiName: '',
        wifiPwd: '',
        gender: '',
        name: '',
        picture: '',
        birthdayDay: '',
        birthdayMonth: '',
        birthdayYear: '',
      },
      title: {
        label1: '',
        label2: '',
        label3: '',
        label4: '',
      },
      controls: {
        leftLabel: '',
        rightLabel: '',
      },
    };

    componentWillReceiveProps(nextProps) {
      if (
        this.props.currentPiggy !== nextProps.currentPiggy &&
        nextProps.currentPiggy &&
        nextProps.currentPiggy.id
      ) {
        this.setState(state => {
          return {
            ...state,
            created: true,
          };
        });
      }
      if (
        (this.props.piggyError !== nextProps.piggyError &&
          nextProps.piggyError !== '') ||
        (this.props.profileError !== nextProps.profileError &&
          nextProps.profileError !== '')
      ) {
        this.setState(state => {
          return {
            ...state,
            hasError: true,
            errorMessage:
              nextProps.profileError !== ''
                ? nextProps.profileError
                : nextProps.piggyError,
          };
        });
      }
    }

    setDataAction(name, value) {
      this.setState(
        state => {
          return {
            ...state,
            error: false,
            form: {
              ...state.form,
              [name]: value,
            },
          };
        },
        () => {
          if (name === 'wifiName' || name === 'gender' || name === 'picture') {
            this.changeStep();
          }
        },
      );
    }

    @bind
    setData(name, value, buttonClicked = '') {
      if (buttonClicked !== '' && value !== '') {
        this.props.controlsClick(buttonClicked, () => {
          this.setDataAction(name, value);
        });
      } else {
        this.setDataAction(name, value);
      }
    }

    @bind
    changeStep(direction = 'forward') {
      Keyboard.dismiss();
      this.setState(state => {
        return {
          ...state,
          changingStep: direction,
        };
      });
    }

    calcStepCount(pic, step, direction) {
      if (pic === '' && step === 5 && direction === 'forward') {
        return step + 2;
      } else if (pic === '' && step === 7 && direction === 'backward') {
        return step - 2;
      } else if (direction === 'backward') {
        return step - 1;
      }

      return step + 1;
    }

    @bind
    navigate(direction = 'forward') {
      this.setState(
        state => {
          return {
            ...state,
            changingStep: '',
            step: this.calcStepCount(state.form.picture, state.step, direction),
          };
        },
        () => {
          this.changeScreen();
        },
      );
    }

    @bind
    validate(name) {
      const { form, monimalzType } = this.state;

      if (
        ((name === 'wifiPwd' || name === 'name') && form[name] !== '') ||
        name === 'pictureConfirm' ||
        name === 'picture'
      ) {
        this.props.controlsClick('right', this.changeStep);
      } else if (
        name === 'birthday' &&
        form.birthdayDay !== '' &&
        form.birthdayMonth !== '' &&
        form.birthdayYear.length === 4 &&
        isValidDate(
          form.birthdayDay,
          form.birthdayMonth,
          form.birthdayYear,
          true,
        )
      ) {
        this.props.controlsClick('right', () => {
          this.props.selectBackground(
            monimalzType === 'monkey' ? 6 : monimalzType === 'panda' ? 1 : 2, // eslint-disable-line
          );
          this.registerChild();
          this.changeStep();
        });
      } else {
        this.setState(state => {
          return {
            ...state,
            error: true,
          };
        });
      }
    }

    saveNewScreen(label1, label2, label3, label4, rightLabel, leftLabel = '') {
      this.setState(state => {
        return {
          ...state,
          title: {
            label1,
            label2,
            label3,
            label4,
          },
          controls: {
            leftLabel,
            rightLabel,
          },
        };
      });
    }

    changeScreen() {
      const { step, form } = this.state;

      switch (step) {
        case 1:
          return this.saveNewScreen(
            getTranslations(`pairing.title${step}.label1`),
            getTranslations(`pairing.title${step}.label2`),
            getTranslations(`pairing.title${step}.label3`),
            '',
            getTranslations('pairing.step1.button'),
          );
        case 2:
          return this.saveNewScreen(
            getTranslations(`pairing.title${step}.label1`),
            getTranslations(`pairing.title${step}.label2`),
            getTranslations(`pairing.title${step}.label3`),
            getTranslations(`pairing.title${step}.label4`),
            getTranslations('pairing.step2.button'),
          );
        case 3:
          return this.saveNewScreen(
            getTranslations(`pairing.title${step}.label1`),
            getTranslations(`pairing.title${step}.label2`),
            getTranslations(`pairing.title${step}.label3`),
            getTranslations(`pairing.title${step}.label4`),
            getTranslations('pairing.step3.button2'),
            getTranslations('pairing.step3.button1'),
          );
        case 4:
          if (form.gender === 'female') {
            return this.saveNewScreen(
              getTranslations('pairing.title4.label1'),
              getTranslations('pairing.title4.label3'),
              '',
              '',
              getTranslations('pairing.step4.button'),
            );
          }
          return this.saveNewScreen(
            getTranslations('pairing.title4.label2'),
            getTranslations('pairing.title4.label3'),
            '',
            '',
            getTranslations('pairing.step4.button'),
          );
        case 5:
          if (form.gender === 'female') {
            return this.saveNewScreen(
              getTranslations('pairing.title5.label1'),
              getTranslations('pairing.title5.label3'),
              `${this.state.form.name} ?`,
              '',
              getTranslations('pairing.step4.button'),
            );
          }
          return this.saveNewScreen(
            getTranslations('pairing.title5.label2'),
            getTranslations('pairing.title5.label3'),
            `${this.state.form.name} ?`,
            '',
            getTranslations('pairing.step4.button'),
          );
        case 6:
          if (form.gender === 'female') {
            return this.saveNewScreen(
              getTranslations('pairing.title6.label1'),
              `${this.state.form.name} !`,
              '',
              '',
              getTranslations('pairing.step6.button'),
            );
          }
          return this.saveNewScreen(
            getTranslations('pairing.title6.label2'),
            `${this.state.form.name} !`,
            '',
            '',
            getTranslations('pairing.step6.button'),
          );
        case 7:
          if (form.gender === 'female') {
            return this.saveNewScreen(
              getTranslations('pairing.title7.label1'),
              getTranslations('pairing.title7.label3'),
              '',
              '',
              getTranslations('pairing.step4.button'),
            );
          }
          return this.saveNewScreen(
            getTranslations('pairing.title7.label2'),
            getTranslations('pairing.title7.label3'),
            '',
            '',
            getTranslations('pairing.step4.button'),
          );
        case 8:
          return this.saveNewScreen(
            getTranslations('pairing.title8.label1'),
            getTranslations('pairing.title8.label2'),
            getTranslations('pairing.title8.label3'),
            '',
            getTranslations('pairing.step8.button1'),
            getTranslations('pairing.step8.button2'),
          );
        default:
          return null;
      }
    }

    @bind
    selectMonimalzType(monimalzType) {
      this.setState(state => {
        return {
          ...state,
          monimalzType,
        };
      });
    }

    redirectAction(gift, scanCard) {
      if (gift) {
        this.props.navigation.navigate('InitialCardScanner', {
          scanCard,
          isInitial: true,
        });
      } else {
        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Swiper' })],
        });

        this.props.navigation.dispatch(resetAction);
      }
    }

    @bind
    redirect(gift = true, scanCard = true, buttonClicked = '') {
      const { hasError } = this.state;

      if (!hasError) {
        if (buttonClicked !== '') {
          this.props.controlsClick(buttonClicked, () => {
            this.redirectAction(gift, scanCard);
          });
        } else {
          this.redirectAction(gift, scanCard);
        }
      } else {
        this.setState(state => {
          return {
            ...state,
            errorMessage: getTranslations('pairing.creation.error'),
          };
        });
      }
    }

    @bind
    registerChild() {
      const {
        monimalzType,
        form: {
          name,
          gender,
          picture,
          birthdayDay,
          birthdayMonth,
          birthdayYear,
        },
      } = this.state;
      const date = new Date(birthdayYear, birthdayMonth - 1, birthdayDay);
      const profileChild = {
        nickname: name,
        avatar: picture !== '' ? picture : defaultAvatarToChange,
        sexe: gender,
        bdate: date,
        language: getLanguage(),
      };
      const data = {
        uuid: uuid(),
        type: monimalzType,
        profileChild,
      };

      if (!this.state.created) {
        this.props.createPiggyBank(data);
      } else {
        this.props.editChildProfile(profileChild);
      }
    }

    render() {
      const {
        step,
        changingStep,
        error,
        title,
        controls,
        form,
        errorMessage,
      } = this.state;

      return (
        <StyledContainerBasic>
          <SWrapper>
            {errorMessage !== '' && (
              <Toast label={errorMessage} position="top" hideDelay={5000} />
            )}
          </SWrapper>
          <Target
            {...this.props}
            step={step}
            changingStep={changingStep}
            error={error}
            form={form}
            setData={this.setData}
            changeStep={this.changeStep}
            navigate={this.navigate}
            validate={this.validate}
            title={title}
            controls={controls}
            registerChild={this.registerChild}
            selectMonimalzType={this.selectMonimalzType}
            redirect={this.redirect}
          />
        </StyledContainerBasic>
      );
    }
  }

  SetupHOC.propTypes = {
    createPiggyBank: func.isRequired,
    editChildProfile: func.isRequired,
    navigation: shape({
      navigate: func.isRequired,
    }).isRequired,
    currentPiggy: shape({
      id: number,
      uuid: string,
    }).isRequired,
    controlsClick: func.isRequired,
    selectBackground: func.isRequired,
    profileError: string.isRequired,
    piggyError: string.isRequired,
  };

  const mapStateToProps = state => {
    return {
      currentPiggy: state.piggyBank.currentPiggy,
      profileError: state.profile.error,
      piggyError: state.piggyBank.error,
    };
  };

  const mapDispatchToProps = dispatch => {
    return {
      createPiggyBank: data => {
        dispatch(createPiggyBank(data));
      },
      editChildProfile: data => {
        dispatch(editChildProfile(data));
      },
      selectBackground: value => {
        dispatch(selectBackground(value));
      },
    };
  };

  return connect(mapStateToProps, mapDispatchToProps)(SetupHOC);
};

export default SetupHOCHandler;
