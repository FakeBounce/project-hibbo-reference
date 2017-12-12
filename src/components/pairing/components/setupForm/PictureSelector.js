import React, { PureComponent } from 'react';
import { string, func, number } from 'prop-types';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer'; // eslint-disable-line
import { bind } from 'decko';

import { getTranslations } from 'utils/i18n';

import avatarDefault from 'assets/pairing/avatarDefault.png';

import lines from 'assets/pairing/lines.png';
import cross from 'assets/pairing/cross.png';
import circle from 'assets/pairing/circle.png';

import * as Styles from './styles';

class PictureSelector extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      source: this.props.picture,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.userPicture !== nextProps.userPicture &&
      nextProps.userPicture !== ''
    ) {
      this.setState(
        state => {
          return {
            ...state,
            source: nextProps.userPicture,
          };
        },
        () => {
          this.props.clearUserPicture();
        },
      );
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.source !== nextState.source && nextState.source !== '') {
      this.props.setData('picture', nextState.source);
    }
  }

  @bind
  selectImage() {
    const options = {
      title: getTranslations('pairing.selectPic'),
      cancelButtonTitle: getTranslations('pairing.cancel'),
      takePhotoButtonTitle: getTranslations('pairing.takePic'),
      chooseFromLibraryButtonTitle: getTranslations('pairing.selectFromPic'),
      allowsEditing: true,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      customButtons: [
        { name: 'skip', title: getTranslations('pairing.noPic') },
      ],
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.customButton) {
        this.props.validate('picture');
      } else if (response.uri) {
        this.props.selectUserPicture(response.uri);
      }
    });
  }

  render() {
    const { step } = this.props;

    return (
      <Styles.SButtonPic onPress={this.selectImage} activeOpacity={1}>
        <Styles.SLinesPic source={lines} />
        <Styles.SCrossPic source={cross} />
        <Styles.SCirclePic source={circle} />

        {step === 5 ? (
          <Styles.SImagePic source={avatarDefault} />
        ) : (
          <Styles.SImagePic source={{ uri: this.state.source }} />
        )}
      </Styles.SButtonPic>
    );
  }
}

PictureSelector.propTypes = {
  setData: func.isRequired,
  picture: string.isRequired,
  selectUserPicture: func.isRequired,
  clearUserPicture: func.isRequired,
  userPicture: string.isRequired,
  validate: func.isRequired,
  step: number.isRequired,
};

export default PictureSelector;
