import React from 'react';
import { func, oneOfType, string, number } from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';

import { StyledContainerBasic } from 'styles/styledComponents/containers';

import Back from 'shared/Back';
import { UserPicture } from 'shared/UserPicture';

import * as Styles from '../styles';

const styles = EStyleSheet.create({
  $avatarSize: 50,
  avatar: {
    width: '$avatarSize',
    height: '$avatarSize',
    borderRadius: '$avatarSize / 2',
  },
});

const Header = ({ backAction, avatar }) => {
  return (
    <Styles.StyledContainer>
      <StyledContainerBasic>
        <Styles.StyledButton>
          <Back type="flip" action={backAction} />
        </Styles.StyledButton>
      </StyledContainerBasic>
      <Styles.StyledCentered>
        <UserPicture source={avatar} style={styles.avatar} />
      </Styles.StyledCentered>
      <StyledContainerBasic />
    </Styles.StyledContainer>
  );
};

Header.propTypes = {
  backAction: func.isRequired,
  avatar: oneOfType([string, number]).isRequired,
};

export default Header;
