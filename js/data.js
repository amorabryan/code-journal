/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

window.addEventListener('beforeunload', function (event) {
  event.preventDefault();
  const journalEntriesJSON = JSON.stringify(data.entries);
  localStorage.setItem('javascript-local-storage', journalEntriesJSON);
});
