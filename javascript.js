/* Learned from The Complete 2020 Web Developer Bootcamp by Development Island */
/* Practiced it on my own */

// to check if playing or not (boolean) defaul is false
var playing = false;

var score;
var timeCount;
var setTime;
var correctAnswer;

// if clicked on the start/reset button
document.getElementById("startreset").onclick = function(){
    // if playing
    if(playing){
        // reload the page
        location.reload();
    }
    // not playing
    else{
        // set score to 0
        score = 0;
        document.getElementById("scorevalue").innerHTML = score;

        // set playing to true
        playing = true;

        // show countdown box
        show("timeremaining");

        // check time count
        timeCount = 60;
        document.getElementById("timeremainingvalue").innerHTML = timeCount;
        checkTime();

        // hide gameover message
        hide("gameOver");

        // change button text to "Reset Game"
        document.getElementById("startreset").innerHTML = "Reset Game";

        // generate new Q&A
        generateQA();
    }
}

// if clicked on an answer box
for(i=1;i<5;i++){
    document.getElementById("box"+i).onclick = function(){
        // if playing
        if(playing){
            // correct?
            if(this.innerHTML == correctAnswer){
                // increase score by 1
                score += 1;
                document.getElementById("scorevalue").innerHTML = score;
                // show correct box for one sec
                hide("wrong");
                show("correct");
                setTimeout(() => {
                    hide("correct");
                }, 1000);
                // generate new Q&A
                generateQA();
            }
            // wrong?
            else{
                // show try again box for one sec
                hide("correct")
                show("wrong")
                setTimeout(() => {
                    hide("wrong");
                }, 1000);
            }
        }
    }
}

// functions
// to display content
function show(id){
    // id (str)
    document.getElementById(id).style.display = "block";
}

// to hide content
function hide(id){
    // id (str)
    document.getElementById(id).style.display = "none";
}

// to stop setTime (time counter) (interval)
function stopInterval(){
    clearInterval(setTime);
}

// function: to check time count
function checkTime(){
    // time (number)
    setTime = setInterval(() => {
        timeCount -= 1;
        document.getElementById("timeremainingvalue").innerHTML = timeCount;

        // time left?
        // yes -> continue
        // no
        if(timeCount == 0){
            // stop interval
            stopInterval();
            // show game over message 
            show("gameOver");
            document.getElementById("gameOver").innerHTML = "<p>Game Over!</p><p>Your Score is " + score + ".</p>"
            // change the button back to "start game"
            document.getElementById("startreset").innerHTML = "Start Game";
            // hide timeremaing
            hide("timeremaining");
            // hide correct & wrong meesage
            hide("correct");
            hide("wrong");

            // playing
            playing = false;
        }
    }, 1000);
}

// to generate new questions and answers
function generateQA(){
    // two random number (1-10)
    var numberOne = 1+Math.round(Math.random()*9);
    var numberTwo = 1+Math.round(Math.random()*9);

    document.getElementById("question").innerHTML = numberOne + " x " + numberTwo;

    // correctAnswer
    correctAnswer = numberOne*numberTwo;
    // answers list that will contain all answers including correctAnswer
    var answers = [correctAnswer];

    // put correctAnswer in one of the box
    // correctAnswerPosition (1-4)
    var correctAnswerPosition = 1+Math.round(Math.random()*3);
    document.getElementById("box"+correctAnswerPosition).innerHTML = correctAnswer;

    // wrong answers
    // avoid correctAnswerPosition and put 3 different answers
    for(i=1;i<5;i++){
        if(i != correctAnswerPosition){
            // check if there is duplication answer in the answer list
            do{
                var wrongAnswer;
                wrongAnswer = (1+Math.round(Math.random()*9))*(1+Math.round(Math.random()*9));
            }while(answers.indexOf(wrongAnswer)>-1)

            document.getElementById("box"+i).innerHTML = wrongAnswer;

            // push the wrongAnswer to answer list
            answers.push(wrongAnswer);
            // console.log(answers);
        }
    }
}