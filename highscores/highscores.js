const highScoresList = document.querySelector("#highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const clearButton = document.querySelector("#clearScores");
clearButton.addEventListener("click", () => {
  localStorage.removeItem("highScores");
  highScoresList.innerHTML = "";
  alert("Нулирането беше успешно!");
});

highScoresList.innerHTML = highScores
  .map((score) => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`;
  })
  .join("");
