var timeOut = 12;
var timeOutTextStart = "Time Remaining: ";
var timeOutTextEnd = " Seconds";
var intervalId;
var qDiv = document.getElementById("gameDiv");
var qH2 = [];
var qP = [];
var qInput = [];
var qSpan = [];
var correctAnswers = 0;
var inCorrectAnswers = 0;
var notAnswered = 0;
var startGame = document.getElementById("StartGame");


var triviaQuestions = [
    {
        name: "firstQ",
        question: "How many colours are in rainbow?",
        option: ["5", "7", "8", "2"],
        answer: "7",
        clicked: "false",
        answered: "false"
    },

    {
        name: "secondQ",
        question: "How many degrees are in circle?",
        option: ["120", "180", "360", "220"],
        answer: "360",
        clicked: "false",
        answered: "false"
    },

    {
        name: "thirddQ",
        question: "What is in mathematics the name for the bottom part of a fraction?",
        option: ["Modulus", "Denominator", "Numerator", "Remainder"],
        answer: "Denominator",
        clicked: "false",
        answered: "false"
    },

    {
        name: "fourthQ",
        question: "Which letter usually indicates the set of all real numbers in mathematics?",
        option: ["Z", "R", "N", "Q"],
        answer: "R",
        clicked: "false",
        answered: "false"
    },

    {
        name: "fifthhQ",
        question: " What is quantity of a 'great gross'?",
        option: ["3375", "1331", "1728", "2197"],
        answer: "1728",
        clicked: "false",
        answered: "false"
    }


];

$(".h2heading").text(timeOutTextStart + timeOut + timeOutTextEnd);
startGame.addEventListener("click", startCilcked);
doneGame.addEventListener("click", doneCilcked);

//Build quiz
for (var i = 0; i < triviaQuestions.length; i++) {
    var triviaQObj = triviaQuestions[i];

    qH2[i] = document.createElement("h2");
    qH2[i].setAttribute("class", "questions");
    qH2[i].innerHTML = triviaQObj.question;

    qDiv.appendChild(qH2[i]);

    qP[i] = document.createElement("p");
    qP[i].setAttribute("class", "answers");
    for (var j = 0; j < 4; j++) {
        qInput[j] = document.createElement("input");
        qInput[j].setAttribute("type", "radio");
        qInput[j].setAttribute("name", triviaQObj.name);
        qInput[j].setAttribute("onclick", "checkInput(this)");
        qInput[j].setAttribute("value", triviaQObj.option[j]);

        qP[i].appendChild(qInput[j]);

        qSpan[j] = document.createElement("span");
        qSpan[j].innerHTML = triviaQObj.option[j];
        qP[i].appendChild(qSpan[j]);

    }
    qDiv.appendChild(qP[i]);
}

function startCilcked() {
    document.getElementById("StartGame").style.display = "none";
    document.getElementById("gameDiv").style.display = "block";
    document.getElementById("doneDiv").style.display = "block";
    manageTimer();
};

function checkInput(obj) {
    var answerSelected = obj.getAttribute("value");
    var nameId = obj.getAttribute("name");
    var answerIs = "";

    var notClicked = 0;
    for (var i = 0; i < triviaQuestions.length; i++) {

        if (triviaQuestions[i].name === nameId) {
            answerIs = triviaQuestions[i].answer;
            triviaQuestions[i].clicked = "true";
            if (answerSelected === answerIs) {
                triviaQuestions[i].answered = "true";
            }
        }
    }
};

function manageTimer() {
    intervalId = setInterval(decrement, 1000);
};

function decrement() {
    timeOut--;
    $(".h2heading").text(timeOutTextStart + timeOut + timeOutTextEnd);
    if (timeOut === 0) {
        stop();

    };
}

function doneCilcked() {
    stop();
}

function stop() {
    clearInterval(intervalId);
    checkResults();
    showResults();
}

function showResults() {
    document.getElementById("gameDiv").style.display = "none";
    document.getElementById("doneDiv").style.display = "none";
    document.getElementById("resultDiv").style.display = "block";
}


function checkResults() {
    for (var i = 0; i < triviaQuestions.length; i++) {
        if (triviaQuestions[i].clicked === "false") {
            notAnswered += 1;
        }
        else {
            if (triviaQuestions[i].answered === "true") {
                correctAnswers += 1;
            }
            else {
                inCorrectAnswers += 1;
            }
        }

    }

    document.getElementById("correctAnswer").innerHTML = correctAnswers;
    document.getElementById("inCorrectAnswer").innerHTML = inCorrectAnswers;
    document.getElementById("unAnswered").innerHTML = notAnswered;
}

function reset() {
    notAnswered = 0;
    correctAnswers = 0;
    inCorrectAnswers = 0;

    for (var i = 0; i < triviaQuestions.length; i++) {
        triviaQuestions[i].clicked = "false";
        triviaQuestions[i].answered = "false";
    }
}
