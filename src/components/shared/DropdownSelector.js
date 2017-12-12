import React, { PureComponent } from 'react';
import {
  View,
  Animated,
  Dimensions,
  Easing,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { string, arrayOf, func, bool } from 'prop-types';
import { bind } from 'decko';
import dropdownArrow from 'assets/transfert/dropdownArrow.png';
import dropdownArrowRight from 'assets/transfert/dropdownArrowRight.png';
import { StyledTextSmall } from 'styledComponents/texts';
import { StyledContainerRow } from 'styles/styledComponents/containers';
import InputLabel from './InputLabel';

import * as Styles from './styles';

const margin = 40;
const inputWidth = Dimensions.get('window').width - 2 * margin;
const styles = StyleSheet.create({
  contentContainerStyle: {
    alignItems: 'center',
    marginTop: 10,
  },
});

class DropDownSelector extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      height: new Animated.Value(0),
      opacity: new Animated.Value(0),
      scale: new Animated.Value(0),
      selectedValue: props.value,
    };
  }

  @bind
  onOpen() {
    const { height, opacity, scale } = this.state;

    Animated.timing(height, {
      toValue: 125,
      easing: Easing.elastic(0.8),
    }).start(() => {
      this.setState(
        state => {
          return {
            ...state,
            isOpen: true,
          };
        },
        () => {
          Animated.parallel([
            Animated.timing(opacity, {
              toValue: 1,
            }),
            Animated.timing(scale, {
              toValue: 1,
            }),
          ]).start();
        },
      );
    });
  }

  @bind
  onClose() {
    const { height, opacity, scale } = this.state;

    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
      }),
      Animated.timing(scale, {
        toValue: 0,
      }),
    ]).start(() => {
      this.setState(
        state => {
          return {
            ...state,
            isOpen: false,
          };
        },
        () => {
          Animated.timing(height, {
            toValue: 0,
            easing: Easing.elastic(0.8),
          }).start();
        },
      );
    });
  }

  onSelect(value) {
    const { name } = this.props;

    this.setState(
      state => {
        return {
          ...state,
          selectedValue: value[0],
        };
      },
      () => {
        this.props.onChange(name, value[1]);
        this.onClose();
      },
    );
  }

  render() {
    const { label, list, placeholder, error } = this.props;
    const { opacity, height, isOpen, selectedValue } = this.state;

    return (
      <Styles.SDropdownWrapper>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            if (isOpen) {
              this.onClose();
            } else {
              this.onOpen();
            }
          }}
        >
          <InputLabel label={label} />
          <StyledContainerRow>
            <Styles.SDropDownSelect
              isSelected={selectedValue !== ''}
              hasError={error}
            >
              {selectedValue === '' ? placeholder : selectedValue}
            </Styles.SDropDownSelect>
            <Styles.SDropDownImage
              source={isOpen ? dropdownArrowRight : dropdownArrow}
            />
          </StyledContainerRow>
          <Styles.SBorderInput inputWidth={inputWidth} />
        </TouchableOpacity>

        <Animated.ScrollView
          style={{
            opacity,
            maxHeight: height,
          }}
          contentContainerStyle={styles.contentContainerStyle}
        >
          <View>
            {list.map((l, index) => {
              return (
                <Styles.SDropdownButton
                  key={`${l[1]}${index}`}
                  onPress={() => {
                    this.onSelect(l);
                  }}
                >
                  <StyledTextSmall>{l[0]}</StyledTextSmall>
                </Styles.SDropdownButton>
              );
            })}
          </View>
        </Animated.ScrollView>
      </Styles.SDropdownWrapper>
    );
  }
}

DropDownSelector.propTypes = {
  name: string.isRequired,
  label: string.isRequired,
  value: string.isRequired,
  placeholder: string.isRequired,
  list: arrayOf(arrayOf(string).isRequired).isRequired,
  onChange: func.isRequired,
  error: bool.isRequired,
};

export default DropDownSelector;
