

function updateTank(){
    let tank = document.getElementById("Tank");
    w = document.getElementById("main").offsetWidth;
    h = document.getElementById("main").offsetHeight;
    nw = 0.8*w;
    maxh = 0.6*h;
    nw = Math.min(maxh, nw);
    console.log(nw.toString() + "px");
    Game.tankWidth = nw;
    document.getElementById("Tank").style.width = nw.toString() + "px";
    document.getElementById("Tank").style.height = nw.toString() + "px";
}

function setupTank(){
    document.getElementById("Tank").style.opacity = 1;
    document.getElementById("Tank2").style.opacity = 1;
}