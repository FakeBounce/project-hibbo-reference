import dateFormat from 'dateformat';

const getFormatedDate = date => {
  dateFormat.masks.formatDate = 'mmmm yyyy';
  if (date) {
    return dateFormat(date * 1000, 'formatDate');
  }

  return '';
};

const setFilteredData = (filteredData, title, data) => {
  const newFilteredData = [
    ...filteredData,
    {
      title,
      data,
    },
  ];

  return newFilteredData;
};

const filterTransactions = transactions => {
  const sortedData = {};
  let filteredData = [];
  let currentDate = null;

  transactions.reduce((prevTransaction, transaction, index) => {
    const previousDate = getFormatedDate(prevTransaction.date);
    currentDate = getFormatedDate(transaction.date);

    if (previousDate !== currentDate) {
      sortedData[currentDate] = [];
      if (index !== 0) {
        filteredData = setFilteredData(
          filteredData,
          previousDate,
          sortedData[previousDate],
        );
      }
    }
    sortedData[currentDate].push(transaction);

    return transaction;
  }, 0);

  filteredData = setFilteredData(
    filteredData,
    currentDate,
    sortedData[currentDate],
  );
  return filteredData;
};

export default filterTransactions;
