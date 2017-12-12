import React from 'react';
import { shape, func, string, number, bool, oneOf } from 'prop-types';
import appStyles from 'styles/appStyles';

import { StyledFullContainerCenter } from 'styledComponents/containers';
import Back from 'shared/Back';
import {
  StyledHeaderWrapper,
  StyledHeaderCenter,
  StyledHeaderText,
  StyledHeaderTextWrapper,
  StyledHeaderCrossWrapper,
} from './styles';

const Header = ({
  navigation,
  text,
  cross,
  backAction,
  showBack,
  arrowColor,
  textColor,
  arrowType,
  isFullscreen,
}) => {
  return (
    <StyledHeaderWrapper isFullscreen={isFullscreen}>
      <StyledFullContainerCenter>
        {showBack && (
          <Back
            color={arrowColor}
            type={arrowType}
            action={() => {
              if (backAction) {
                backAction();
              } else {
                navigation.goBack();
              }
            }}
          />
        )}
      </StyledFullContainerCenter>
      <StyledHeaderCenter showBack={showBack}>
        {text !== '' && (
          <StyledHeaderTextWrapper>
            <StyledHeaderText color={textColor} flip={arrowType === 'flip'}>
              {text}
            </StyledHeaderText>
          </StyledHeaderTextWrapper>
        )}
      </StyledHeaderCenter>
      <StyledFullContainerCenter>
        {cross > 0 && (
          <StyledHeaderCrossWrapper>
            <Back
              color={arrowColor}
              type="cross"
              action={() => {
                for (let i = 0; i < cross; ++i) {
                  navigation.goBack(null);
                }
              }}
            />
          </StyledHeaderCrossWrapper>
        )}
      </StyledFullContainerCenter>
    </StyledHeaderWrapper>
  );
};

Header.defaultProps = {
  text: '',
  cross: 0,
  backAction: null,
  showBack: true,
  arrowColor: 'black',
  textColor: appStyles.colors.primary,
  arrowType: 'straight',
  navigation: null,
  isFullscreen: false,
};

Header.propTypes = {
  navigation: shape({
    dispatch: func.isRequired,
    goBack: func.isRequired,
    navigate: func.isRequired,
    setParams: func.isRequired,
    state: shape({
      key: string.isRequired,
      routeName: string.isRequired,
    }).isRequired,
  }),
  arrowType: oneOf(['straight', 'cross', 'flip']),
  text: string,
  cross: number,
  backAction: func,
  showBack: bool,
  arrowColor: oneOf(['black', 'white', 'yellow']),
  textColor: string,
  isFullscreen: bool,
};
export default Header;
