import React, { PureComponent } from 'react';
import { func, string, bool } from 'prop-types';
import loader from 'assets/auth/loader.json';

import TouchableRipple from 'shared/TouchableRipple';

import { SNextSubmit, SButtonSubmit } from '../styles';

class Submit extends PureComponent {
  componentDidUpdate() {
    const { logginIn } = this.props;

    if (logginIn && this.animation) {
      this.animation.play();
    } else {
      this.animation.reset();
    }
  }

  render() {
    const { validate, title, logginIn } = this.props;

    return (
      <SButtonSubmit>
        <TouchableRipple
          onPress={() => {
            validate(title);
          }}
        >
          <SNextSubmit
            innerRef={animations => {
              this.animation = animations;
            }}
            source={loader}
            loop={logginIn}
          />
        </TouchableRipple>
      </SButtonSubmit>
    );
  }
}

Submit.defaultProps = {
  logginIn: false,
};

Submit.propTypes = {
  logginIn: bool,
  validate: func.isRequired,
  title: string.isRequired,
};

export default Submit;
