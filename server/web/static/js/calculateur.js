


calculateur_form = document.getElementById("calculateur_form");
// questions pour estimer les émissions de gaz à effet de serre 

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

questionNumber = 1;
resultat = {

}

function setQuestions(){
    function addRadio(reponseList){
        console.log(reponseList);
        result = ""
        for (let i = 0; i < reponseList.length; i++) {
            result += '<div><input type="radio" name="question'+ questionNumber +'" value="'+ reponseList[i]["nom"] +'" id="question'+ questionNumber +'_'+ i +'">'+
            '<label for="question'+ questionNumber +'_'+ i +'">'+ reponseList[i]["nom"] +'</label></div>';
        }
        return result;
    }
    for ( questionNumber = 1; questionNumber <= Object.keys(questions).length; questionNumber++) {
        calculateur_form.innerHTML += '<div id="question'+questionNumber+'" '+  +' ><label>'+questions["question" + questionNumber]["q"]+'</label>'+
        addRadio(questions["question" + questionNumber]["r"])
        +'</div>';     
    }
    
    const question = document.getElementById("question"+questionNumber);
    for (const radio of question.children) {
        radio.addEventListener("click", function(e){
            //e.target.checked = true;
            resultat["question"+questionNumber] = e.target.id;
            nextQuestion();
        });
    }
    questionNumber++;
    if (questionNumber > Object.keys(questions).length){
        calculateur_form.innerHTML += '<button type="submit">Calculer</button>';
        calculateur_form.innerHTML += '<input type="hidden" name="questionNumber" value="'+ questionNumber +'">';
        return;
    }
}
setQuestions();