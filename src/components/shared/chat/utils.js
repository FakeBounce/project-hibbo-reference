import dateFormat from 'dateformat';

const DEPRECATION_MESSAGE =
  'isSameUser and isSameDay should be imported from the utils module instead of using the props functions';

export const isSameDay = (currentMessage = {}, diffMessage = {}) => {
  if (!currentMessage.createdAt || !currentMessage.createdAt) {
    return false;
  }
  try {
    const currentCreatedAt = dateFormat(currentMessage.createdAt, 'd/m/yyyy');
    const diffCreatedAt = dateFormat(diffMessage.createdAt, 'd/m/yyyy');
    return currentCreatedAt === diffCreatedAt;
  } catch (err) {
    return false;
  }
};

export const isSameUser = (currentMessage = {}, diffMessage = {}) => {
  return Boolean(
    diffMessage.user &&
      currentMessage.user &&
      diffMessage.user._id === currentMessage.user._id,
  );
};

export const warnDeprecated = fn => {
  return (...args) => {
    console.warn(DEPRECATION_MESSAGE); // eslint-disable-line
    return fn(...args);
  };
};
