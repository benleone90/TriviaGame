var gameBox = $("#game-box");
var timerStart = 5;

$(document).on("click", "#start", function() {
    $("#wrapper").prepend('<h2>Time Remaining: <span id="counter-start">30</span> Seconds</h2>');
    $("#start").hide();
    gameState.start();
});

var questions = [{
    question: "Q1",
    answers: ["A1", "A2", "A3", "A4"],
    correctA: "A1",
    },
    {
    question: "Q2",
    answers: ["A1", "A2", "A3", "A4"],
    correctA: "A2",
    },
    {
    question: "Q3",
    answers: ["A1", "A2", "A3", "A4"],
    correctA: "A3",
    },
    {
    question: "Q4",
    answers: ["A1", "A2", "A3", "A4"],
    correctA: "A4",
    }
];

var gameState = {
    questions: questions,
    currentQuestion: 0,
    timer: timerStart,
    correct: 0,
    incorrect: 0,
    countdown: function() {
        gameState.timer--;
        $("#counter-start").html(gameState.timer);

        if (gameState.timer === 0){
            gameState.timeUp();
        }
    },

    start: function() {
        timer = setInterval(gameState.countdown, 1000);
        gameBox.html('<h2>' + questions[this.currentQuestion].question + '</h2>' );
        for (var i = 0; i < questions[this.currentQuestion].answers.length; i++){
            gameBox.append('<button type="button" class="btn btn-outline-info" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i]+ '</button>');
        }
    },

    next: function() {
        gameState.timer = timerStart;
        $("#counter-start").html(gameState.timer);
        gameState.currentQuestion++;
        gameState.start();
    },

    correctAnswer: function() {
        clearInterval(timer);
        gameState.correct++;
        gameBox.html('<h2>Correct!</h2>');

        if (gameState.currentQuestion === questions.length - 1){
            setTimeout(#, 3*1000);
        } else {
            setTimeout(#, 3*1000);
        }
    },

    timeUp: function() {
        clearInterval(timer);
        $("#counter-start").html(gameState.timer);
        
        gameBox.html('<h2>Out of Time!</h2>');
        gameBox.append('<h2>The Correct Answer Was: ' + questions[this.currentQuestion].correctA);
    }
}