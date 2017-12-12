import React from 'react';
import { func, shape, array, string } from 'prop-types';
import { getTranslations } from 'utils/i18n';
import {
  SConfirmDebitView,
  SConfirmTextBig,
  SConfirmTextSmall,
} from '../../styles';
import VerticalSlider from './VerticalSlider';
import AccountNumber from './AccountNumber';
import AvatarDebit from './AvatarDebit';
import AvatarDebitHOC from './AvatarDebitHOC';

const AvatarDebitExtended = AvatarDebitHOC(AvatarDebit);
let avatarPulsed = null;

const ConfirmDebit = ({ action, paymentMeans: { bankAccount }, amount }) => {
  const animatePulse = () => {
    avatarPulsed.animateAvatar();
  };

  return (
    <SConfirmDebitView>
      <SConfirmTextBig>{amount}€</SConfirmTextBig>
      <VerticalSlider onSlideFinish={animatePulse} />
      <AvatarDebitExtended
        ref={avatar => {
          avatarPulsed = avatar;
        }}
        user={{
          name: bankAccount.account_holder_name,
        }}
        action={action}
      />
      <SConfirmTextSmall>
        {getTranslations('transfert.debit.step2.subtitle', {
          fullName: bankAccount.account_holder_name,
        })}
      </SConfirmTextSmall>
      <AccountNumber recipient={{ ...bankAccount, type: 'IBAN' }} />
    </SConfirmDebitView>
  );
};

ConfirmDebit.propTypes = {
  amount: string.isRequired,
  paymentMeans: shape({
    bankAccount: shape({
      id: string,
      account_holder_name: string,
      last4: string,
    }).isRequired,
    parent: shape({
      bank: array.isRequired,
    }),
    child: shape({
      wallet: array.isRequired,
    }),
  }).isRequired,
  action: func.isRequired,
};

export default ConfirmDebit;
