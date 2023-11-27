// QUESTIONS
const questions = [
    {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question: "What does CPU stand for?",
        correct_answer: "Central Processing Unit",
        incorrect_answers: [
            "Central Process Unit",
            "Computer Personal Unit",
            "Central Processor Unit",
        ],
    },
    {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question:
            "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#39;t get modified?",
        correct_answer: "Final",
        incorrect_answers: ["Static", "Private", "Public"],
    },
    {
        category: "Science: Computers",
        type: "boolean",
        difficulty: "easy",
        question: "The logo for Snapchat is a Bell.",
        correct_answer: "False",
        incorrect_answers: ["True"],
    },
    {
        category: "Science: Computers",
        type: "boolean",
        difficulty: "easy",
        question:
            "Pointers were not used in the original C programming language; they were added later on in C++.",
        correct_answer: "False",
        incorrect_answers: ["True"],
    },
    {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question:
            "What is the most preferred image format used for logos in the Wikimedia database?",
        correct_answer: ".svg",
        incorrect_answers: [".png", ".jpeg", ".gif"],
    },
    {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question: "In web design, what does CSS stand for?",
        correct_answer: "Cascading Style Sheet",
        incorrect_answers: [
            "Counter Strike: Source",
            "Corrective Style Sheet",
            "Computer Style Sheet",
        ],
    },
    {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question:
            "What is the code name for the mobile operating system Android 7.0?",
        correct_answer: "Nougat",
        incorrect_answers: [
            "Ice Cream Sandwich",
            "Jelly Bean",
            "Marshmallow",
        ],
    },
    {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question: "On Twitter, what is the character limit for a Tweet?",
        correct_answer: "140",
        incorrect_answers: ["120", "160", "100"],
    },
    {
        category: "Science: Computers",
        type: "boolean",
        difficulty: "easy",
        question: "Linux was first created as an alternative to Windows XP.",
        correct_answer: "False",
        incorrect_answers: ["True"],
    },
    {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question:
            "Which programming language shares its name with an island in Indonesia?",
        correct_answer: "Java",
        incorrect_answers: ["Python", "C", "Jakarta"],
    },
];
// document.addEventListener('DOMContentLoaded', (event) => {
document.addEventListener('DOMContentLoaded', (event) => {
    let questionNumber = 0;
    let score = 0;
    let timer;
    const questionEl = document.getElementById("question");
    const answerListEl = document.getElementById("answer-list");
    const timerEl = document.getElementById("timer");
    // const nextButtonEl = document.getElementById("next-button");
    // Funzione per avviare il timer

    // Imposta il dashoffset iniziale a pieno, per poi diminuirlo
    function startTimer() {
        let timeLeft = 60;
        const totalDuration = timeLeft;
        const timerTextEl = document.getElementById('timer-text');
        const timerCircleEl = document.getElementById('timer-circle');
        const circumference = 2 * Math.PI * 45;
        timerCircleEl.style.strokeDasharray = circumference;
        timerCircleEl.style.strokeDashoffset = circumference; // Inizia con il cerchio pieno

        timerTextEl.innerText = timeLeft;

        timer = setInterval(() => {
            timeLeft--;
            timerTextEl.innerText = timeLeft;

            // Calcola il nuovo offset
            let dashoffset = ((timeLeft / totalDuration) * circumference);
            timerCircleEl.style.strokeDashoffset = dashoffset.toFixed(2);

            if (timeLeft <= 0) {
                clearInterval(timer);
                goToNextQuestion();
            }
        }, 1000);
    }



    // Funzione per mostrare la domanda
    function renderQuestion() {
        if (questionNumber >= questions.length) {
            endQuiz();
            return;
        }
        const question = questions[questionNumber];
        questionEl.innerHTML = question.question;
        answerListEl.innerHTML = '';

        const countAnswers = document.createElement('span');
        countAnswers.className = 'countAnswers';
        const questionText = document.createElement('span');
        questionText.innerText = `QUESTION ${questionNumber + 1}`;
        const totalQuestionsText = document.createElement('span');
        totalQuestionsText.style.color = '#af0087';
        totalQuestionsText.innerText = `/${questions.length}`;

        // randomizzazione ordine risposte
        

        // creo un div per ogni gruppo di risposte
        for (let i = 0; i < allAnswers.length; i += 2) {
            const answerGroup = document.createElement('div');
            answerGroup.className = 'answer-group';

            // Aggiungi due risposte per gruppo
            for (let j = i; j < i + 2 && j < allAnswers.length; j++) {
                const answer = allAnswers[j];
                const inputR = document.createElement('input');
                inputR.type = 'radio';
                inputR.id = 'answer_' + j;
                inputR.name = 'answer';
                inputR.value = answer;
                const label = document.createElement('label');
                label.htmlFor = inputR.id;
                label.textContent = answer;
                label.className = 'radio';

                // inputR.addEventListener('change', () => {
                //     selectAnswer(answer);
                //     setTimeout(() => {
                //         goToNextQuestion();
                //     }, 1000); // Ritardo di un secondo (1000 millisecondi)
                // });


                nextButton = document.createElement('button');
                nextButton.className= "nextButton"
                nextButton.innerText ="Next";
                nextButton.style.display = "none";

                inputR.addEventListener("click",() => {
                    nextButton.style.display = "inline";
                } )
                

                nextButton.addEventListener("click", () => {
                    selectAnswer(answer);
                    goToNextQuestion()

                })

                answerGroup.appendChild(inputR);
                answerGroup.appendChild(label);
            }

            answerListEl.appendChild(answerGroup);
            clearInterval(timer);
            startTimer();
        }
        countAnswers.appendChild(questionText);
        countAnswers.appendChild(totalQuestionsText);
        answerListEl.appendChild(nextButton)
        answerListEl.appendChild(countAnswers);
    }


    // Funzione per evidenziare la risposta selezionata
    function highlightSelectedAnswer(selectedAnswer) {
        const answerListItems = document.querySelectorAll('#answer-list label');
        answerListItems.forEach(label => {
            if (label.textContent === selectedAnswer) {
                label.classList.add('selected');
            }
        });
    }
    // Funzione per passare alla prossima domanda
    function goToNextQuestion() {
        questionNumber++;
        renderQuestion();
    }

    // Funzione per terminare il quiz
    function endQuiz() {
        const totalQuestions = questions.length;
        const percentCorrect = (score / totalQuestions) * 100;
        const percentIncorrect = 100 - percentCorrect;

        //punteggio minimo per passare il quiz
        const passingScore = 60;

        // Messaggi da visualizzare
        let message;
        if (percentCorrect >= passingScore) {
            message = `
                <h2>Congratulations!</h2>
                <p class='winP'>You passed the exam.</p>
                <p class='secondP'>We'll send you the certificate in a few minutes.<br/>
                Check your email (including promotions/spam folder).</p>
            `;
        } else {
            message = `
                <h2>Oh no!</h2>
                <p class='loseP'>You didn't pass the exam.</p>
                <p class='secondP'>Try again, champion!</p>
            `;
        }

        // calcolo circonferenze per i risultati
        const radius = 90;
        const circumference = 2 * Math.PI * radius;
        const correctOffset = circumference * (percentCorrect / 100);
        const incorrectOffset = circumference * (percentIncorrect / 100);

        // Nascondi il quiz container e mostra i risultati
        document.getElementById('quiz-container').style.display = 'none';
        document.getElementById('timer-container').style.display = 'none';
        const resultsScreen = document.getElementById('results-screen');
        resultsScreen.style.display = 'flex';
        resultsScreen.innerHTML = `
        
            <h1>Results</h1>
            <h2>The summary of your answers:</h2>
            <div id="details-container" class="details-container">
                <div class="result correct">
                    <h3 class='correctH'>Correct</h3>
                    <p class='correctP'>${percentCorrect.toFixed(1)}%</p>
                    <p class='correctP2'>${score}/${totalQuestions} questions</p>
                </div>
                <svg width="300" height="300" viewBox="0 0 200 200">
                    <circle r="90" cx="100" cy="100" fill="transparent" stroke="#d20094" stroke-width="20"
                        stroke-dasharray="${circumference}" stroke-dashoffset="0"
                        transform="rotate(-90 100 100)" />
                    <circle r="90" cx="100" cy="100" fill="transparent" stroke="#00ffff" stroke-width="20"
                        stroke-dasharray="${circumference}" stroke-dashoffset="${circumference - correctOffset}"
                        transform="rotate(-90 100 100)" />
                    <text x="50%" y="50%" alignment-baseline="middle" text-anchor="middle" font-size="16px" fill="#fff">
                        ${percentCorrect >= passingScore ?
                `<tspan class="winH" x="50%" dy="-1.2em">Congratulations!</tspan>
                        <tspan class="winP" x="50%" dy="1.2em">You passed the exam.</tspan>
                        <tspan class="secondP" x="50%" dy="1.2em">We'll send you the certificate</tspan>
                        <tspan class="secondP" x="50%" dy="1.2em">in a few minutes.</tspan>
                        <tspan class="thirdP" x="50%" dy="1.2em">Check your email (including promotions /</tspan>
                        <tspan class="thirdP" x="50%" dy="1.2em"> spam folder)</tspan> ` :
                `<tspan class="loseH" x="50%" dy="-1.5em">Oh no!</tspan>
                        <tspan class="loseP" x="50%" dy="1.5em">You didn't pass the exam.</tspan>
                        <tspan class="secondP" x="50%" dy="1.5em">Try again, champion!</tspan>`
            }
                    </text>
                </svg>
                <div class="result wrong">
                    <h3 class='incorrectH'>Wrong</h3>
                    <p class='incorrectP'>${percentIncorrect.toFixed(1)}%</p>
                    <p class='incorrectP2'>${totalQuestions - score}/${totalQuestions} questions</p>
                </div>
            </div>
            <form action="./rating.html">
                <button class="cursore" id="proceed" type="submit">PROCEED</button>
            </form>

    `;
        console.log(correctOffset);
        console.log(incorrectOffset);
    }

    // Funzione per riavviare il quiz (da implementare)
    // function restartQuiz() {
    //     // Reimposta lo stato del quiz e mostra il contenitore del quiz
    //     questionNumber = 0;
    //     score = 0;
    //     document.getElementById('quiz-container').style.display = 'block';
    //     resultsScreen.style.display = 'none';
    //     // renderQuestion();
    // }
    // Inizia il quiz
    renderQuestion();
});