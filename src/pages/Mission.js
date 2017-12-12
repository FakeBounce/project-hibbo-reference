import React from 'react';

import MissionComponent from '../components/mission';
import MissionAddComponent from '../components/mission/indexAdd';
import MissionDetailComponent from '../components/mission/indexDetail';
import MissionPaymentComponent from '../components/mission/indexPayment';

export const MissionPayment = props => <MissionPaymentComponent {...props} />;

export const MissionDetail = props => <MissionDetailComponent {...props} />;

export const MissionAdd = props => <MissionAddComponent {...props} />;

export const Mission = props => <MissionComponent {...props} />;
