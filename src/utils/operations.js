import ms from 'ms';
import appStyles from 'styles/appStyles';

export const daysLeft = deadline => {
  const t = new Date();
  return Math.ceil((deadline - t.getTime()) / ms('1d'));
};

export const videoDimensions = windowWidth => {
  const width =
    Math.ceil((windowWidth - appStyles.size.cardMargin - 20) / 10) * 10;
  const height = width * 40 / 100;
  return { width, height };
};
