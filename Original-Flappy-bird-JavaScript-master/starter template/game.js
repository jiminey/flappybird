// select cvs

const cvs = document.getElementById("bird");
const ctx = cvs.getContext('2d');


//game vars and consts 

let frames = 0; 
    //looping will increment frames 



//load sprite image
const sprite = new Image(); 
sprite.src = "img/sprite.png";


//background 
const bg = {
    sX: 0, 
    sY: 0,
    w: 275, 
    h: 226,
    x: 0, 
    y: cvs.height - 226,


    draw: function() {
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h); 
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + this.w, this.y, this.w, this.h); 
    }
    // drawimage takes in (sprite, sx,sy ,swidth, sheight, dx, dy, dw,dh )
    // s = src image, and d = destination canvas
}   


const fg = {
    sX: 276,
    sY: 0,
    w: 224,
    h: 112,
    x: 0,
    y: cvs.height - 112,
    
    draw: function () {
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + this.w, this.y, this.w, this.h);

    }

}

const getReady = {
    sX: 0,
    sY: 228,
    w: 173,
    h: 152,
    x: cvs.width / 2 - 173 / 2,
    y: 80,

    draw: function () {
        if (state.current == state.getReady) {
            ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        }
    }

}


const gameOver = {
    sX: 175,
    sY: 228,
    w: 225,
    h: 202,
    x: cvs.width / 2 - 225 / 2,
    y: 90,

    draw: function () {
        if (state.current == state.over) {
            ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        }
    }

}

const bird = {
    animation : [
        { sX: 276, sY: 112 },
        { sX: 276, sY: 139 },
        { sX: 276, sY: 164 },
        { sX: 276, sY: 139 }
    ], 

    x: 50,
    y: 150,
    w: 34,
    h: 26,

    frame : 0,

    draw: function () {
        let bird = this.animation[this.frame];

        ctx.drawImage(sprite, bird.sX, bird.sY, this.w, this.h, this.x, this.y, this.w, this.h);

    }

}
//draw 

function draw() {
    ctx.fillStyle = "#70c5ce";
    ctx.fillRect(0, 0, cvs.width, cvs.height)
        //rect has same dimension as canvas
    bg.draw();
    fg.draw(); 
    bird.draw();

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

loop(); 