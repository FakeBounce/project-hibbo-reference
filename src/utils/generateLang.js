const Sync = require('sync-spreadsheet'); // eslint-disable-line

const spreadSheetId = '1eKDKq5in_Ti8Mt9JoiD_Mn4GHU406l7LE6gBUY7oR0M';
// Find here -> https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit#gid=0

Sync({
  spreadSheetId, // required
  pathMessages: 'src/i18n', // required
  tabIndex: 0, // export specific tab index, if you want export all tabs, don't define this option
})
  .then(() => {
    console.log('done !');
  })
  .catch(err => {
    console.log('SYNC MESSAGES FAILED:', err);
  });
