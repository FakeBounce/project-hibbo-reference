import { connect } from 'react-redux';

import { editUserProfile } from 'actions/profileActions';
import { resetAllErrors, registerStart } from 'actions/authActions';
import * as ActionTypes from 'actionTypes/authActionTypes';
import Auth from './components/Auth';

const mapStateToProps = state => {
  return {
    fbError: state.user.fbError,
    googleError: state.user.googleError,
    error: state.user.error,
    token: state.user.token,
    parentProfile: state.profile.parent,
    profileError: state.profile.error,
    childProfile: state.profile.child,
    logginIn: state.user.logginIn,
    partialRegister: state.user.partialRegister,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    registerWithFb: () => {
      dispatch({ type: ActionTypes.FB_REGISTER_START });
    },
    loginWithFb: () => {
      dispatch({ type: ActionTypes.FB_LOGIN_START });
    },
    registerWithGoogle: () => {
      dispatch({ type: ActionTypes.GOOGLE_REGISTER_START });
    },
    loginWithGoogle: () => {
      dispatch({ type: ActionTypes.GOOGLE_LOGIN_START });
    },
    resetAllErrors: email => {
      dispatch(resetAllErrors(email));
    },
    startRegister: formData => {
      dispatch(registerStart(formData));
    },
    editUserProfile: formData => {
      dispatch(editUserProfile(formData));
    },
  };
};

const AuthContainer = connect(mapStateToProps, mapDispatchToProps)(Auth);

export default AuthContainer;
