import { connect } from 'react-redux';

import { setNotificationToRead } from 'actions/notificationsActions';
import tips1 from 'assets/tips/tips1.mp4';
import tips2 from 'assets/tips/tips2.mp4';
import tips3 from 'assets/tips/tips3.png'
import tenTips from 'assets/tips/10TipsCard.png';
import tenTips2 from 'assets/tips/10TipsCard2.png';

import Notification from './components/Notification';

const mapStateToProps = state => {
  return {
    notifications: state.notifications,
    profile: state.profile.parent,
    user: state.user,
    tips: [
      {
        type: 'video',
        source: tips1,
        thumbnail: tenTips
      },
      {
        type: 'video',
        source: tips2
      },
      {
        type: 'image',
        source: tips3,
        thumbnail: tenTips2
      }
    ]
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setNotificationToRead: (profileId, token) => {
      dispatch(setNotificationToRead(profileId, token));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
