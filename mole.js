// Write your JS here.
let popupLength = 3000;
let hideTimeout;
let clickable = false;
let molesLeft = 30;
let score = 0;

function popUpRandomMole() {
  if (molesLeft <= 0) {
    document.querySelector('.sb__game-over').classList.remove('sb__game-over--hidden');
    return;
  }
  const moleHeads = document.querySelectorAll('.block__elem__molehead:not(.block__elem__mole-head--whacked)');
  if (moleHeads.length === 0) return;
  let i = Math.floor(Math.random() * moleHeads.length);
  let moleHead = moleHeads[i]

  clickable = true;
  moleHead.classList.remove('block__elem__mole-head--hidden')

  molesLeft--;
  document.querySelector('.sb__moles').innerHTML = molesLeft;
  hideTimeout = setTimeout(() => hideMole(moleHead), popupLength)
}

function hideMole(mole) {
  clickable = false;
  mole.classList.add('block__elem__mole-head--hidden');

  setTimeout(popUpRandomMole, 500);
}

window.addEventListener('DOMContentLoaded', () => {
  setTimeout(popUpRandomMole, 0);

  const moleHeads = document.querySelectorAll('.block__elem__molehead');
  for (let moleHead of moleHeads) {
    moleHead.addEventListener('click', (e) => {
      if (!clickable) return;

      score++;
      document.querySelector('.sb__score').innerHTML = score;
      popupLength -= popupLength / 10;

      clearTimeout(hideTimeout);
      hideMole(e.target)

    });
  }
});
