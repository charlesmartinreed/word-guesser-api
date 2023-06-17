let wordsToGuess = [];
let wordsGuessedCorrectly = [];

let currentTime = 15;
let countdownTimer;

function startTimer() {
  countdownTimer = setInterval(() => {
    if (currentTime > 0) {
      currentTime--;
      console.log("timer is currently", currentTime);
      updateUITimerDisplay();
    } else return;
  }, 1000);
}

function stopTimer() {
  clearInterval(countdownTimer);
}

function updateTimer() {
  // if the word is correctly guessed, add more time to the clock
  // if ALL words are guesed correctly, add EVEN MORE time to the clock

  if (wordsToGuess.length > 0) currentTime += 10;
  if (wordsToGuess.length === 0) currentTime += 30;
  startTimer();
}

function updateUITimerDisplay() {
  document.getElementById("timer__display").textContent = currentTime;
}

function updateUIWordList() {
  document.querySelectorAll(".word__definition").forEach((definitionDiv) => {
    definitionDiv.textContent =
      wordsToGuess[definitionDiv.getAttribute("data-index")].word;
  });
}

async function fetchWords() {
  // will return an array of arrays
  // where each item looks like: { word: word, definition: {definition} }

  try {
    let res = await fetch("/words/10");
    if (res.ok) {
      wordsToGuess = res.json();
      updateUIWordList();
    }
  } catch {
    console.error(e);
  }
}

window.addEventListener("DOMContentLoaded", async (e) => {
  // startTimer();
});
