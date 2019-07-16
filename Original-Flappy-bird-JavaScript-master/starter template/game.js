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

const skeletonsprite = new Image(); 
skeletonsprite.src = "img/skeletonatk.png";

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
    dx : 8, 
    
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


const skeleton = {

    position : [], 

    animation: [
        
        { sX: 731, sY: 0 },
        { sX: 688, sY: 0 },
        { sX: 645, sY: 0 },
        { sX: 559, sY: 0 },
        { sX: 516, sY: 0 },
        { sX: 473, sY: 0 },
        { sX: 430, sY: 0 },
        { sX: 387, sY: 0 },
        { sX: 344, sY: 0 },
        { sX: 301, sY: 0 },
        { sX: 258, sY: 0 },
        { sX: 215, sY: 0 },
        { sX: 172, sY: 0 },
        { sX: 129, sY: 0 },
        { sX: 86, sY: 0 },
        { sX: 43, sY: 0 },
        { sX: 0, sY: 0 },
        
    ],
    

    w: 43,
    h: 37,
    dx: 8,
    frame: 0, 



    draw : function () {
        for (let i = 0; i < this.position.length; i++) {
            let p = this.position[i];
            let skeleton = this.animation[this.frame]
            
            ctx.drawImage(skeletonsprite, skeleton.sX, skeleton.sY, this.w, this.h, p.x , p.y, this.w * 2, this.h * 2);
        }

    },

    update : function () {
        this.period = state.current == state.getReady ? 6 : 5;
        this.frame += frames % this.period == 0 ? 1 : 0;
        this.frame = this.frame % this.animation.length;
        
        
        if (state.current !== state.game) return;
        
        //pushes skeletons in arr 
        if (frames % (50 + (Math.floor(Math.random() * 25)))  == 0) {
        // if (frames % Math.floor(400 * Math.random()) == 0) {
            this.position.push({
                x: cvs.width,
                y: cvs.height - fg.h - 37,
            });
        }
        
        for (let i = 0; i < this.position.length; i++) {
            let p = this.position[i];

            if (bird.x + bird.radius - 50 > p.x && bird.x - bird.radius < p.x + this.w && bird.y + bird.radius > p.y && bird.y - bird.radius < p.y + this.h) {
                state.current = state.over;
                skeleton.reset();
            }

            p.x -= this.dx;
            
            //removes skeleton 
            if (p.x + this.w + this.w <= 0) {
                this.position.shift();
            }
        }
        
    },

    reset: function () {
        this.position = [];
    },

    
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

document.addEventListener("keydown", function(evt) {
    if(evt.keyCode === 32) {
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

const score = {
    best: parseInt(localStorage.getItem("best")) || 0,
    value: 0,

    draw: function () {
        ctx.fillStyle = "#FFF";
        ctx.strokeStyle = "#000";

        if (state.current == state.game) {
            ctx.lineWidth = 2;
            ctx.font = "35px Teko";
            ctx.fillText(this.value, cvs.width / 2, 50);
            ctx.strokeText(this.value, cvs.width / 2, 50);

        } else if (state.current == state.over) {
            // SCORE VALUE
            ctx.font = "25px Teko";
            ctx.fillText(this.value, 225, 186);
            ctx.strokeText(this.value, 225, 186);
            // BEST SCORE
            ctx.fillText(this.best, 225, 228);
            ctx.strokeText(this.best, 225, 228);
        }
    },

    reset: function () {
        this.value = 0;
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
    radius: 12,

    frame : 0,
    gravity : 0.25,
    jump : 6.6,
    speed : 0,
    rotation : 0,
    jump_counter : 0,

    draw: function () {
        let bird = this.animation[this.frame];

        ctx.save();
        ctx.translate(this.x, this.y);
        // ctx.rotate(this.rotation);
        ctx.drawImage(sprite, bird.sX, bird.sY, this.w, this.h,- this.w/2 , - this.h/2, this.w, this.h);
        
        ctx.restore(); 
    },
    
    flap: function(){
        if (this.jump_counter > 0) {
            this.speed = -this.jump;
            this.y = this.y-1;
            this.jump_counter -= 1;
        }

    },

    update: function() { 

        // IF THE GAME STATE IS GET READY STATE, THE BIRD MUST FLAP SLOWLY
        this.period = state.current == state.getReady ? 10 : 5;
        // WE INCREMENT THE FRAME BY 1, EACH PERIOD
        this.frame += frames % this.period == 0 ? 1 : 0;
        // FRAME GOES FROM 0 To 4, THEN AGAIN TO 0
        this.frame = this.frame % this.animation.length;
        

        if (state.current == state.getReady) {
            this.y = cvs.height - fg.h - 100; // reset pos
            // this.rotation = 0 * DEGREE;
        } else {

            
            this.speed += this.gravity;
            //ground logic 
            if (this.y >= cvs.height - fg.h){
                this.y = cvs.height - fg.h;
                this.speed = 0; 
                this.jump_counter = 2; 

            }

            //air logic
            if (this.y < cvs.height - fg.h){
                this.y += this.speed; // this changes y position of the bird with speed 
            }

            





            //if speed is greater than jump than bird fall down 
            // if (this.speed >= this.jump) {
            //     this.rotation = 90 * DEGREE; 
            //     this.frame = 1; 
            // } else {
            //     this.rotation = -25 * DEGREE; 
            // }
        }
    }


}
//draw 

function draw() {
    ctx.fillStyle = "#70c5ce";
    ctx.fillRect(0, 0, cvs.width, cvs.height)
        //rect has same dimension as canvas
    bg.draw();
    // pipes.draw(); 
    fg.draw(); 
    bird.draw();
    skeleton.draw();
    getReady.draw();
    gameOver.draw();
}

//update 

function update() {
    bird.update();
    fg.update(); 
    skeleton.update(); 
    // pipes.update(); 
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