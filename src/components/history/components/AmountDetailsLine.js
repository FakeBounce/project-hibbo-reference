import React from 'react';
import { StyleSheet } from 'react-native';
import { string, bool } from 'prop-types';

import TouchableRipple from 'shared/TouchableRipple';

import { StyledTextXSmall } from 'styles/styledComponents/texts';
import { getTranslations } from 'utils/i18n';

import theme from 'styles/appStyles';

import {
  SAmountLine,
  SAmountTitle,
  SAmountCount,
  SAmountTransfert,
} from '../styles';

const styles = StyleSheet.create({
  border: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey,
  },
});

const AmountDetailsLine = ({ label, amount, isTransferable }) => {
  return (
    <SAmountLine>
      <SAmountTitle>
        <StyledTextXSmall>{label}</StyledTextXSmall>
      </SAmountTitle>
      <SAmountCount>
        <StyledTextXSmall>{amount}</StyledTextXSmall>
      </SAmountCount>
      <SAmountTransfert>
        {isTransferable && (
          <TouchableRipple
            onPress={() => console.log('Redirect to settings')}
            style={styles.border}
          >
            <StyledTextXSmall>
              {getTranslations('history.transfert')}
            </StyledTextXSmall>
          </TouchableRipple>
        )}
      </SAmountTransfert>
    </SAmountLine>
  );
};

AmountDetailsLine.defaultProps = {
  isTransferable: false,
};

AmountDetailsLine.propTypes = {
  label: string.isRequired,
  amount: string.isRequired,
  isTransferable: bool,
};

export default AmountDetailsLine;
