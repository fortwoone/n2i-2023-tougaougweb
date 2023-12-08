question_title= document.getElementById("qtitle");
question_text= document.getElementById("qtext");
btn_1= document.getElementById("choice1");
btn_2= document.getElementById("choice2");
btn_3= document.getElementById("choice3");
btn_4= document.getElementById("choice4");

welcome = document.getElementById("welcome");
start= document.getElementById("start");

maingame = document.getElementById("maingame");

result = document.getElementById("result");
resltTitle = document.getElementById("scoreResult");
resultText = document.getElementById("textResult");




questions = {
    "question1": {
        "q": "En quelle année le GIEC a-t-il confirmé que les activités humaines sont responsables du réchauffement climatique ? ?",
        "r": [
            {"nom": "1990", "isTrue": false},
            {"nom": "2000", "isTrue": false},
            {"nom": "2021", "isTrue": true},
            {"nom": "2010", "isTrue": false}
        ]
    },



"question2": {
        "q": "Quelles sont les projections pour un réchauffement possible avant 2040 ?",
        "r": [
            {"nom": "+1,5°C", "isTrue": true},
            {"nom": "+3°C", "isTrue": false},
            {"nom": "+2,5°C", "isTrue": false},
            {"nom": "+1°C", "isTrue": false}
        ]
    },

"question3": {
        "q": "Et les conséquences si aucune action n'est entreprise pour réduire les émissions de gaz à effet de serre ?",
        "r": [
            {"nom": "+3°C à +4°C", "isTrue": false},
            {"nom": "+5°C à +6°C", "isTrue": false},
            {"nom": "+2,5°C à +3°C", "isTrue": false},
            {"nom": "+4°C à +5°C", "isTrue": true}
        ]
    },

    "question4": {
        "q": "Combien de centimètres le niveau moyen de la mer a-t-il augmenté entre 1901 et 2018 ?",
        "r": [
            {"nom": "15cm", "isTrue": false},
            {"nom": "20cm", "isTrue": true},
            {"nom": "25cm", "isTrue": false},
            {"nom": "30cm", "isTrue": false}
        ]
    },

"question5": {
        "q": "Quelles sont les conséquences directes du réchauffement climatique mentionnées dans le rapport du GIEC ?",
        "r": [
            {"nom": "Diminution de la biodiversité", "isTrue": false},
            {"nom": "Augmentation de la consommation d'énergie", "isTrue": true},
            {"nom": "Élévation du niveau de la mer, fonte des glaces, augmentation de la fréquence et de l'intensité des événements météorologiques extrêmes", "isTrue": false},
            {"nom": "Diminution de la pollution atmosphérique", "isTrue": false}
        ]
    },

"question6": {
        "q": "Quel est l'un des effets du réchauffement climatique qui a un impact sur les régions côtières ?",
        "r": [
            {"nom": "Diminution des tempêtes", "isTrue": false},
            {"nom": "Augmentation de la disponibilité en eau douce", "isTrue": true},
            {"nom": "Élévation du niveau de la mer", "isTrue": false},
            {"nom": "Diminution des précipitations", "isTrue": false}
        ]
    },

"question7": {
        "q": "Quel terme décrit la situation où la Terre retient une plus grande quantité de chaleur due à l'accumulation de gaz à effet de serre ?",
        "r": [
            {"nom": "Refroidissement climatique", "isTrue": false},
            {"nom": "Réchauffement climatique", "isTrue": true},
            {"nom": "Stagnation thermique", "isTrue": false},
            {"nom": "Équilibre thermique", "isTrue": false}
        ]
    },

"question8": {
        "q": "Qu'est-ce que la cryosphère désigne principalement ?",
        "r": [
            {"nom": "La formation des nuages", "isTrue": false},
            {"nom": "La fonte des glaciers et de la banquise", "isTrue": true},
            {"nom": "Les précipitations neigeuses", "isTrue": false},
            {"nom": "Le réchauffement des océans", "isTrue": false}
        ]
    },

"question9": {
        "q": "Quel pourcentage de la population mondiale vit dans des zones menacées par la montée des eaux ?",
        "r": [
            {"nom": "1/100 personne", "isTrue": false},
            {"nom": "1/10 personne", "isTrue": true},
            {"nom": "1/50 personne", "isTrue": false},
            {"nom": "1/20 personne", "isTrue": false}
        ]
    },

"question10": {
        "q": "Quelle est l'affirmation du GIEC concernant l'influence humaine sur les événements de chaleur extrême ?",
        "r": [
            {"nom": "Les événements de chaleur extrême ne sont pas influencés par l'activité humaine", "isTrue": false},
            {"nom": "Les événements de chaleur extrême sont probablement liés à l'activité humaine", "isTrue": true},
            {"nom": "Les événements de chaleur extrême sont impossibles sans l'impact humain sur le climat", "isTrue": false},
            {"nom": "Les événements de chaleur extrême sont moins fréquents à cause de l'activité humaine", "isTrue": false}
        ]
    },

"question11": {
        "q": "Comment le rapport du GIEC classe-t-il les stratégies d'atténuation des émissions de gaz à effet de serre ?",
        "r": [
            {"nom": "Éviter - Changer - Améliorer", "isTrue": false},
            {"nom": "Accepter - Ignorer - Améliorer", "isTrue": true},
            {"nom": "Favoriser - Réduire - Améliorer", "isTrue": false},
            {"nom": "Éliminer - Modifier - Accroître", "isTrue": false}
        ]
    },

"question12": {
        "q": "Quelle est l'une des technologies spéculatives mentionnées dans le rapport qui présente des risques pour la biodiversité, la sécurité et les droits humains ?",
        "r": [
            {"nom": "BECCS (bioénergie, captage et stockage du carbone)", "isTrue": false},
            {"nom": "Éolienne offshore", "isTrue": true},
            {"nom": "Panneaux solaires", "isTrue": false},
            {"nom": "Centrales nucléaires", "isTrue": false}
        ]
    },

"question13": {
        "q": "Quel est vexempotre moyen de transport principal ?",
        "r": [
            {"nom": "voiture", "isTrue": false},
            {"nom": "moto", "isTrue": true},
            {"nom": "vélo", "isTrue": false},
            {"nom": "train", "isTrue": false}
        ]
    },

    
};

questionNumber = 0;
score = 0;


function nextQuestion() {

        if(questionNumber === 0) {
            welcome.style.display = "none";
            maingame.style.display = "block";
            questionNumber++;
            question_title.innerHTML = "Question " + questionNumber ;
            question_text.innerHTML = questions["question" + questionNumber]["q"];
            btn_1.innerHTML = questions["question" + questionNumber]["r"][0]["nom"];
            btn_2.innerHTML = questions["question" + questionNumber]["r"][1]["nom"];
            btn_3.innerHTML = questions["question" + questionNumber]["r"][2]["nom"];
            btn_4.innerHTML = questions["question" + questionNumber]["r"][3]["nom"];

            btn_1.addEventListener("click", function () {
                isTrue(0);
                console.log("ok");
                nextQuestion();
            }
            );
            
            btn_2.addEventListener("click", function () {
                isTrue(1);
                nextQuestion();
            }
            );
            
            btn_3.addEventListener("click", function () {
                isTrue(2);
                nextQuestion();
            }
            );
            
            btn_4.addEventListener("click", function () {
                isTrue(3);
                nextQuestion();
            }
            );
            return;
        }
        else if( questionNumber === Object.keys(questions).length) {
            maingame.style.display = "none";
            result.style.display = "block";
            if(score<10){
                //apocalypse
                resltTitle.innerHTML = "Vous avez obtenu " + score + "/13";
                resultText.innerHTML = "Vous avez obtenu un score catastrophique, vous êtes un danger pour la planète ! \n Suite à vos actions la planéte a explosée !!!!!\n ";
                
            }else{
                //pas apocalypse
                resltTitle.innerHTML = "Vous avez obtenu " + score + "/13";
                resultText.innerHTML = "Vous avez obtenu un score correct, vous pouvez encore faire mieux !";
            }
            return;
         }else if( questionNumber < Object.keys(questions).length){
            questionNumber++;
            question_title.innerHTML = "Question " + questionNumber ;
            console.log("questionNumber : " + questionNumber);
            question_text.innerHTML = questions["question" + questionNumber]["q"];
            btn_1.innerHTML = questions["question" + questionNumber]["r"][0]["nom"];
            btn_2.innerHTML = questions["question" + questionNumber]["r"][1]["nom"];
            btn_3.innerHTML = questions["question" + questionNumber]["r"][2]["nom"];
            btn_4.innerHTML = questions["question" + questionNumber]["r"][3]["nom"];
            return;
    }      
}
function isTrue(num) {
    if (questions["question" + questionNumber]["r"][num]["isTrue"] === true) {
        
        score++;
    }
}



start.addEventListener("click", function () {
    nextQuestion();
}   
);

if (questionNumber === 0) {
    welcome.style.display = "block";
    maingame.style.display = "none";
    result.style.display = "none";
};