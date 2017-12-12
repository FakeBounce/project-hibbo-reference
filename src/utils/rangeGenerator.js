const getOutputRange = (a, b, length) => {
  const outputRange = [];

  for (let i = 0; i < length; i++) {
    if (i % 2 === 0) {
      outputRange.push(a);
    } else {
      outputRange.push(b);
    }
  }

  return outputRange;
};

export default getOutputRange;
