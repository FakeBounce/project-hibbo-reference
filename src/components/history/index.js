import { connect } from 'react-redux';

import TransactionTicketHOC from './components/transactionTicket/TransactionTicketHOC';
import History from './components/History';

const mapStateToProps = state => {
  return {
    transactions: state.transfert.transactions,
    childAvatar: state.profile.child.avatar,
    totalAmount: state.profile.child.totalAmount,
    piggyAmount: state.piggyBank.currentPiggy.amount,
    bankAmount: state.profile.child.amount,
  };
};

export default connect(mapStateToProps)(TransactionTicketHOC(History));
