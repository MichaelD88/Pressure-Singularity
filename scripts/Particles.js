class Pair{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

class Particle{
    constructor(pos, dir, color, size){
        this.pos = pos;
        this.dir = dir;
        this.color = color
        this.size = size;
        this.bounceCD = 0;
    }
}

function updateParticles(){
    let l = Math.floor(Math.log(Game.resources[MASS])/Math.log(10**3))*3;
    let nonredness = (-17*Math.log10(Game.resources[TEMPERATURE]) + 255);
    let color = "rgb(255, "+nonredness+", "+nonredness+")";
    if(Game.particleLevel != l){
        Game.particleLevel = l;
        removeParticles(Game.particles.length);
    }
    for(let i = 0; i < Math.floor(Game.resources[MASS]/(10**(l))) - Game.particles.length; i++){
        Game.particles.push(new Particle(randomLocation(), randomDirection(), color, Math.log(l+2)));
    }
}

function randomLocation(){
    let x = Math.random()*Game.gasCanvas.width*.9+Game.gasCanvas.width/9/2;
    let y = Math.random()*Game.gasCanvas.width*.9+Game.gasCanvas.width/9/2;
    return new Pair(x, y);
}

function randomDirection(){
    let x = Math.random()*2 - 1;
    let y = Math.random()*2 - 1;
    let tempx = x;
    x = x/Math.sqrt(x*x + y*y);
    y = y/Math.sqrt(tempx*tempx + y*y);
    return new Pair(x, y);
}


function removeParticles(amt){
    for(let i = 0; i < amt; i++){
        Game.particles.pop();
    }
}

const PI2 = 2*Math.PI;
const PI6 = Math.PI/6;
const PI12 = Math.PI/12;
const PI24 = Math.PI/24;

let previousTimeStamp = 0;
function renderParticles(timeStamp){
    const elapsed = timeStamp - previousTimeStamp;
    
    Game.gasCanvasCtx.clearRect(0, 0, Game.gasCanvas.width, Game.gasCanvas.height);
    
    for(i in Game.particles){
        Game.gasCanvasCtx.beginPath();
        Game.gasCanvasCtx.fillStyle = Game.particles[i].color;
        updateParticlePosition(Game.particles[i], elapsed);
        Game.gasCanvasCtx.arc(Game.particles[i].pos.x, Game.particles[i].pos.y, 
            Game.gasCanvas.width/200*Game.particles[i].size, 0, PI2, true);
        Game.gasCanvasCtx.closePath();
        Game.gasCanvasCtx.save();
        Game.gasCanvasCtx.fill();
        Game.gasCanvasCtx.restore();
        
    }
    
    previousTimeStamp = timeStamp;
    window.requestAnimationFrame(renderParticles);
}

function outOfBounds(p){
    let radius = Game.gasCanvas.width/2;
    if((p.pos.x - radius)*(p.pos.x - radius) + (p.pos.y - radius)*(p.pos.y - radius) > (radius)*(radius)){
        return true;
    } else {
        return false;
    }

}

function wayOutOfBounds(p){
    let offset = -5;
    let r = Game.gasCanvas.width/2 - offset;
    let x = p.pos.x - offset
    let y = p.pos.y - offset;
    if((x - r)*(x - r) + (y - r)*(y - r) > (r)*(r)){
        return true;
    } else {
        return false;
    }

}

function speedFunction(temp){
    return 0.359*Math.log(209.48*temp);
}

function updateParticlePosition(p, timeStep){
    if(wayOutOfBounds(p)){
        p.pos = new Pair(Game.tankWidth/2, Game.tankWidth/2);
        p.dir = randomDirection();
    }
    else if(outOfBounds(p) && p.bounceCD <= 0){
        p.dir.x *= -1;
        p.dir.y *= -1;

        let randAngle = Math.random()*(PI6) - (PI12);
        let tempx = p.dir.x;
        p.dir.x = p.dir.x*(1-.5*(randAngle*randAngle)) - p.dir.y*randAngle; // sin and cos approximations :)
        p.dir.y = tempx*randAngle + p.dir.y*(1-.5*(randAngle*randAngle));
        p.bounceCD = 50;
    }

    p.bounceCD--;
    p.pos.x += speedFunction(Game.resources[TEMPERATURE]) * p.dir.x / 5;
    p.pos.y += speedFunction(Game.resources[TEMPERATURE]) * p.dir.y / 5;
}