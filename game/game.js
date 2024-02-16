const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "What is the capital of France?",
    choice1: "Madrid",
    choice2: "Sofia",
    choice3: "Istanbul",
    choice4: "Paris",
    answer: 4,
  },
  {
    question: "Who wrote the famous play Rome and Juliet?",
    choice1: "William Shakespeare",
    choice2: "Charles Dickens",
    choice3: "Jane Austen",
    choice4: "Mark Twain",
    answer: 1,
  },
  {
    question: "Which planet is known as the Red Planet?",
    choice1: "Venus",
    choice2: "Mars",
    choice3: "Jupiter",
    choice4: "Saturn",
    answer: 2,
  },
  {
    question: "What is the chemical symbol for water?",
    choice1: "WO",
    choice2: "H2O",
    choice3: "CO2",
    choice4: "O2",
    answer: 2,
  },
  {
    question: "Who painted the Mona Lisa?",
    choice1: "Vincent van Gogh",
    choice2: "Pablo Picasso",
    choice3: "Leonardo da Vinci",
    choice4: "Michelangelo",
    answer: 3,
  },
  {
    question: "Which country is known as the Land of the Rising Sun?",
    choice1: "China",
    choice2: "India",
    choice3: "Bulgaria",
    choice4: "Japan",
    answer: 4,
  },
  {
    question: "Which city is the southernmost capital city in the world?",
    choice1: "Buenos Aires",
    choice2: "Wellington",
    choice3: "Canberra",
    choice4: "Santiago",
    answer: 2,
  },
  {
    question: "In which year was the Eiffel Tower completed?",
    choice1: "1889",
    choice2: "1890",
    choice3: "1891",
    choice4: "1901",
    answer: 1,
  },
];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = questions.length;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    return window.location.assign("../end/end.html");
  }

  questionCounter++;
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionsIndex, 1);

  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    let classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(SCORE_POINTS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1200);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();
