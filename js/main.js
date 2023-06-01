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

  $journalList.prepend(renderEntry(journalData));

  viewSwap('entries');

  if (data.entries === []) {
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
  const lastView = data.view;
  if (lastView) {
    viewSwap(lastView);
  } for (let i = 0; i < data.entries.length; i++) {
    const $newEntry = renderEntry(data.entries[i]);
    $journalList.appendChild($newEntry);
  } if (data.entries === []) {
    toggleNoEntries();
  }
}
);

const $noEntries = document.querySelector('.no-entries');

function toggleNoEntries() {
  if (data.entries === []) {
    $noEntries.className = 'no-entries';
  } else {
    $noEntries.className = 'no-entries' + ' ' + 'hidden';
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
