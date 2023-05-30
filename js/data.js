/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

window.addEventListener('beforeunload', function (event) {
  const journalEntriesJSON = JSON.stringify(data.entries);
  localStorage.setItem('javascript-local-storage', journalEntriesJSON);
});

const prevJournalJSON = localStorage.getItem('javascript-local-storage');

if (prevJournalJSON !== null) {
  data.entries = JSON.parse(prevJournalJSON);
}
