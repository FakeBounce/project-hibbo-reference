const daysInMonth = (m, y) => {
  switch (m) {
    case 1:
      return (y % 4 === 0 && y % 100) || y % 400 === 0 ? 29 : 28;
    case 8:
    case 3:
    case 5:
    case 10:
      return 30;
    default:
      return 31;
  }
};

const isValidDate = (d, m, y, futur = false) => {
  const dd = parseInt(d, 10);
  const mm = parseInt(m, 10) - 1;
  const yy = parseInt(y, 10);
  const t = new Date();
  return (
    mm >= 0 &&
    mm < 12 &&
    dd > 0 &&
    dd <= daysInMonth(mm, yy) &&
    (futur ? yy <= t.getFullYear() : yy >= t.getFullYear())
  );
};

export default isValidDate;
