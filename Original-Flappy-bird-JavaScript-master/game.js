// select cvs

const cvs = document.getElementById('bird');
const ctx = cvs.getContext('2d');


//game vars and consts 

let frames = 0; 

//draw 

function draw() {
    ctx.fillStyle = "#70c5ce";
    ctx.fillRect(0, 0, cvs.width, cvs.height);
}

//update 

function update() {

}g