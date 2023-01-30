
const firstScreen = document.querySelector(".first-screen");
const basicInfo = document.querySelector(".basic-info-screen");
const questionScreen = document.querySelector(".question-screen");
const levelScreen = document.querySelector(".level-screen");
const quizzReadyscreen = document.querySelector(".quizz-ready");
const quizzEmpty = document.querySelector(".create-quizz-empty");
const quizzFilled = document.querySelector(".create-quizz-filled");
const temporaryLevelObject = [], arrayCheckLevel0 = [];

const title = document.getElementById("title");
const imageQuizz = document.getElementById("image-quizz");
const questionsAmount = document.getElementById("questions-amount");
const levelsAmount = document.getElementById("levels-amount");

let idQuizz, quizzData, correctAnswerCounter = 0, selectedAnswerCounter = 0;

function createQuizz() {
    firstScreen.classList.add("hidden");
    basicInfo.classList.remove("hidden");
    window.scrollTo(0, 0); 
}

function createQuizz() {
    firstScreen.classList.add("hidden");
    basicInfo.classList.remove("hidden");
    window.scrollTo(0, 0); 
}

function basicInfoValidation() {
    // validação do título do quiz
    if (title.length < 20 || title.length > 65) {
        alert('Quantidade de caracteres inválida! Insira título entre 20 e 65 caracteres.');
        createQuizz();
    }
    // validação da URL das imagens de resposta
    const checkURL = validURL(imageQuizz);
    if (checkURL !== true) {
        alert('URL inválida. Tente novamente!');
        createQuizz();
    }

    // validação de quantidade de perguntas
    if (questionsAmount < questionsAmount.minValue) {
        alert('A quantidade mínima de perguntas é 3!');
        createQuizz();
    }
    // validação de quantidade de níveis
    if (levelsAmount < levelsAmount.minValue) {
        alert('A quantidade mínima de níveis é 2!');
        createQuizz();
    }
}

function createQuizzValidation() {
    basicInfoValidation();
    //questionsValidation();
}

function proceedCreatequestions() {
    basicInfo.classList.add("hidden");
    questionScreen.classList.remove("hidden");
    window.scrollTo(0, 0); 

    createQuizzValidation()
}

function openQuestion (element){
    window.scrollTo(0, 0);
    const nameQuestion = document.querySelector(".question-screen span");
    const lastNameQuestion = nameQuestion.innerHTML;
    
    const questionhidden = element.parentElement;
    const nameQuestionhidden = questionhidden.querySelector("span");
    
    nameQuestion.innerHTML = nameQuestionhidden.innerHTML;
    nameQuestionhidden.innerHTML = lastNameQuestion;
}

function proceedLevelscreen(){
    questionScreen.classList.add("hidden");
    levelScreen.classList.remove("hidden");
    window.scrollTo(0, 0); 

}

function proceedfinishQuizz(){

    if (document.querySelector('.level1 input').value != "") {
        checkLevelInputs("level1 input");
        /* console.log("checando lvl1 input"); */
    }

    if (document.querySelector('.level2 input').value != "") {
        checkLevelInputs("level2 input");
        /* console.log("checando lvl2 input"); */
    }

    if (document.querySelector('.level3 input').value != "") {
        checkLevelInputs("level3 input");
        /* console.log("checando lvl3 input"); */
    }

    if (arrayCheckLevel0.includes('0') == true) {
        levelScreen.classList.add("hidden");
        quizzReadyscreen.classList.remove("hidden");
        window.scrollTo(0, 0);
    } else {
        alert('Deve existir ao menos um nível com valor 0% de acerto');
        temporaryLevelObject.length = 0;
        arrayCheckLevel0.length = 0;
    }
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
    idQuizz = parseInt(param.classList.value.slice(13));
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
                quizzData = data[i];
                const question = quizzData.questions;
                
                /* console.log(quizzData); */
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
// Função que executa a edição das imagens da respostas assim como os texto para indicar se a resposta está correta ou não
function selectAnswer(param) {
    param.classList.add('selected-answer'); 
    selectedAnswerCounter++;

    if(param.classList.contains('true') == true && param.classList.contains('selected-answer')) {
        correctAnswerCounter ++;
        /* console.log(correctAnswerCounter); */
    }
    /* console.log(param); */
    // className está recebendo um pedaço do valor total da classe que indica qual é a pergunta ou grupo de respostas dentro do quizz
    const className = `.${param.classList.value.slice(16, 18)}`;
    // el recebe todas as respostas que possuem a classe que indica a qual pergunta ela pertence dentro do quizz
    const el = document.querySelectorAll(className);
    /* console.log(el); */

    // for of executa uma iteração entre todos os itens contidos em "el" manipulando seu respectivo conteudo "elem"
    for (const elem of el) {
        elem.querySelector('.question-option img').classList.add('opacity');
        elem.removeAttribute('onclick');

        // if para manipular a propriedade color do CSS de cada texto dentro do p
        if (elem.classList.contains('true')) {
            elem.querySelector('.question-option p').style.color = "#009c22";
        } else {
            elem.querySelector('.question-option p').style.color = "#ff4b4b";
        }
    }
    // esse param vai remover a classe de opacidade para que ela se diferencie das respostas não escolhidas
    param.querySelector('.question-option img').classList.remove('opacity');
    // nextElement vai selecionar o próximo elemento irmão para que ele seja trazido a tela no scrollIntoView()
    const nextElement = param.parentElement.parentElement.nextElementSibling;
    
    // definindo a função scrollNext() que será executada no setTimeout para trazer a proxima questão para a tela.
    function scrollNext() {
        nextElement.scrollIntoView();
    }
    // executando o setTimeout para trazer a próxima pergunta para a tela
    setTimeout(scrollNext, 2000);

    /* console.log(quizzData); */
    if (selectedAnswerCounter == quizzData.questions.length) {
        endQuizzShowResults(correctAnswerCounter);
        setTimeout(scrollNext, 2000);
    }
}

function showNextLevel(param) {
    param.parentElement.classList.toggle('hidden');
    param.parentElement.nextElementSibling.classList.toggle('hidden');
    /* console.log(document.querySelector('.level input').value.length); */
}

function showPreviousLevelState(param) {
    param.parentElement.parentElement.classList.toggle('hidden');
    param.parentElement.parentElement.previousElementSibling.classList.toggle('hidden');
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
    selectedAnswerCounter = 0;
    correctAnswerCounter = 0;
    document.querySelector('.end-quizz').classList.toggle('hidden');
    eraseAnswers();
}

// apaga as respostas
function eraseAnswers(param) {

    const el = document.querySelectorAll('.question-option p');
    /* console.log(el); */
    for (const elem of el) {
        elem.previousElementSibling.classList.remove('opacity');
        elem.parentElement.setAttribute('onclick', "selectAnswer(this)");
        /* console.log(elem); */
        if (elem.classList.contains(true)) {
            elem.parentElement.querySelector('.question-option p').style.color = "#000000";
        } else {
            elem.parentElement.querySelector('.question-option p').style.color = "#000000";
        }
    }
}

function validURL (string) {
    try {
        new URL(string);
        return true;
    } catch (err) {
        return false;
    }
}

function checkLevelInputs (param) {
    const firstInput = document.querySelector(`.${param}`);
    const seccondInput = firstInput.nextElementSibling;
    const thirdInput = seccondInput.nextElementSibling;
    const forthInput =  thirdInput.nextElementSibling;
    arrayCheckLevel0.push(seccondInput.value);
    /* console.log(arrayCheckLevel0); */

    const checkURL = validURL(thirdInput.value);
    if (firstInput.value.length < 10 || seccondInput.value <0 || seccondInput.value>100 || checkURL == false || forthInput.value.length < 30) {
        alert('Entrada de dados inválida. Tente novamente!');
    } else {
        temporaryLevelObject.push({minValue: seccondInput.value, text: forthInput.value, image: thirdInput.value, title: firstInput.value});
        /* console.log(temporaryLevelObject); */
        
    }
}

function endQuizzShowResults (param) {
    const rightAnswers = Math.round((param/selectedAnswerCounter)*100);
    let levels = [];
    const el = quizzData.levels;
    
    for (let elem of el) {
        levels.push(elem.minValue);
    }

    levels.sort((a,b)=>a-b);

    if (levels.length == 1 || (levels.length == 2 && rightAnswers >= levels[0] && rightAnswers < levels[1]) || (levels.length == 3 && rightAnswers >= levels[0] && rightAnswers < levels[1])) {
        for (let i = 0; i < quizzData.levels.length; i++) {
            const quizzLevelsIncludes = quizzData.levels[i];
            if (quizzLevelsIncludes.minValue == levels[0]) {
                document.querySelector('.end-quizz-result p').innerHTML = `${rightAnswers}% de acerto: ${quizzLevelsIncludes.title}`;
                document.querySelector('.end-results-details-img').style.background = `url(${quizzLevelsIncludes.image}) no-repeat center center`;
                document.querySelector('.end-results-details-text p').innerHTML = quizzLevelsIncludes.text;
                document.querySelector('.end-quizz').classList.toggle('hidden');
                console.log(quizzLevelsIncludes)
                console.log(levels)
            }
        }

    } else if ((levels.length == 2 && rightAnswers >= levels[1]) || (levels.length == 3 && rightAnswers >= levels[1] && rightAnswers < levels[2])) {
        for (let i = 0; i < quizzData.levels.length; i++) {
            const quizzLevelsIncludes = quizzData.levels[i];
            if (quizzLevelsIncludes.minValue == levels[1]) {
                document.querySelector('.end-quizz-result p').innerHTML = `${rightAnswers}% de acerto: ${quizzLevelsIncludes.title}`;
                document.querySelector('.end-results-details-img').style.background = `url(${quizzLevelsIncludes.image}) no-repeat center center`;
                document.querySelector('.end-results-details-text p').innerHTML = quizzLevelsIncludes.text;
                document.querySelector('.end-quizz').classList.toggle('hidden');
                console.log(quizzLevelsIncludes)
                console.log(levels)
            }
        }
    } else {
        for (let i = 0; i < quizzData.levels.length; i++) {
            const quizzLevelsIncludes = quizzData.levels[i];
            /* if (quizzLevelsIncludes.minValue >= levels[2]) { */
                document.querySelector('.end-quizz-result p').innerHTML = `${rightAnswers}% de acerto: ${quizzLevelsIncludes.title}`;
                document.querySelector('.end-results-details-img').style.background = `url(${quizzLevelsIncludes.image}) no-repeat center center`;
                document.querySelector('.end-results-details-text p').innerHTML = quizzLevelsIncludes.text;
                document.querySelector('.end-quizz').classList.toggle('hidden');
            /* } */
        }
    }
}