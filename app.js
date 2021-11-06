const input = document.querySelector('input');
const checkBtn = document.querySelector('.input-div button');
const lettersDiv = document.querySelector('.letters-div');
const mistakes = document.querySelector('.mistakes');
const results = document.querySelector('.results');

let word = 'hangman';
word = word.split('');
createSpace(word);
let wrongAnswers = [];

input.focus();


//EVENT LISTENERS

checkBtn.addEventListener('click',(e)=>{
    const indexes = check(word,input.value);
    placeText(indexes,'.letters-div div');
    const divs = document.querySelectorAll('.mistakes div');
    for(i=0;i<wrongAnswers.length;i++){
    divs[i].innerHTML = wrongAnswers[i];
    }
    input.value = '';
    gameResult();
    input.focus();
})


// FUNCTIONS

function createSpace(word){
    const length = word.length;
    for(i=0; i<length;i++){
        const subspace = document.createElement('div');
        lettersDiv.appendChild(subspace);
    }
    for(i=0; i<length;i++){
        const mistake = document.createElement('div');
        mistakes.appendChild(mistake);
    }
}

function check(array,inputValue){
    let indexes = [];
    array.forEach((letter,index)=>{
        if(letter === inputValue){
            indexes.push(index);
        }
    })
    if(indexes.length === 0){
            wrongAnswers.push(inputValue);  
            for(i=0;i<wrongAnswers.length-1;i++){
            if(wrongAnswers[i]===inputValue){
                wrongAnswers.pop(inputValue);   
                }
        } 
        }
    return indexes;
}

function placeText(array,targetDiv){
    const subspaces = document.querySelectorAll(targetDiv);
    array.forEach(index=>{
        subspaces[index].innerText = input.value;
    })
}

function gameResult(){
    const correct = document.querySelectorAll('.letters-div div');
    const wrong = document.querySelectorAll('.mistakes div');
    const resultpara = document.querySelector('.result');

    let corrects = [];
    let wrongs = [];
    correct.forEach(div =>{
        if(div.innerHTML !== ''){
            corrects.push(div);
    }
})
    if(corrects.length === word.length){
        resultpara.innerHTML = 'VICTORY!';
        restartGame();
    }

    wrong.forEach(div =>{
        if(div.innerHTML !== ''){
            wrongs.push(div);
    }
})
    if(wrongs.length === word.length){
        resultpara.innerHTML = 'DEFEAT!';
        restartGame();
    }
}

function restartGame(){
    checkBtn.disabled = true;
    const restartBtn = document.createElement('button');
    restartBtn.innerHTML = 'Restart';
    results.appendChild(restartBtn);

    restartBtn.addEventListener('click',(e)=>{
        e.preventDefault();

        const Correct = document.querySelectorAll('.letters-div div');
        const wrong = document.querySelectorAll('.mistakes div');
        wrong.forEach(div=>{
            div.innerHTML = '';
        })
        Correct.forEach(div=>{
            div.innerHTML = '';
        })

        wrongAnswers = [];

        checkBtn.disabled = false;
        results.removeChild(restartBtn);
        input.focus();
    })
}


