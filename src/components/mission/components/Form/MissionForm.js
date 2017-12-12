import React, { PureComponent } from 'react';
import { bind } from 'decko';
import { Keyboard, StyleSheet, Animated, Easing } from 'react-native';
import { string, shape, func, bool, arrayOf } from 'prop-types';
import { getTranslations } from 'utils/i18n';
import { GreyRoundedButton } from 'shared/Button';
import FormDate from './MissionFormDate';
import MissionInput from './MissionInput';
import MissionReward from './MissionReward';
import MissionSelectIcon from './MissionSelectIcon';
import {
  StyledMargedForm,
  StyledSpacedRow,
  SAnimatedCenteredMargedTopSpacedRow,
} from '../../styles';

const styles = StyleSheet.create({
  styleButton: { height: 56, width: 104, marginTop: 70 },
});

let nextInput = null;
let nextInputAmount = null;
class MissionForm extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isFrontFace: false,
    };

    this.animations = {
      dayAnimation: {},
      monthAnimation: {},
      yearAnimation: {},
      titleAnimation: {},
      rewardAnimation: {},
      iconAnimation: {},
      buttonAnimation: {},
    };

    this.resetAnimation();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isFrontFace !== this.state.isFrontFace) {
      this.setState(
        state => ({
          ...state,
          isFrontFace: nextProps.isFrontFace,
        }),
        () => {
          if (nextProps.isFrontFace) {
            Animated.delay(500).start(() => {
              Animated.stagger(70, [
                this.staggeredAnimation(this.animations.dayAnimation),
                this.staggeredAnimation(this.animations.monthAnimation),
                this.staggeredAnimation(this.animations.yearAnimation),
                this.staggeredAnimation(this.animations.titleAnimation),
                this.staggeredAnimation(this.animations.rewardAnimation),
                this.staggeredAnimation(this.animations.iconAnimation),
              ]).start();

              Animated.delay(500).start(() => {
                this.staggeredAnimation(
                  this.animations.buttonAnimation,
                ).start();
              });
            });
          } else {
            this.resetAnimation();
          }
        },
      );
    }
  }

  @bind
  staggeredAnimation({ opacityBorder, opacity, translateY, scaleY }) {
    return Animated.stagger(100, [
      Animated.timing(opacityBorder, {
        toValue: 1,
        duration: 120,
        easing: Easing.in,
      }),
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 90,
          easing: Easing.in,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 270,
          easing: Easing.in(Easing.bounce),
        }),
        Animated.timing(scaleY, {
          toValue: 1,
          duration: 90,
          easing: Easing.in,
        }),
      ]),
    ]);
  }

  @bind
  resetAnimation() {
    Object.keys(this.animations).forEach(key => {
      this.animations[key] = {
        translateY: new Animated.Value(20),
        opacity: new Animated.Value(0),
        opacityBorder: new Animated.Value(0),
        scaleY: new Animated.Value(0),
      };
    });
  }

  render() {
    const {
      label,
      form,
      error,
      name,
      theme,
      icon,
      editMode,
      onChange,
      onAddMission,
      onPress,
    } = this.props;
    return (
      <StyledMargedForm>
        <StyledSpacedRow>
          <FormDate
            day={{
              label: label[0],
              name: name[0],
              error: error.day,
              value: form.day,
              animation: this.animations.dayAnimation,
            }}
            month={{
              label: label[1],
              name: name[1],
              error: error.month,
              value: form.month,
              animation: this.animations.monthAnimation,
            }}
            year={{
              label: label[2],
              name: name[2],
              error: error.year,
              value: form.year,
              animation: this.animations.yearAnimation,
            }}
            onChange={onChange}
            onSubmitEditing={() => {
              nextInput.focus();
            }}
          />
        </StyledSpacedRow>

        <StyledSpacedRow>
          <MissionInput
            value={form.title}
            label={label[3]}
            name={name[3]}
            onChange={onChange}
            error={error.title}
            width={250}
            maxLength={30}
            animation={this.animations.titleAnimation}
            innerRef={element => {
              nextInput = element;
            }}
            onSubmitEditing={() => {
              nextInputAmount.focus();
            }}
          />
        </StyledSpacedRow>
        <StyledSpacedRow>
          <MissionReward
            form={form.amount}
            label={label[4]}
            name={name[4]}
            error={error.amount}
            onChange={onChange}
            animation={this.animations.rewardAnimation}
            innerRef={element => {
              nextInputAmount = element;
            }}
          />
        </StyledSpacedRow>

        <StyledSpacedRow paddingBottom semiRow>
          <MissionSelectIcon
            onPress={() => {
              Keyboard.dismiss();
              onPress();
            }}
            icon={icon}
            theme={theme}
            error={error.icon}
            animation={this.animations.iconAnimation}
          />
        </StyledSpacedRow>

        <SAnimatedCenteredMargedTopSpacedRow
          style={{
            opacity: this.animations.buttonAnimation.opacity,
            transform: [
              { translateY: this.animations.buttonAnimation.translateY },
              { scaleY: this.animations.buttonAnimation.scaleY },
            ],
          }}
        >
          <GreyRoundedButton
            text={
              editMode
                ? getTranslations('mission.edit.label')
                : getTranslations('mission.add.label')
            }
            action={() => {
              Keyboard.dismiss();
              onAddMission();
            }}
            styleButton={styles.styleButton}
          />
        </SAnimatedCenteredMargedTopSpacedRow>
      </StyledMargedForm>
    );
  }
}

MissionForm.defaultProps = {
  editMode: false,
};

MissionForm.propTypes = {
  form: shape({
    day: string.isRequired,
    month: string.isRequired,
    year: string.isRequired,
    title: string.isRequired,
    amount: string.isRequired,
  }).isRequired,
  editMode: bool,
  onChange: func.isRequired,
  onPress: func.isRequired,
  label: arrayOf(string).isRequired,
  name: arrayOf(string).isRequired,
  icon: shape({
    icon: string.isRequired,
    buyable: shape({
      price: string,
      color: string,
      name: string,
    }),
  }).isRequired,
  error: shape({
    day: bool.isRequired,
    month: bool.isRequired,
    year: bool.isRequired,
    title: bool.isRequired,
    amount: bool.isRequired,
    icon: bool.isRequired,
  }).isRequired,
  onAddMission: func.isRequired,
  theme: string.isRequired,
  isFrontFace: bool.isRequired,
};

export default MissionForm;
