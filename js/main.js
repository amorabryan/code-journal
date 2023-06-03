const $photoURL = document.querySelector('#photoURL');
const $url = document.querySelector('.url');

$photoURL.addEventListener('input', function (event) {
  if (event.target.value === '') {
    $url.src = 'images/placeholder-image-square.jpg';
  } else {
    $url.src = event.target.value;
  }
});

const $codeJournal = document.querySelector('#code-journal');
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

  $journalList.prepend(renderEntry(journalData));

  viewSwap('entries');

  if (data.entries.length >= 1) {
    toggleNoEntries();
  }

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
  $firstEntry.setAttribute('data-entry-id', entry.entryId);

  const $firstDiv = document.createElement('div');
  $firstDiv.setAttribute('class', 'column-full column-half');
  $firstEntry.appendChild($firstDiv);

  const $divImg = document.createElement('div');
  $divImg.setAttribute('class', 'img');
  $firstDiv.appendChild($divImg);

  const $secondCol = document.createElement('div');
  $secondCol.setAttribute('class', 'column-full column-half');
  $firstEntry.appendChild($secondCol);

  const $img = document.createElement('img');
  $img.setAttribute('src', entry.userPhoto);
  $img.setAttribute('alt', entry.userTitle);
  $img.setAttribute('class', 'photo');
  $divImg.appendChild($img);

  const $h2 = document.createElement('h2');
  $h2.setAttribute('class', 'title');

  const $titleText = document.createElement('span');
  $titleText.textContent = entry.userTitle;
  $h2.appendChild($titleText);

  const $pencilIcon = document.createElement('i');
  $pencilIcon.setAttribute('class', 'fa-solid fa-pencil');
  $h2.appendChild($pencilIcon);

  $secondCol.appendChild($h2);

  const $p = document.createElement('p');
  $p.setAttribute('class', 'notes');
  $p.textContent = entry.userNotes;
  $secondCol.append($p);

  return $firstEntry;
}

const $journalList = document.querySelector('.journal-list');

document.addEventListener('DOMContentLoaded', function () {
  const lastView = data.view;
  const dataEntries = data.entries;
  viewSwap(lastView);
  for (let i = 0; i < data.entries.length; i++) {
    const $newEntry = renderEntry(data.entries[i]);
    $journalList.appendChild($newEntry);
  } if (dataEntries.length >= 1) {
    toggleNoEntries();
  }
}
);

const $noEntries = document.querySelector('.no-entries');

function toggleNoEntries() {
  if (data.entries.length >= 1) {
    $noEntries.className = 'no-entries' + ' ' + 'hidden';
  } else {
    $noEntries.className = 'no-entries';
  }
}

const $view = document.querySelectorAll('.view');

function viewSwap(viewSwitch) {
  data.view = viewSwitch;
  for (let i = 0; i < $view.length; i++) {
    if (viewSwitch === $view[i].getAttribute('data-view')) {
      $view[i].classList.remove('hidden');
    } else {
      $view[i].classList.add('hidden');
    }
  }
}

const $entryLaunch = document.querySelector('.entry-launch');
$entryLaunch.addEventListener('click', function (event) {
  viewSwap('entries');
});

const $formLaunch = document.querySelector('.form-launch');
$formLaunch.addEventListener('click', function (event) {
  viewSwap('entry-form');
});

const $ul = document.querySelector('ul');

$ul.addEventListener('click', function (event) {
  const $li = event.target.closest('li');
  viewSwap('entry-form');
  const numEntry = $li.getAttribute('data-entry-id');
  let clickedEntry = 0;
  for (let i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryId === Number(numEntry)) {
      clickedEntry = data.entries[i];
    }
  }
  data.editing = clickedEntry;

  $codeJournal.querySelector('#title').value = clickedEntry.userTitle;
  $codeJournal.querySelector('#photoURL').value = clickedEntry.userPhoto;
  $codeJournal.querySelector('#notes').value = clickedEntry.userNotes;

  document.querySelector('#title-entry').textContent = 'Edit Entry';
});
