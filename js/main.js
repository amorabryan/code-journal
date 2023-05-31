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

/*
 *  <ul class="container">
 *    <li class="row">
 *      <div class="column-full column-half">
 *        <div class="img">
 *          <img src="" alt="" class="photo">
 *        </div>
 *      </div>
 *      <div class="column-full column-half">
 *        <h2 class="title"></h2>
 *        <p class="notes"></p>
 *      </div>
 *    </li>
*/

function renderEntry(entry) {
  const $firstEntry = document.createElement('li');
  $firstEntry.setAttribute('class', 'row');

  const $firstCol = document.createElement('div');
  $firstCol.setAttribute('class', 'column-full column-half');
  $firstEntry.appendChild($firstCol);

  const $divImg = document.createElement('div');
  $divImg.setAttribute('class', 'img');
  $firstCol.appendChild($divImg);

  const $img = document.createElement('img');
  $img.setAttribute('src', entry.userPhoto);
  $img.setAttribute('alt', entry.userTitle);
  $img.setAttribute('class', 'photo');
  $divImg.appendChild($img);

  const $secondCol = document.createElement('div');
  $secondCol.setAttribute('class', 'column-full column-half');
  $firstCol.append($secondCol);

  const $h2 = document.createElement('h2');
  $h2.setAttribute('class', 'title');
  $h2.textContent = entry.userTitle;
  $secondCol.appendChild($h2);

  const $p = document.createElement('p');
  $p.setAttribute('class', 'notes');
  $p.textContent = entry.userNotes;
  $secondCol.append($p);

  return $firstEntry;
}

const $journalList = document.querySelector('.journal-list');

document.addEventListener('DOMContentLoaded', function () {
  for (let i = 0; i < data.entries.length; i++) {
    const $newEntry = renderEntry(data.entries[i]);
    $journalList.appendChild($newEntry);
  }
}
);
