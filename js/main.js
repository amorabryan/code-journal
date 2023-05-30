const $photoURL = document.querySelector('#photoURL');
const $url = document.querySelector('.url');

$photoURL.addEventListener('input', function (event) {
  if (event.target.value === '') {
    $url.src = 'images/placeholder-image-square.jpg';
  } else {
    $url.src = event.target.value;
  }
});

const $codeJournal = document.querySelector('#codeJournal');
const journalElements = $codeJournal.elements;

$codeJournal.addEventListener('submit', function (event) {
  event.preventDefault();

  const journalData = {};

  const title = journalElements.title.name;
  const photoURL = journalElements.photoURL.name;
  const notes = journalElements.notes.name;

  const titleValue = journalElements.title.value;
  const photoURLValue = journalElements.photoURL.value;
  const notesValue = journalElements.notes.value;

  journalData.entryId = data.nextEntryId;

  data.nextEntryId++;

  journalData[title] = titleValue;
  journalData[photoURL] = photoURLValue;
  journalData[notes] = notesValue;

  const entriesArray = data.entries;
  entriesArray.unshift(journalData);

  $url.src = 'images/placeholder-image-square.jpg';

  $codeJournal.reset();
});
