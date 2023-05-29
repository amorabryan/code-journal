const $photoURL = document.querySelector('#photoURL');
const $url = document.querySelector('.url');

$photoURL.addEventListener('input', function (event) {
  if (event.target.value === '') {
    $url.src = 'images/placeholder-image-square.jpg';
  } else {
    $url.src = event.target.value;
  }
});
