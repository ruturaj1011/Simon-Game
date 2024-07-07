let colorBtns = ["Green","Red","Yellow","Blue"];

let gameSeq = [];    //to store game sequence
let userSeq = [];   //to store user sequence

let started = false;  //to track game is started or not
let level = 0;  //to track score
let score = -1;

let highScore = 0;

let h2_highScr = document.querySelector(".logo-in h2");

let subHead_h2 = document.querySelector("h2");


// press enter to start the game

document.addEventListener("keypress", function(event){

    let key = event.code;

    if(started == false && key == "Enter"){
        console.log("Game started");
        started = true;

        levelUp();
    }
});


// gameflash btn

function gameFlash(btn){

    let prevColor = btn.style.backgroundColor;
    btn.style.backgroundColor = "white";

    setTimeout(function (){
        btn.style.backgroundColor = prevColor;
    }, 350);
}

// userflash btn

function userFlash(btn){

    let prevColor = btn.style.backgroundColor;
    btn.style.backgroundColor = "Black";

    setTimeout(function (){
        btn.style.backgroundColor = prevColor;
    }, 100);

}


// level up function

function levelUp(){

    userSeq = [];

    level++;
    score++;
    subHead_h2.innerText = `Level ${level} | Score : ${score}`;


    // random btn choice

    let randomIdx = Math.floor(Math.random() * 4);
    let randomClr = colorBtns[randomIdx];

    // let Randombtn = document.querySelector(`.${randomClr}`);

    gameSeq.push(randomClr);
    console.log(gameSeq);

    gameSeq.forEach((color, idx) => {

        setTimeout( () => {
            let btn = document.querySelector(`.${color}`);

            gameFlash(btn);
        }, idx*500); // Delay to show each color in sequence
    });
    
}


// for btn press

function btnPress(){

    if(started == true){

        let btn = this;

        // console.log(this.getAttribute("id"),this.classList[1]);

        userFlash(btn);

        let userColor = btn.getAttribute("id");

        userSeq.push(userColor);

        checkSeq(userSeq.length - 1);
    }
}


// to check sequence

function checkSeq(idx){
    
    if(userSeq[idx] == gameSeq[idx]){

        if(userSeq.length == gameSeq.length){

            setTimeout(levelUp, 1000);
        }
    }
    else{

        subHead_h2.innerHTML = `<b style="color: red;">Game Over!</b> Your score was <b>${score}</b>; <br> Press 'Enter' to restart.`;

        document.querySelector("body").style.backgroundColor = "Red";

        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "rgb(36, 31, 31)";
        }, 350);

        
        if(score > highScore){

            h2_highScr.innerText = `High Score : ${score}`;

            highScore = score;
        }

        reset();
    }
}


// access all btns and add event Listeners on them

    let allBtns = document.querySelectorAll(".btn");

    for(btn of allBtns){

        btn.addEventListener("click", btnPress);
    }


// to reset the game

function reset(){

    started = false;

    gameSeq = [];
    userSeq = [];
    level = 0;
    score = -1;
}