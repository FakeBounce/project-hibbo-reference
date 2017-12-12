import appStyles from 'styles/appStyles';
import { Animated } from 'react-native';

export const setIntervalAnimation = (timer, limit, add, setState, nb = 0) => {
  timer(
    setInterval(() => {
      if (nb < limit) {
        setState(state => {
          return {
            amount: state.amount + add,
          };
        });
        // eslint-disable-next-line
        nb += 1;
      }
    }, appStyles.time.moneyTransaction / limit),
  );
};

export const setTimerMoneyAnimation = (
  timerTabs,
  value,
  type,
  isFromTotal,
  setState,
) => {
  const len = value.toString().length / 2;

  const timerTabsTmp = timerTabs;

  Animated.delay(1500).start(() => {
    for (let index = 0; index < len; index++) {
      // eslint-disable-next-line
      let unit = Math.pow(100, index);
      const limitTmp = Math.trunc(value / unit) % 100;
      const limit = type === 'debit' ? limitTmp * -1 : limitTmp;
      let add = 0;

      if (isFromTotal) {
        add = type === 'debit' ? unit * -1 : unit;
      } else {
        add = type === 'debit' ? unit : unit * -1;
      }

      if (limit !== 0) {
        setIntervalAnimation(
          timer => {
            timerTabsTmp[index] = timer;
          },
          limit,
          add,
          setState,
        );
      }
    }
  });
};
