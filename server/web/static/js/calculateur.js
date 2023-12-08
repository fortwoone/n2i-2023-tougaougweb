


calculateurForm = document.getElementById("calculateur_form");
// questions pour estimer les émissions de gaz à effet de serre 
backButton = document.getElementById("backButton")
const questionNumberDisplay = document.getElementById("questionNumberDisplay")
questions = {
    "question1": {
        "q": "Quel est votre moyen de transport principal ?",
        "r": [
            {"nom": "voiture", "points": 0},
            {"nom": "moto", "points": 5},
            {"nom": "vélo", "points": 50},
            {"nom": "train", "points": 45}
        ]
    },
    "question2": {
        "q": "Quel est le mode de chauffage de votre domicile ?",
        "r": [
            {"nom": "chauffage électrique", "points": 30},
            {"nom": "chaudière à gaz", "points": 20},
            {"nom": "chauffage au bois", "points": 10},
            {"nom": "énergies renouvelables", "points": 50}
        ]
    },
    "question3": {
        "q": "Comment gérez-vous vos déchets ?",
        "r": [
            {"nom": "mise au rebut classique", "points": 0},
            {"nom": "tri sélectif", "points": 30},
            {"nom": "compostage", "points": 40},
            {"nom": "zéro déchet", "points": 50}
        ]
    },
    "question4": {
        "q": "Quelle est la fréquence de vos voyages en avion par an ?",
        "r": [
            {"nom": "pas de voyages en avion", "points": 50},
            {"nom": "1-2 voyages", "points": 20},
            {"nom": "3-5 voyages", "points": 10},
            {"nom": "plus de 5 voyages", "points": 0}
        ]
    },
    "question5": {
        "q": "À quelle fréquence remplacez-vous vos appareils électroniques (téléphone...) ?",
        "r": [
            {"nom": "tous les 3-5 ans", "points": 50},
            {"nom": "tous les 5-10 ans", "points": 30},
            {"nom": "plus de 10 ans", "points": 10},
            {"nom": "moins de 3 ans", "points": 0}
        ]
    },
    "question6": {
        "q": "Comment effectuez-vous vos courses ?",
        "r": [
            {"nom": "en vrac avec des contenants réutilisables", "points": 50},
            {"nom": "en sacs plastiques à usage unique", "points": 10},
            {"nom": "en utilisant des sacs réutilisables", "points": 30},
            {"nom": "en ligne avec livraison à domicile", "points": 0}
        ]
    },
};

let questionNumber = 1;
const resultat = {};

function setQuestions() {
    backButton.addEventListener("click",showPrevQuestion)
    
    function showNextQuestion() {
        const currentQuestion = document.getElementById("question" + questionNumber);
        const nextQuestion = document.getElementById("question" + (questionNumber + 1));
        questionNumberDisplay.innerText =questionNumber+1
        backButton.classList.remove("opacity-0")

        if (nextQuestion) {
            currentQuestion.classList.add("d-none");
            nextQuestion.classList.remove("d-none");
            questionNumber++;
        } else {
            // detect if button already exists
            const submitButton = document.querySelector("#calculateur_form button[type='submit']");
            if (submitButton) return;
            
            currentQuestion.classList.add("d-none");

            const buttonHTML = '<button type="submit" class="btn btn-primary">Calculer</button>';
            const inputHTML = '<input type="hidden" name="questionNumber" value="' + questionNumber + '">';

            calculateurForm.innerHTML += buttonHTML + inputHTML;
        }
    }
    function showPrevQuestion(){
        
        if (questionNumber == 2) backButton.classList.add("opacity-0")
        const currentQuestion = document.getElementById("question" + questionNumber);
        const nextQuestion = document.getElementById("question" + (questionNumber -1 ));
        questionNumberDisplay.innerText =questionNumber-1
        

        if (nextQuestion) {
            currentQuestion.classList.add("d-none");
            nextQuestion.classList.remove("d-none");
            questionNumber--;
        } else {
            // detect if button already exists
            const submitButton = document.querySelector("#calculateur_form button[type='submit']");
            if (submitButton) return;

            const buttonHTML = '<button type="submit" class="btn btn-primary">Calculer</button>';
            const inputHTML = '<input type="hidden" name="questionNumber" value="' + questionNumber + '">';

            calculateurForm.innerHTML += buttonHTML + inputHTML;
        }
    }

    function handleRadioClick(e) {
        if (e.target.parentElement.parentElement.id !== "calculateur_form") {
            const questionId = e.target.parentElement.parentElement.id;
            const questionIndex = questionId.replace("question", "");
            resultat["question" + questionIndex] = e.target.value;
            showNextQuestion();
        }
    }

    for (let i = 1; i <= Object.keys(questions).length; i++) {
        const question = questions["question" + i];
        const radioButtons = question.r.map((option, index) =>
            '<div class="form-check">' +
            '<input class="form-check-input" type="radio" name="question' + i + '" value="' + option.nom + '" id="question' + i + '_' + index + '">' +
            '<label class="form-check-label" for="question' + i + '_' + index + '">' + option.nom + '</label></div>'
        );

        calculateurForm.innerHTML += '<fieldset id="question' + i + '" class="' + (i !== 1 ? 'd-none' : '') + '">' +
            '<legend>' + question.q + '</legend>' +
            radioButtons.join('') +
            '</fieldset>';
    }

    calculateurForm.addEventListener("change", handleRadioClick);
}

setQuestions();

calculateurForm.addEventListener("submit", function (e) {
    e.preventDefault();
    console.log(resultat);
    // remove the current question and show the result
    calculateurForm.innerHTML = '<div id="resultat" class="mt-3"></div>';
    const resultDiv = document.getElementById("resultat");
    let points = 0;
    for (let i = 1; i <= Object.keys(resultat).length; i++) {
        const question = resultat["question" + i];
        const questionPoints = questions["question" + i].r.find(option => option.nom === question).points;
        points += questionPoints;
    }

    let message = "";
    if (points < 100) {
        set_mode("apocalypse", "Apocalypse")
        message = "Vous avez une empreinte carbone trop élevée, vous devez faire des efforts pour la réduire.";
    } else if (points < 200) {
        message = "Vous pouvez encore faire des efforts pour réduire votre empreinte carbone.";
    } else {
        message = "Vous êtes un bon citoyen, continuez ainsi !";
    }

    resultDiv.innerHTML = '<p>Votre empreinte carbone est de <strong>' + points + '</strong> points.</p>' +
        '<p class="lead">' + message + '</p>';
});
