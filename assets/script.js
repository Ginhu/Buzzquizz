

function getQuizzes (param) {
    axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes').then(param);
}

function show(param) {
    console.log(param.data[1]);
    const data = param.data;

    for (let i = 0; i < data.length; i++) {
    document.querySelector('.all-quizzes-display').innerHTML += `<div class="your-quizz id${data[i].id}" onclick="clickQuizz(this)">
    <p>${param.data[i].title}</p>
    </div>`;

    document.querySelector('.all-quizzes-display').lastChild.style.background = `linear-gradient(to bottom, transparent 70%, #000000 98%), url(${data[i].image}) no-repeat center center`;
    console.log(param.data[i]);
    }
}

getQuizzes(show);

function clickQuizz (param) {
    /* console.log(param); */
    const idQuizz = parseInt(param.classList.value.slice(13));
    /* console.log(idQuizz); */
    document.querySelector('.first-screen').classList.add('hidden');
    document.querySelector('.seccond-screen').classList.remove('hidden');

    function fillQuizz(param) {
        const data = param.data;
        
        for (let i = 0; i<data.length; i++) {
            if (data[i].id == idQuizz) {
                const quizzData = data[i];
                const question = quizzData.questions;
                
                console.log(quizzData);
                /* console.log(question); */

                function fillHeader () {
                    document.querySelector('.top-banner-title').style.background = `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${quizzData.image}) no-repeat center center`;
                    document.querySelector('.top-banner-title p').innerHTML = quizzData.title; 
                }

                function fillQuestionAnswers () {

                    for (let i = 0; i<question.length; i++) {
                        const answer = question[i].answers;
                        /* console.log(answer); */

                        document.querySelector('.quizz-question').innerHTML += 
                        `<div class="question">
                            <p>${question[i].title}</p>                   
                        </div>`
                        document.querySelector('.quizz-question').lastChild.style.backgroundColor = quizzData.questions[i].color;
                        document.querySelector('.quizz-question').innerHTML += '<div class="question-options-display"></div>'

                        for (let a = 0; a<answer.length; a++) {
                            document.querySelector('.quizz-question').lastChild.innerHTML += 
                            `<div class="question-option">
                                <img src="${answer[a].image}" alt="">
                                <p>${answer[a].text}</p>
                            </div>`
                        }
                    }
                }

                

            }
        }

        fillHeader();
        fillQuestionAnswers();
        
    }

    getQuizzes(fillQuizz);
    
}