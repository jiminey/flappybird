// select cvs

const cvs = document.getElementById("bird");
const ctx = cvs.getContext('2d');


//game vars and consts 

let frames = 0; 
    //looping will increment frames 
const DEGREE = Math.PI/180; 


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
    dx : 2, 
    
    draw: function () {
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + this.w, this.y, this.w, this.h);

    },

    update: function() {
        if(state.current == state.game) {
            this.x = (this.x - this.dx) % (this.w/2)
        }
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
//game state 

const state = {
    current: 0,
    getReady: 0,
    game: 1,
    over: 2
}

//control the game

cvs.addEventListener("click", function(evt){
    switch(state.current) {
        case state.getReady:
            state.current = state.game;
            break; 
        case state.game: 
            bird.flap();
            break; 
        case state.over:
            state.current = state.getReady;
            break;
    }
})

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
    gravity : 0.25,
    jump : 4.6,
    speed : 0,
    rotation : 0, 

    draw: function () {
        let bird = this.animation[this.frame];

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.drawImage(sprite, bird.sX, bird.sY, this.w, this.h,- this.w/2 , - this.h/2, this.w, this.h);
        
        ctx.restore(); 
    },
    
    flap: function(){
        this.speed =- this.jump; 
    },

    update: function() { 

        // IF THE GAME STATE IS GET READY STATE, THE BIRD MUST FLAP SLOWLY
        this.period = state.current == state.getReady ? 10 : 5;
        // WE INCREMENT THE FRAME BY 1, EACH PERIOD
        this.frame += frames % this.period == 0 ? 1 : 0;
        // FRAME GOES FROM 0 To 4, THEN AGAIN TO 0
        this.frame = this.frame % this.animation.length;
        

        if (state.current == state.getReady) {
            this.y = 150; // reset pos
            this.rotation = 0 * DEGREE;
        } else {
            this.speed += this.gravity; // this is pos velocity

            this.y += this.speed; // this changes y position of the bird with speed 
            
            if(this.y + this.h/2 >= cvs.height - fg.h) {
                this.y = cvs.height - fg.h - this.h/2;
                if (state.current == state.game){
                    state.current = state.over; 
                }
            }

            //if speed is greater than jump than bird fall down 
            if (this.speed >= this.jump) {
                this.rotation = 90 * DEGREE; 
                this.frame = 1; 
            } else {
                this.rotation = -25 * DEGREE; 
            }
        }
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
    getReady.draw();
    gameOver.draw();
}

//update 

function update() {
    bird.update();
    fg.update(); 

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