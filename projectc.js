let gameSeq = [];
let userSeq = [];
let btns = ["red", "blue", "green", "purple"];

let started = false;
let level = 0;  
let h2 = document.querySelector("h2");
let startBtn = document.querySelector("#startBtn");

startBtn.addEventListener("click", function () {
    if (!started) {
        console.log("Game started");
        started = true;
        level = 0;
        leveUp();
    }
});

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);    
}

function leveUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * btns.length); 
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    
    gameSeq.push(randColor);
    console.log(gameSeq);
    btnFlash(randBtn);
}

function checkAnswer(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(leveUp, 1000);
        }
    } else {
        document.body.style.backgroundColor = "red";
        setTimeout(function () {
            document.body.style.backgroundColor = "white";
        }, 200);
        reset();
    }
}

function btnPress() {
    let btn = this;
    btnFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAnswer(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    gameSeq = [];
    userSeq = [];
    started = false;
    h2.innerHTML = `Game Over! Your score was ${level} <br>Press Start button to Restart`;
    level = 0;
}
