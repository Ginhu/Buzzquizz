const firstScreen = document.querySelector(".first-screen");
const basicInfo = document.querySelector(".basic-info-screen");
const questionScreen = document.querySelector(".question-screen");
const levelScreen = document.querySelector(".level-screen");
const quizzReadyscreen = document.querySelector(".quizz-ready");
const quizzEmpty = document.querySelector(".create-quizz-empty");
const quizzFilled = document.querySelector(".create-quizz-filled");

function createQuizz() {
    firstScreen.classList.add("hidden");
    basicInfo.classList.remove("hidden");
    window.scrollTo(0, 0); 
}

function proceedCreatequestions() {
    basicInfo.classList.add("hidden");
    questionScreen.classList.remove("hidden");
    window.scrollTo(0, 0); 

}

function openQuestion (element){
    window.scrollTo(0, 0);
    const nameQuestion = document.querySelector(".question-1 span");
    nameQuestion.innerHTML = "Pergunta 2";
}
function proceedLevelscreen(){
    questionScreen.classList.add("hidden");
    levelScreen.classList.remove("hidden");
    window.scrollTo(0, 0); 

}
function proceedfinishQuizz(){
    levelScreen.classList.add("hidden");
    quizzReadyscreen.classList.remove("hidden");
    window.scrollTo(0, 0); 

}
function accessQuizz(){

}
function backHome(){
    
    quizzReadyscreen.classList.add("hidden");
    
    firstScreen.classList.remove("hidden");
    
    quizzEmpty.classList.add("hidden");

    quizzFilled.classList.remove("hidden");
    window.scrollTo(0, 0); 
}

