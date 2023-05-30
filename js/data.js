/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

window.addEventListener('beforeunload', function (event) {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('javascript-local-storage', dataJSON);
});

const prevJournalJSON = localStorage.getItem('javascript-local-storage');

if (prevJournalJSON !== null) {
  data = JSON.parse(prevJournalJSON);
}
