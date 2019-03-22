var gameBox = $("#game-box");
var timerStart = 15;

$(document).on("click", "#start-over", function(){
    $("#game-box").empty();
    gameState.reset();
});

$(document).on("click", "#start", function() {
    $("#wrapper").prepend('<h2>Time Remaining: <span id="counter-start">15</span> Seconds</h2>');
    $("#start, #tagline").hide();
    gameState.start();
});

$(document).on("click", "#answer-button", function(event) {
    gameState.clicked(event);
});

var questions = [{
    question: "What is the color of Luke Skywalker's lightsaber?",
    answers: ["Blue", "Green", "Red", "Purple"],
    correctA: "Green",
    },
    {
    question: "How quickly did Han Solo fly the Kessel Run in the Millennium Falcon?",
    answers: [14, 9, 10, 12],
    correctA: 12,
    },
    {
    question: "What is the name of the first planet destroyed by the Empire?",
    answers: ["Alderaan", "Tattooine", "Scarif", "Dantooine"],
    correctA: "Alderaan",
    },
    {
    question: "How many forms of communication can C-3PO speak fluently?",
    answers: ["2 million", "4 million", "6 million", "8 million"],
    correctA: "6 million",
    },
    {
    question: "What kind of droid is R2-D2?",
    answers: ["Protocol Droid", "Astro Droid", "Probe Droid", "Battle Droid"],
    correctA: "Astro Droid",
    },
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
            gameBox.append('<button type="button" class="btn btn-outline-secondary mx-2" id="answer-button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i]+ '</button><br><br>');
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
            setTimeout(gameState.results, 3000);
        } else {
            setTimeout(gameState.next, 3000);
        }
    },

    incorrectAnswer: function() {
        clearInterval(timer);
        gameState.incorrect++;
        gameBox.html('<h2>Wrong!</h2>');
        gameBox.append('<h2>The Correct Answer Was: ' + questions[gameState.currentQuestion].correctA + '</h2>');

        if (gameState.currentQuestion === questions.length - 1){
            setTimeout(gameState.results, 3000);
        } else {
            setTimeout(gameState.next, 3000);
        }
    },

    clicked: function(event) {
        clearInterval(timer);

        if ($(event.target).data("name") === questions[this.currentQuestion].correctA){
            this.correctAnswer();
        } else {
            this.incorrectAnswer();
        }
    },

    timeUp: function() {
        clearInterval(timer);
        $("#counter-start").html(gameState.timer);
        
        gameBox.html('<h2>Out of Time!</h2>');
        gameBox.append('<h2>The Correct Answer Was: ' + questions[this.currentQuestion].correctA);

        if (gameState.currentQuestion === questions.length - 1){
            setTimeout(gameState.results,3000);
        } else {
            setTimeout(gameState.next, 3000);
        }
    },

    results: function() {
        clearInterval(timer);

        gameBox.html('<h2>Well done, my young Padawan Learner! Here\'s how you did!');
        $('#counter-start').html(gameState.timer);
        gameBox.append('<h3>Correct Answers: ' + gameState.correct + '</h3>');
        gameBox.append('<h3>Wrong Answers: ' + gameState.incorrect + '</h3>');
        gameBox.append('<h3>Unanswered: ' + (questions.length -(gameState.incorrect+gameState.correct)) + '</h3>');
        gameBox.append('<button type="button" class="btn btn-outline-secondary btn-lg" id="start-over">Start Over?</button>');
    },

    reset: function() {
        this.currentQuestion = 0;
        this.timer = timerStart;
        this.correct = 0;
        this.incorrect = 0;
        this.start();
    }
};