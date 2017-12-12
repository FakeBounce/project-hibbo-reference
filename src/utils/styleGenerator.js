import appStyles from 'styles/appStyles';

const getNewColorTheme = (lastTheme = '') => {
  let theme = lastTheme;
  while (theme === lastTheme) {
    theme =
      appStyles.colorList[
        Math.floor(Math.random() * appStyles.colorList.length)
        ];
  }
  return theme;
};

export default getNewColorTheme;