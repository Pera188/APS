import questions from './questions.js';

const questionElement = document.querySelector(".question");
const answersElement = document.querySelector(".answers");
const spnQtd = document.querySelector(".spnQtd");
const textFinish = document.querySelector(".finish span");
const content = document.querySelector(".content");
const contentFinish = document.querySelector(".finish");
const btnRestart = document.querySelector(".finish button");

let currentIndex = 0;
let questionsCorrect = 0;

btnRestart.onclick = () => {
  resetQuiz();
};

function resetQuiz() {
  content.style.display = "flex";
  contentFinish.style.display = "none";
  currentIndex = 0;
  questionsCorrect = 0;
  loadQuestion();
}

function nextQuestion(e) {
  const isCorrect = e.target.getAttribute("data-correct") === "true";
  e.target.classList.add(isCorrect ? 'correct' : 'incorrect');

  // Mostrar todas as respostas corretas
  document.querySelectorAll('.answer').forEach(item => {
    if (item.getAttribute('data-correct') === 'true') {
      item.classList.add('correct');
    }
    item.disabled = true;  // Desativar todos os botões após a resposta
    item.classList.add('disabled'); // Adicionar a classe 'disabled' para desativar o hover
  });

  if (isCorrect) {
    questionsCorrect++;
  }

  setTimeout(() => {
    if (currentIndex < questions.length - 1) {
      currentIndex++;
      loadQuestion();
    } else {
      finish();
    }
  }, 2000);  // Tempo aumentado para permitir ao usuário ver a resposta correta
}

function finish() {
  textFinish.innerHTML = `Parabéns, você acertou ${questionsCorrect} de ${questions.length}`;
  content.style.display = "none";
  contentFinish.style.display = "flex";
}

function loadQuestion() {
  spnQtd.innerHTML = `${currentIndex + 1}/${questions.length}`;
  const item = questions[currentIndex];
  answersElement.innerHTML = "";
  questionElement.innerHTML = item.question;

  item.answers.forEach((answer) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <button class="answer" data-correct="${answer.correct}">
        ${answer.option}
      </button>
    `;
    answersElement.appendChild(div);
  });

  document.querySelectorAll(".answer").forEach((item) => {
    item.addEventListener("click", nextQuestion);
  });
}

loadQuestion();
