
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




// Busca (get()) todos os quizzes cadastrados no servidor
// o parametro é apenas para podermos utilizar o "get" varias vezes apenas passando o parametro para que seja executado o "then"
function getQuizzes (param) {
    axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes').then(param);
}

// função que depois da busca (then()) adiciona e exibe TODOS os quizzes na parte designada para exibição.
// Depois é preciso fazer uma lógica para excluir os do usuário dessa parte.
function show(param) {
    /* console.log(param.data[1]); */
    const data = param.data;

    for (let i = 0; i < data.length; i++) {
    document.querySelector('.all-quizzes-display').innerHTML += `<div class="your-quizz id${data[i].id}" onclick="clickQuizz(this)">
    <p>${param.data[i].title}</p>
    </div>`;

    document.querySelector('.all-quizzes-display').lastChild.style.background = `linear-gradient(to bottom, transparent 70%, #000000 98%), url(${data[i].image}) no-repeat center center`;
    /* console.log(param.data[i]); */
    }
}

// executando a função que busca os quizzes (getQuizzes()) passando como parâmetro a função (show()) que faz com que eles
// sejam adicionados ao html
getQuizzes(show);

// Função que quando clicado em um dos quizzes listado, vai "mudar" a página para a do quizz selecionado
// Vai adicionar todos os elementos deste quizz no html.
function clickQuizz (param) {
    /* console.log(param); */
    // Guarda o ID do quizz na variável 
    // ** O slice é um método de string que vai pegar a string da classe do parâmetro passado e vai pegar apenas a parte que 
    // nos interessa, o ID respectivo do quizz que foi selecionado
    const idQuizz = parseInt(param.classList.value.slice(13));
    /* console.log(idQuizz); */

    // Os dois document.querySelector estão apenas "mudando" de tela, escondendo a primeira e fazendo aparecer a segunda.
    document.querySelector('.first-screen').classList.add('hidden');
    document.querySelector('.seccond-screen').classList.remove('hidden');

    // Essa função vai "preencher" a página que vai aparecer com as respectivas informações do quizz selecionado
    function fillQuizz(param) {
        const data = param.data;
        
        // Esse for itera todos os quizzes até encontrar o quizz com ID correspondente ao selecionado
        for (let i = 0; i<data.length; i++) {
            // Esse é o if que identifica o quizz com o mesmo ID do selecionado
            if (data[i].id == idQuizz) {
                // Apenas guardando informações de retorno do servidor para deixar o uso delas mais "simples" ao decorrer do código
                const quizzData = data[i];
                const question = quizzData.questions;
                
                console.log(quizzData);
                /* console.log(question); */

                // Função que vai preencher os itens do "cabeçalho", o Banner e o Texto com o título do quizz
                function fillHeader () {
                    document.querySelector('.top-banner-title').style.background = `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${quizzData.image}) no-repeat center center`;
                    document.querySelector('.top-banner-title p').innerHTML = quizzData.title; 
                }

                // Função responsável por preencher cada pergunta do quizz e suas respectivas possíveis respostas
                function fillQuestionAnswers () {

                    // Este for itera pelo array de perguntas para construir cada bloco que compoẽ a pergunta e suas opções de resposta
                    for (let i = question.length-1; i >=0 ; i--) {
                        const answer = question[i].answers;
                        let shuffledAnswers = answer.sort(function() {
                            return Math.random() - 0.5;
                        })
                        /* console.log(answer); */
                        document.querySelector('.opacity-black-overlay').insertAdjacentHTML('afterend', '<div class="quizz-question"></div>')
                        document.querySelector('.quizz-question').innerHTML += 
                        `<div class="question">
                            <p>${question[i].title}</p>                   
                        </div>`
                        document.querySelector('.quizz-question').lastChild.style.backgroundColor = quizzData.questions[i].color;
                        document.querySelector('.quizz-question').innerHTML += '<div class="question-options-display"></div>'

                        // Este for itera pelo array de respostas para adiciona-las ao bloco da pergunta
                        for (let a = 0; a<answer.length; a++) {
                            document.querySelector(`.quizz-question`).lastChild.innerHTML += 
                            `<div class="question-option q${i} ${answer[a].isCorrectAnswer}" onclick="selectAnswer(this)">
                                <img src="${answer[a].image}"  alt="">
                                <p>${answer[a].text}</p>
                            </div>`
                        }
                    }
                }
            }
        }
        // Chamando as funções para executa-las
        fillHeader();
        fillQuestionAnswers();
    }

    // Chamando a função para executa-la
    getQuizzes(fillQuizz);
    
}

function selectAnswer(param) {

    console.log(param);
    const className = `.${param.classList.value.slice(16, 18)}`;
    const el = document.querySelectorAll(className);
    for (const elem of el) {
        elem.querySelector('.question-option img').classList.add('opacity');
        elem.removeAttribute('onclick');
        if (elem.classList.contains('true')) {
            elem.querySelector('.question-option p').style.color = "#009c22";
        } else {
            elem.querySelector('.question-option p').style.color = "#ff4b4b";
        }
    }
    param.querySelector('.question-option img').classList.remove('opacity');
    const nextElement = param.parentElement.parentElement.nextSibling;
    
    function scrollNext() {
        nextElement.scrollIntoView();
    }

    setTimeout(scrollNext, 2000);
}

// volta para a página inicial
function returnHome() {
    document.querySelector('.seccond-screen').classList.add('hidden');
    document.querySelector('.first-screen').classList.remove('hidden');
    window.scrollTo(0,0);
}

// reseta o quizz
function resetQuizz() {
    window.scrollTo({
    top: 0,
    behavior: 'smooth'
    });

    eraseAnswers();
}

// apaga as respostas
function eraseAnswers(param) {

    const el = document.querySelectorAll('.question-option p');
    //console.log(el);
    for (const elem of el) {
        elem.previousSibling.classList.remove('opacity');
        elem.setAttribute('onclick', "selectAnswer(this)");
        console.log(elem);
        if (elem.classList.contains(true)) {
            elem.parentElement.querySelector('.question-option p').style.color = "#000000";
        } else {
            elem.parentElement.querySelector('.question-option p').style.color = "#000000";
        }
    }
}
