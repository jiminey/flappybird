// select cvs

const cvs = document.getElementById('bird');
const ctx = cvs.getContext('2d');


//game vars and consts 

let frames = 0; 
    //looping will increment frames 



//load sprite image
const sprite = new Image(); 
sprite.src = 'img/sprite.png'


//background 
const bg = {
    sX: 0, 
    sY: 0,
    w: 275, 
    h: 226,
    x: 0, 
    y: cvs.height - 226,


    draw : function () {
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this,y, this.w, this.h); 
    }
    // drawimage takes in (sprite, sx,sy ,swidth, sheight, dx, dy, dw,dh )
    // s = src image, and d = destination canvas
}   

//draw 

function draw() {
    ctx.fillStyle = "#70c5ce";
    ctx.fillRect(0, 0, cvs.width, cvs.height);

    bg.draw(); // draw bg
}

//update 

function update() {
}

//loop

function loop() {
    update();
    draw(); 
    frames++; 

    requestAnimationFrame(loop); 
    //this rerenders the page so bird and pipe moves 
}