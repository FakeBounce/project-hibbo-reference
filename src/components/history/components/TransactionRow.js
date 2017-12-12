import React from 'react';
import { number, string, shape, func } from 'prop-types';
import dateFormat from 'dateformat';

import appStyles from 'styles/appStyles';

import { getTrueNumber, getTranslations } from 'utils/i18n';

import { StyledTextSmall } from 'styles/styledComponents/texts';

import GiftedAvatar from 'shared/chat/GiftedAvatar';
import TouchableRipple from 'shared/TouchableRipple';

import * as Styles from '../styles';

const renderText = (message, theme, profileGiver) => {
  if (theme !== '') {
    return getTranslations('history.row.mission');
  } else if (message !== '') {
    return message;
  }
  const firstname = profileGiver ? profileGiver.firstname : 'Momo';
  const lastname = profileGiver ? profileGiver.lastname : 'Monimalz';

  return `${firstname} ${lastname}`;
};

const TransactionRow = ({
  amount,
  date,
  message,
  theme,
  type,
  profileGiver,
  notification,
  action,
}) => {
  const transaction = {
    date,
    amount,
    type,
    profileGiver,
    notification,
  };
  const firstname = profileGiver ? profileGiver.firstname : 'Momo';
  const avatar = profileGiver ? profileGiver.avatar : null;

  return (
    <TouchableRipple
      onPress={() => {
        action(transaction);
      }}
    >
      <Styles.StyledContainerTransaction>
        <Styles.StyledLeftSide>
          <GiftedAvatar user={{ name: firstname, avatar }} />
        </Styles.StyledLeftSide>
        <Styles.StyledMiddle>
          <StyledTextSmall>
            {renderText(message, theme, profileGiver)}
          </StyledTextSmall>
          <Styles.StyledTextSubTitle>
            {`${getTranslations('history.date.from')} ${dateFormat(
              date * 1000,
              'dd.mm.yy',
            )}`}
          </Styles.StyledTextSubTitle>
        </Styles.StyledMiddle>
        <Styles.StyledRightSide>
          <Styles.StyledTextAmount>
            {`${getTrueNumber(amount, type)}`}
          </Styles.StyledTextAmount>
        </Styles.StyledRightSide>
      </Styles.StyledContainerTransaction>
    </TouchableRipple>
  );
};

TransactionRow.defaultProps = {
  message: '',
  theme: '',
  notification: {
    // TODO: Set default icon
    icon: appStyles.icons.rainy_blanc,
    message: '',
  },
  profileGiver: null,
};

TransactionRow.propTypes = {
  amount: number.isRequired,
  date: number.isRequired,
  message: string,
  theme: string,
  type: string.isRequired,
  profileGiver: shape({
    firstname: string.isRequired,
    lastname: string.isRequired,
    avatar: string,
  }),
  notification: shape({
    icon: string,
    message: string,
  }),
  action: func.isRequired,
};

export default TransactionRow;
