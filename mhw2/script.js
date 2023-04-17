/* TODO: inserite il codice JavaScript necessario a completare il MHW! */
function onClick(event){
    //vedo chi viene clickato
    const choice = event.currentTarget;
    const image = choice.querySelector('.checkbox');
    for(let answer of answercheck){
        if(answer.dataset.questionId == choice.dataset.questionId){
            answer.addEventListener('click', onClick);
            answer.classList.remove('scelto');
            answer.classList.add('nonScelto');
            const img = answer.querySelector('.checkbox');
            img.src = "unchecked.png";
            const answerIndex = answercheck.indexOf(answer);
            answercheck.splice(answerIndex, 1);
            list.push(answer);
        }
    }
    //metto la scelta nella lista di elementi scelti e la rimuovo da quella totale
    answercheck.push(choice);
    choice.removeEventListener('click', onClick);
    const choiceIndex = list.indexOf(choice);
    list.splice(choiceIndex, 1);
    //imposto l'immagine della box selezionata
    choice.classList.add('scelto');
    image.src = "images/checked.png";
    choice.classList.remove('nonScelto');
    //controllo se ho selezionato tre elementi
    if(answercheck.length == 3){
        for(let ans of list){
            ans.removeEventListener('click', onClick);
        }
 
        const fAnswers = {};
        for(let choice1 of answercheck){
            let f = 0;
            let choiceId = choice1.dataset.choiceId;
            for(let choice2 of answercheck){
                if(choice1.dataset.choiceId == choice2.dataset.choiceId)
                f++;
            }
            fAnswers[choiceId] = f;
        }
       
        var maxF = 0;
        var maxKey;
        for(let key in fAnswers){
            if(fAnswers[key] > maxF){
                maxF = fAnswers[key];
                maxKey = key;
            }
        }
        //carico il contenuto del testo corrispondente a maxKey
        const h1Result = document.querySelector('#result h1');
        const pResult = document.querySelector('#result p');
        let map = RESULTS_MAP[maxKey];
        h1Result.textContent = map['title'];
        pResult.textContent = map['contents'];
        pResult.textContent = map['contents'];
        result.classList.remove('hidden');
        button.classList.remove('hidden');
    }
}

//nascondo il bottone "ricomincia" e la descrizione col risultato (in modo che non spunti inizialmente title e contents)
const result = document.querySelector('#result');
result.classList.add('hidden');
const button = document.querySelector('#button');
button.classList.add('hidden');

const answers = document.querySelectorAll('.choice-grid div');
const list = [];
for(let answer of answers){
    list.push(answer);
    answer.addEventListener('click', onClick);
    answer.classList.add('nonScelto');
}

const answercheck = [];

//Ricarico la pagina facendo ricominciare così il quiz
function ricarica()
{
    location.reload();
}

button.addEventListener('click', ricarica);


