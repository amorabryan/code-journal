const $photoURL = document.querySelector('#photoURL');
const $url = document.querySelector('.url');
const $journalList = document.querySelector('.journal-list');

$photoURL.addEventListener('input', function (event) {
  if (event.target.value === '') {
    $url.src = 'images/placeholder-image-square.jpg';
  } else {
    $url.src = event.target.value;
  }
});

const $codeJournal = document.querySelector('#code-journal');
const journalElements = $codeJournal.elements;
const entriesArray = data.entries;

$codeJournal.addEventListener('submit', function (event) {
  event.preventDefault();
  const journalData = {};

  const title = journalElements.title.name;
  const photoURL = journalElements.photoURL.name;
  const notes = journalElements.notes.name;

  const titleValue = journalElements.title.value;
  const photoURLValue = journalElements.photoURL.value;
  const notesValue = journalElements.notes.value;

  if (data.editing === null) {
    journalData.entryId = data.nextEntryId;
    data.nextEntryId++;

    journalData[title] = titleValue;
    journalData[photoURL] = photoURLValue;
    journalData[notes] = notesValue;

    entriesArray.unshift(journalData);

    $journalList.prepend(renderEntry(journalData));
  } else {
    journalData.entryId = data.editing.entryId;

    journalData[title] = titleValue;
    journalData[photoURL] = photoURLValue;
    journalData[notes] = notesValue;

    const $li = document.querySelector(`li[data-entry-id="${data.editing.entryId}"]`);
    $li.replaceWith(renderEntry(journalData));

    for (let i = 0; i < entriesArray.length; i++) {
      if (entriesArray[i].entryId === data.editing.entryId) {
        entriesArray.splice(i, 1, journalData);
      }
    }
    data.editing = null;
  }

  $url.src = 'images/placeholder-image-square.jpg';

  if (entriesArray.length >= 1) {
    toggleNoEntries();
  }

  viewSwap('entries');

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
  $firstEntry.className = 'row';
  $firstEntry.setAttribute('data-entry-id', entry.entryId);

  const $firstDiv = document.createElement('div');
  $firstDiv.className = 'column-full column-half';
  $firstEntry.appendChild($firstDiv);

  const $divImg = document.createElement('div');
  $divImg.className = 'img';
  $firstDiv.appendChild($divImg);

  const $secondCol = document.createElement('div');
  $secondCol.className = 'column-full column-half';
  $firstEntry.appendChild($secondCol);

  const $img = document.createElement('img');
  $img.setAttribute('src', entry.userPhoto);
  $img.setAttribute('alt', entry.userTitle);
  $img.className = 'photo';
  $divImg.appendChild($img);

  const $h2 = document.createElement('h2');
  $h2.className = 'title';

  const $titleText = document.createElement('span');
  $titleText.textContent = entry.userTitle;
  $h2.appendChild($titleText);

  const $pencilIcon = document.createElement('i');
  $pencilIcon.className = 'fa-solid fa-pencil';
  $h2.appendChild($pencilIcon);

  $secondCol.appendChild($h2);

  const $p = document.createElement('p');
  $p.className = 'notes';
  $p.textContent = entry.userNotes;
  $secondCol.append($p);

  return $firstEntry;
}

document.addEventListener('DOMContentLoaded', function () {
  const lastView = data.view;
  viewSwap(lastView);
  for (let i = 0; i < entriesArray.length; i++) {
    const $newEntry = renderEntry(entriesArray[i]);
    $journalList.appendChild($newEntry);
  }
});

const $noEntries = document.querySelector('.no-entries');

function toggleNoEntries() {
  if (entriesArray.length >= 1) {
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
  } $deleteBtn.classList.add('hidden');
  toggleNoEntries();
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

const $title = $codeJournal.querySelector('#title');
const $notes = $codeJournal.querySelector('#notes');
const $titleEntry = document.querySelector('#title-entry');
const $deleteBtn = document.querySelector('.delete');

$ul.addEventListener('click', function (event) {
  const $li = event.target.closest('li');
  if (event.target.tagName === 'I') {
    viewSwap('entry-form');
    const numEntry = $li.getAttribute('data-entry-id');
    let clickedEntry = 0;
    for (let i = 0; i < entriesArray.length; i++) {
      if (entriesArray[i].entryId === Number(numEntry)) {
        clickedEntry = entriesArray[i];
      }
    }
    $deleteBtn.classList.remove('hidden');
    data.editing = clickedEntry;

    $title.value = clickedEntry.userTitle;
    $photoURL.value = clickedEntry.userPhoto;
    $notes.value = clickedEntry.userNotes;
    $url.src = clickedEntry.userPhoto;

    $titleEntry.textContent = 'Edit Entry';
  }
});

const $delete = document.querySelector('.delete-button');
const $deleteModal = document.querySelector('.delete-modal');
const $cancelDelete = document.querySelector('.cancel-delete');
const $confirmDelete = document.querySelector('.confirm-delete');

$delete.addEventListener('click', function () {
  $deleteModal.className = 'delete-modal' + '-on';
});

$cancelDelete.addEventListener('click', function () {
  $deleteModal.className = 'delete-modal';
});

$confirmDelete.addEventListener('click', function (event) {
  if (data.editing) {
    deleteEntry();
  } $codeJournal.reset();
  $deleteModal.className = 'delete-modal';
  viewSwap('entries');
});

function deleteEntry() {
  const entryIdToDelete = data.editing.entryId;
  const $entryToDelete = document.querySelector(`li[data-entry-id="${entryIdToDelete}"]`);
  $entryToDelete.remove();
  for (let i = 0; i < entriesArray.length; i++) {
    if (entriesArray[i].entryId === entryIdToDelete) {
      entriesArray.splice(i, 1);
    }
  } toggleNoEntries();
  data.editing = null;
  $url.src = 'images/placeholder-image-square.jpg';
  $titleEntry.textContent = 'New Entry';
}
