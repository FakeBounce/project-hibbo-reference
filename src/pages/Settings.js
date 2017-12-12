import { createNavigator, StackRouter } from 'react-navigation';
import RouterTransitioner from '../routes/navigator/RouterTransitioner';

import SettingsComponent from '../components/settings';
import ParentProfileForm from '../components/settings/components/ParentProfileForm';
import ChildProfileForm from '../components/settings/components/ChildProfileForm';
import ChildProfileTransfer from '../components/settings/components/ChildProfileTransfer';
import PaymentMeansForm from '../components/settings/components/PaymentMeansForm';
import PurchasesList from '../components/settings/components/PurchasesList';

const SettingsStack = createNavigator(
  StackRouter({
    SettingsHome: {
      screen: SettingsComponent,
    },
    ParentProfileForm: {
      screen: ParentProfileForm,
    },
    ChildProfileForm: {
      screen: ChildProfileForm,
    },
    ChildProfileTransfer: {
      screen: ChildProfileTransfer,
    },
    PaymentMeansForm: {
      screen: PaymentMeansForm,
    },
    PurchasesList: {
      screen: PurchasesList,
    },
  }),
)(RouterTransitioner);

export default SettingsStack;
