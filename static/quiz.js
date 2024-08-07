var index = 0;
window.onload = function() {
        displayExcersise(0);
        
    }
    
for (var j = 0; j < Object.keys(quiz.questions).length; j++) {
    document.getElementById("buttonBar").innerHTML += '<button class=button2 id=button'+ j + ' onclick=displayExcersise('+ j + ');>' + (j + 1) + '</button>';
    quiz.questions[j]["userAnswer"] = `<input class="input" id=userAnswer` + j + `></input>`;   
}

function displayExcersise(i) {
    index = i;
    document.getElementById("answerDiv").style.display = "none";
    document.getElementById("result").style.display = "none";
    let q = "";
    let a = "";
    q += quiz.questions[i].id + ". ";
    q += quiz.questions[i].context + "<br>";
    q += quiz.questions[i].question + "<br><br>";
    q += quiz.questions[i].userAnswer;
    a += "antwoord: ";
    a += quiz.questions[i].correct_answer + "<br>";
    a += "uitleg: " + quiz.questions[i].explanation + "<br><br>";
    
    document.getElementById("questions").innerHTML = q;
    document.getElementById("correctAnswer").innerHTML = a;
    document.getElementById("userAnswer" + index).addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
          event.preventDefault();
          document.getElementById("enterAnswer").click();
        }
      });
}

function nextExcersise() {
    if (index < Object.keys(quiz.questions).length - 1) {
        index++;
        displayExcersise(index);
    }
        
}

function previousExcersise() {
    if (index > 0) {
        index--;
        displayExcersise(index);
    }
        
}

function toggleAnswer() {
    var x = document.getElementById("answerDiv");
        if (x.style.display === "none") {
            x.style.display = "block";
            var input = document.getElementById("userAnswer" + index).value;
            document.getElementById("userAnswer").innerHTML = "jouw antwoord: " + input;
            
        } 
        else {
            x.style.display = "none";
        }
  
}

function checkAnswer(answer) {
    if (answer === "correct") {
        document.getElementById('button' + index).style.color = "green";
        quiz.questions[index]["userResult"] = true;
        var input = document.getElementById("userAnswer" + index).value;
        quiz.questions[index].userAnswer = input;
    }
    else if (answer === "incorrect") {
        document.getElementById('button' + index).style.color = "red"
        quiz.questions[index]["userResult"] = false;
        var input = document.getElementById("userAnswer" + index).value;
        quiz.questions[index].userAnswer = input;
    }
    if (index == Object.keys(quiz.questions).length - 1) {
        document.getElementById("result").style.display = "block";
        localStorage.quizResults=JSON.stringify(quiz);
    }
}

function saveResults() {
    localStorage.quizResults=JSON.stringify(quiz);

}

