//GLOBAL VARIABLES

const input = document.querySelector('input');
const checkBtn = document.querySelector('.input-div button');
const lettersDiv = document.querySelector('.letters-div');
const mistakes = document.querySelector('.mistakes');
const results = document.querySelector('.results');
const resultpara = document.querySelector('.result');
const error = document.querySelector('.error');
let word;
let answer;

creteWord();
let wrongAnswers = [];

input.focus();

//EVENT LISTENERS

checkBtn.addEventListener('click',(e)=>{
    const regex = /[a-z]/i;
    const test = regex.test(input.value.toLowerCase());
    console.log(test);
    if(test === true){
    const indexes = check(word,input.value.toLowerCase());
    placeText(indexes,'.letters-div div');
    const divs = document.querySelectorAll('.mistakes div');
    for(i=0;i<wrongAnswers.length;i++){
    divs[i].innerHTML = wrongAnswers[i];
    }
    input.value = '';
    gameResult();
    input.focus();
    } else{
        showError();
    }
})

input.addEventListener('keyup',(e)=>{
    if(e.key === 'Enter'){
    const regex = /[a-z]/;
    const test = regex.test(input.value.toLowerCase());
    if(test === true){
    const indexes = check(word,input.value.toLowerCase());
    placeText(indexes,'.letters-div div');
    const divs = document.querySelectorAll('.mistakes div');
    for(i=0;i<wrongAnswers.length;i++){
    divs[i].innerHTML = wrongAnswers[i];
    }
    input.value = '';
    gameResult();
    input.focus();
    } else{
        showError();
    }
    }
})


// FUNCTIONS

function creteWord(){
    word = countryList[Math.floor(Math.random()*(countryList.length+1))];
    answer = word;
    word = word.toLowerCase();
    word = word.split('');
    createSpace(word);
}

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
        subspaces[index].innerText = input.value.toLowerCase();
    })
}

function gameResult(){
    const correct = document.querySelectorAll('.letters-div div');
    const wrong = document.querySelectorAll('.mistakes div');

    let corrects = [];
    let wrongs = [];
    correct.forEach(div =>{
        if(div.innerHTML !== ''){
            corrects.push(div);
    }
})
    if(corrects.length === word.length){
        resultpara.innerHTML = 'VICTORY!';
        resultpara.style.color = 'green';
        resultpara.style.textShadow = 'black 1px 1px';
        restartGame();
    }

    wrong.forEach(div =>{
        if(div.innerHTML !== ''){
            wrongs.push(div);
    }
})
    if(wrongs.length === word.length){
        resultpara.innerHTML = 'DEFEAT!';
        resultpara.style.color = 'red';
        resultpara.style.textShadow = 'black 1px 1px';
        const correctAnswer = document.createElement('p');
        correctAnswer.innerHTML = 'Answer: ' + answer;
        resultpara.appendChild(correctAnswer);
        restartGame();
    }
}

function restartGame(){
    checkBtn.disabled = true;
    input.disabled = true;
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
        input.disabled = false;
        resultpara.innerHTML = '';
        results.removeChild(restartBtn);
        lettersDiv.innerHTML = '';
        mistakes.innerHTML = '';
        creteWord();
        input.focus();
    })
}

function showError(){
    error.style.padding = '10px';
    error.innerHTML = 'Please Enter a valid value!';
    input.value = '';
    input.focus();
    setTimeout(function(){
        error.style.padding = '0px';
        error.innerHTML = '';
    },3000);
}


