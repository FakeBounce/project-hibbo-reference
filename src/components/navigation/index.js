import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { goTo } from 'actions/navigationActions';
import Navigation from './components/Navigation';

class NavigationContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      childMode: false,
    };
  }

  render() {
    return (
      <Navigation
        {...this.props}
        mode={this.state.childMode ? 'children' : 'adult'}
        openOverlay={() => {}}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    device: state.device,
    missions: state.missions,
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    goTo: (navigation, route, params) => {
      dispatch(goTo(navigation, route, params));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  NavigationContainer,
);
