import React, { PureComponent } from 'react';
import {
  string,
  func,
  shape,
  bool,
  oneOfType,
  object,
  number,
  array,
} from 'prop-types';
import { getTranslations } from 'utils/i18n';
import appStyles from 'styles/appStyles';

import { SContainerInput, SInput } from '../styles';

class Input extends PureComponent {
  constructor(props) {
    super(props);
    this.inputText = null;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.label !== nextProps.label) {
      this.inputText.focus();
    }
  }

  getKeyboardType = label => {
    switch (label) {
      case getTranslations('auth.label.email'):
        return 'email-address';
      case getTranslations('auth.label.phone'):
        return 'phone-pad';
      default:
        return 'default';
    }
  };

  getReturnKeyType = label => {
    if (label === getTranslations('auth.label.confirmpassword')) return 'done';
    return 'next';
  };

  getAutoCapitalize = label => {
    if (
      label === getTranslations('auth.label.firstname') ||
      label === getTranslations('auth.label.lastname')
    )
      return 'sentences';
    return 'none';
  };

  getResChange(text, keyboardType) {
    let res = text;
    if (keyboardType !== 'default') {
      res = text.replace(/\s/g, '');
    }
    if (keyboardType === 'phone-pad') {
      res = res.replace(/[-|.|(|)]/g, '');
    }
    return res;
  }

  needSecurity(label) {
    return (
      label === getTranslations('auth.label.password') ||
      label === getTranslations('auth.label.confirmpassword')
    );
  }

  render() {
    const {
      form,
      label,
      name,
      onChange,
      validate,
      error,
      title,
      hide,
      autoFocus,
      inputTextSize,
      inputStyle,
    } = this.props;
    const keyboardType = this.getKeyboardType(label);

    return (
      <SContainerInput>
        <SInput
          key={keyboardType}
          innerRef={ref => {
            this.inputText = ref;
          }}
          value={form[name]}
          autoCapitalize={this.getAutoCapitalize(label)}
          autoCorrect={false}
          autoFocus={autoFocus}
          keyboardType={keyboardType}
          onChangeText={text => {
            onChange(name, this.getResChange(text, keyboardType));
          }}
          onSubmitEditing={() => validate(title)}
          placeholder={label}
          placeholderTextColor={
            error ? appStyles.red : appStyles.toggleButtonGrey
          }
          returnKeyType={this.getReturnKeyType(label)}
          secureTextEntry={this.needSecurity(label) && hide}
          inputTextSize={inputTextSize}
          style={inputStyle}
          underlineColorAndroid="transparent"
        />
      </SContainerInput>
    );
  }
}

Input.defaultProps = {
  hide: false,
  inputStyle: {
    height: 75,
    marginTop: 90,
  },
  autoFocus: true,
};

Input.propTypes = {
  inputStyle: oneOfType([object, number, array]),
  hide: bool,
  autoFocus: bool,
  name: string.isRequired,
  label: string.isRequired,
  onChange: func.isRequired,
  validate: func.isRequired,
  form: shape({
    email: string,
    firstName: string,
    lastName: string,
    pwd: string,
  }).isRequired,
  error: bool.isRequired,
  title: string.isRequired,
  inputTextSize: number.isRequired,
};

export default Input;
