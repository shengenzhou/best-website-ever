var quiz = JSON.parse(localStorage.quizResults);

function displayResults() {
    document.getElementById("background").style.display = "none";
    const [correct, incorrect, incomplete] = results()
    const grade = correct / (Object.keys(quiz.questions).length) * 100;
    document.getElementById("pie").style.setProperty("--p", grade)
    document.getElementById("pie").innerHTML = grade + "%";
    if (grade < 50) {
        document.getElementById("feedback").innerHTML = "ben je aap ofzo";
    }
    else if (70 > grade >= 50) {
        document.getElementById("feedback").innerHTML = "blijf oefenen";
    }
    else if (100 > grade >= 70) {
        document.getElementById("feedback").innerHTML = "goed gedaan";
    }
    else if (grade == 100) {
        document.getElementById("feedback").innerHTML = `<img src="static/greenbean.jpg>`;
    }
}

for (var i = 0; i < Object.keys(quiz.questions).length; i++) {
    document.getElementById("buttonBar").innerHTML += '<button class=button2 id=button'+ i + ' onclick=displayExcersise('+ i + ');>' + (i + 1) + '</button>';
    if (quiz.questions[i].userResult == true) {
        document.getElementById('button' + i).style.color = "green";
    }
    else if (quiz.questions[i].userResult == false) {
        document.getElementById('button' + i).style.color = "red";
    }
    else {
        document.getElementById('button' + i).style.color = "yellow";
    }
}

function results() {
    var correct = 0;
    var incorrect = 0;
    var incomplete = 0;
    for (var j = 0; j < Object.keys(quiz.questions).length; j++) {
        if (quiz.questions[j].userAnswer === `<input class="input" id=userAnswer` + j + `></input>`) {
            incomplete++;
        }
        else if (quiz.questions[j].userResult == true) {
            correct++;
        }
        else if (quiz.questions[j].userResult == false) {
            incorrect++;
        }
    }
    return [correct, incorrect, incomplete]
}

index = 0;
function displayExcersise(i) {
    document.getElementById("feedback").style.display = "none";
    index = i;
    let q = "";
    let a = "";
    q += quiz.questions[i].id + ". ";
    q += quiz.questions[i].context + "<br>";
    q += quiz.questions[i].question + "<br><br>";
    a += "antwoord: ";
    a += quiz.questions[i].correct_answer + "<br>";
    a += "uitleg: " + quiz.questions[i].explanation + "<br><br>";
    if (quiz.questions[i].userAnswer === "" || quiz.questions[i].userAnswer === `<input class="input" id=userAnswer` + i + `></input>`)
    {
        a += "jouw antwoord: ...";
    }
    else {
        a += "jouw antwoord: " + quiz.questions[i].userAnswer;
    }
    
    document.getElementById("questions").innerHTML = q;
    document.getElementById("correctAnswer").innerHTML = a;
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

results()
displayResults()