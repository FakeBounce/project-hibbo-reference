import React from 'react';
import { oneOfType, object, number, array } from 'prop-types';
import { StyledModalOpac } from 'styles/styledComponents/containers';
import Loader from './components/Loader';

const LoaderModal = ({ style, styleLoader }) => {
  return (
    <StyledModalOpac style={style}>
      <Loader style={styleLoader} />
    </StyledModalOpac>
  );
};

LoaderModal.defaultProps = {
  style: {},
  styleLoader: { width: 100, height: 100 },
};

LoaderModal.propTypes = {
  style: oneOfType([object, number, array]),
  styleLoader: oneOfType([object, number, array]),
};

export default LoaderModal;
