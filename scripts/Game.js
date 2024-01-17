const updateSpeed = 23;
const version = 1.0;

Game = {};
main();

window.onresize = updateTank;

function main(){
    if(!load(Game)){
        newGame(Game);
        let shopLoop = setInterval(updateShop, 1000);
        let i = setInterval(workBuildings, 1000/updateSpeed);
        window.requestAnimationFrame(renderParticles);
    } else {
        let shopLoop = setInterval(updateShop, 1000);
        let i = setInterval(workBuildings, 1000/updateSpeed);
        window.requestAnimationFrame(renderParticles);
    }

}

function newGame(){
    Game.version = version;
    Game.updateSpeed = updateSpeed;
    Game.pressure = 0;
    Game.resources = new Array(0, 1.4*10**18, 300);
    Game.gas = Argon;
    Game.buildings = new Array();
    Game.consumerBuildings = new Array();
    Game.format = "SI"
    Game.upgrades = new Array();
    Game.buildings = new Array();
    Game.particles = new Array();
    Game.gasCanvas = document.getElementById("gasCanvas");
    Game.gasCanvasCtx = Game.gasCanvas.getContext("2d");
    Game.particleSpeed = 1;
    Game.particleLevel = 0;
    Game.tankWidth = 0;
    Game.clickMult = 1;
    Game.won = false;
    document.getElementById("buildings").innerHTML = "";
    document.getElementById("upgrades").innerHTML = "";
    document.getElementById("formatButton").innerHTML = Game.format;
    playIntro();
    generateShopItems();
    updateDisplay();
    setupCanvas();
    setupTank();
}

function changeFormat(){
    if(Game.format == "SI"){
        Game.format = "Scientific"
        document.getElementById("formatButton").innerHTML = "Scientific";
    } else if (Game.format == "Scientific"){
        Game.format = "SI";
        document.getElementById("formatButton").innerHTML = "SI";
    }
    updateDisplay();
    loadShopItems();
}

function setupCanvas(){
    Game.gasCanvas = document.getElementById("gasCanvas");
    Game.gasCanvasCtx = Game.gasCanvas.getContext("2d");
    Game.gasCanvas.width = Game.tankWidth.toString();
    Game.gasCanvas.height = Game.tankWidth.toString();
}

function updateStats(){
    updatePressure();
    document.getElementById("Volume").innerHTML = formatNumber(Game.resources[VOLUME], 2);
    document.getElementById("Temperature").innerHTML = formatNumber(Game.resources[TEMPERATURE], 2);
    document.getElementById("Gas").innerHTML = Game.gas.name;
    document.getElementById("Mass").innerHTML = formatNumber(Game.resources[MASS], 2);
}

function updatePressure(){
    Game.pressure = Game.resources[TEMPERATURE] * 8.314 * Game.resources[MASS] / Game.gas.molarMass / Game.resources[VOLUME];
    if(Game.pressure >= 10**21 && Game.won == false){
        winGame();
    }
    document.getElementById("Pressure").innerHTML = formatNumber(Game.pressure, 2);
}

function winGame(){
    Game.won = true
    document.getElementById("body").innerHTML += `
    <div id="intro">
        <div class="spacer"></div>
        <div class="intro2">
            <div class="text-left">
            <p>The tank, now extremely pressurized to the theoretical point of collapse instead now contains a whole singularity.</p>
            <p>You really didn't think there was a material strong enough to resist a singularity, but here it is.</p>
            </div>
            <div class="spacer"></div>
            <p>This is the end of the game. I hope it was enjoyable :)</p>
            <p>You may go back and keep looking at your tank.</p>
            <button type="button" class="btn btn-primary sbtn" onclick="endIntro()">Go back</button>
        </div>
    </div>
    `
}

function updateDisplay(){
    updateStats();
    updateTank();
    updateShop();
}

function endIntro(){
    document.getElementById('intro').remove();
    setupCanvas();
}

function playIntro(){
    document.getElementById("body").innerHTML += `
    <div id="intro">
        <div class="spacer"></div>
        <div class="intro2">
            <div class="text-left">
            <p>You are a filthy rich engineer wandering through space in the year of 2477</p>
            <p>You come across a mysterious large body that isnt emitting any light.</p>
            <p>It turns out it is a huge spherical tank the size of a star.</p>
            <p>It is made out of an unknown substance, seemingly invincible and a perfect insulator.</p>
            <p>With your nigh-unending wealth, you get the sudden urge to pressueize the hell out of this thing until it becomes a black hole.</p>
            <p>Your also rich uncle had a lot of extra Argon lying around, so you will go ahead and use that.</p>
            <p>You don't remember the exact details because you're filthy rich, but you remember a super important law from high school chemistry:</p>
            <p>P=nRT/V</p>
            <p>You surmise 10e21 Pascals of pressure should do the trick.</p>
            <p></p>
            </div>
            <button type="button" class="btn btn-primary sbtn" onclick="endIntro()">Continue</button>
        </div>
    </div>
    `
}

function gasClick(){
    incMass(1*Game.clickMult);
}

function incResource(resource, amt){
    switch(resource){
        case "MASS":
            incMass(amt);
            break;
        case "VOLUME":
            incVolume(amt);
            break;
        case "TEMPERATURE":
            incTemperature(amt);
            break;
    }
}

function incMass(amt){
    Game.resources[MASS] = Game.resources[MASS] + amt;
    updateParticles();    
    document.getElementById("Mass").innerHTML = formatNumber(Game.resources[MASS], 2);
    updatePressure();
}

function setVolume(amt){
    Game.resources[VOLUME] = amt;
    document.getElementById("Volume").innerHTML = formatNumber(Game.resources[VOLUME], 2);
    updatePressure();
}

function incVolume(amt){
    Game.resources[VOLUME] = Game.resources[VOLUME] + amt;
    document.getElementById("Volume").innerHTML = formatNumber(Game.resources[VOLUME], 2);
    updatePressure();
}

function incTemperature(amt){
    Game.resources[TEMPERATURE] = Game.resources[TEMPERATURE] + amt;
    document.getElementById("Temperature").innerHTML = formatNumber(Game.resources[TEMPERATURE], 2);
    updatePressure();
}
