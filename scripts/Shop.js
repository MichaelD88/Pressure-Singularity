class Upgrade {
    constructor(name, description, cost, resourceCost, visibleReq, visible, onclick, 
        upgradeIndex, purchased, img){
        this.name = name;
        this.description = description;
        this.cost = cost;
        this.resourceCost = resourceCost;
        this.visibleReq = visibleReq;
        this.visible = visible;
        this.onclick = onclick;
        this.upgradeIndex = upgradeIndex;
        this.purchased = purchased;
        this.img = img;
    }
}

class Building{
    constructor(
        name, description, cost, resourceCost, visibleReq, visible, upgradeIndex, 
        img, multiplier, count, production, resourceGain){
        this.name = name;
        this.description = description;
        this.cost = cost;
        this.resourceCost = resourceCost;
        this.visibleReq = visibleReq;
        this.visible = visible;
        this.upgradeIndex = upgradeIndex;
        this.img = img;
        this.multiplier = multiplier;
        this.count = count;
        this.production = production;
        this.resourceGain = resourceGain;
    }
}

function generateShopItems(){
    Game.buildings.push(new Building(
        "Rusty Pump", "A pump taken from derelict fuel stations found nearby.", 10, "MASS", 5, false, 0, 
        "resources/gasIcon.png", 1.3, 0, 1, "MASS"));

    Game.buildings.push(new Building(
        "Good Pump", "Automatically pumps Gas", 10**3, "MASS", 200, false, 1,
         "resources/gasIcon.png", 1.2, 0, 99, "MASS"));

    Game.buildings.push(new Building(
        "LOG Pump", "Pumps a multiple of euler's number per second?!", 10**5, "MASS", 31415, 
        false, 2, "resources/gasIcon.png", 1.1, 0, 2.71828*10**4, "MASS"));
    
    Game.buildings.push(new Building(
        "Star Pump", "Harvests gas from nearby stars and pumps it into the tank", 10**7, "MASS", 10**6, 
        false, 3, "resources/gasIcon.png", 1.15, 0, 10**6, "MASS"));
    
    Game.buildings.push(new Building(
        "Gas Tele", "Teleports gas from across the universe into the tank", 10**9, "MASS", 10**8, 
        false, 4, "resources/gasIcon.png", 1.15, 0, 10**8, "MASS"));
    
    Game.buildings.push(new Building(
        "Fabricator", "Uses quantum magic to create gas from nothing.", 10**11, "MASS", 10**10, 
        false, 5, "resources/gasIcon.png", 1.15, 0, 10**10, "MASS"));

    Game.buildings.push(new Building(
        "Nullpo Pump", "Takes advantage of nullpointer bugs to create gas.", 10**13, "MASS", 10**12, 
        false, 6, "resources/gasIcon.png", 1.15, 0, 10**12, "MASS"));
    
    Game.buildings.push(new Building(
        "Heater 1", "1", 10**4, "MASS", 10**3, 
        false, 7, "resources/gasIcon.png", 1.3, 0, 10**2, "TEMPERATURE"));

    Game.buildings.push(new Building(
        "Heater 2", "2", 10**9, "MASS", 10**8, 
        false, 8, "resources/gasIcon.png", 1.3, 0, 10**7, "TEMPERATURE"));
    

    Game.upgrades.push(new Upgrade(
        "Better Manual Pump", "Pump 10x better!", 100, "MASS", 50, false, 
        x=>Game.clickMult *= 10, 0, false, "resources/cursorIcon.png"
    ));

    Game.upgrades.push(new Upgrade(
        "Super Manual Pump", "Somehow pumps 10x better again!", 10000, "MASS", 500, false, 
        x=>Game.clickMult *= 10, 1, false, "resources/cursorIcon.png"
    ));

    Game.upgrades.push(new Upgrade(
        "Compression", "You push on the tank really hard to reduce the volume of the tank by a factor of 1000.", 10000, "MASS", 1000, false,
        x=>setVolume(Game.resources[VOLUME]/1000), 2, false, "resources/volumeIcon.png"
    ))
    
    Game.upgrades.push(new Upgrade(
        "Hydraulic Compression", "You buy an enormous amount of hydraulic compressors to compress the volume of the tank by a factor of 1000.", 10000, "MASS", 5000, false, 
        x=>Game.clickMult *= 5, 3, false, "resources/cursorIcon.png"
    ));
    
    Game.upgrades.push(new Upgrade(
        "Ultra Clicks", "Now with 100x the clicking!", 10**5, "MASS", 10**4, false, 
        x=>Game.clickMult *= 100, 4, false, "resources/cursorIcon.png"
    ));

    Game.upgrades.push(new Upgrade(
        "Quantum Clicks", "Now with 10x the clicking!", 10**6, "MASS", 10**5, false, 
        x=>Game.clickMult *= 10, 5, false, "resources/cursorIcon.png"
    ));

    Game.upgrades.push(new Upgrade(
        "Volume Reduction 2", "Reduces the volume of the tank by a factor of 1000", 10**6, "MASS", 10**5, false,
        x=>setVolume(Game.resources[VOLUME]/1000), 6, false, "resources/volumeIcon.png"
    ));

    Game.upgrades.push(new Upgrade(
        "Volume Reduction 3", "Reduces the volume of the tank by a factor of 1000", 10**8, "MASS", 10**7, false,
        x=>setVolume(Game.resources[VOLUME]/1000), 7, false, "resources/volumeIcon.png"
    ));

    Game.upgrades.push(new Upgrade(
        "Volume Reduction 4", "Reduces the volume of the tank by a factor of 1000", 10**10, "MASS", 10**9, false,
        x=>setVolume(Game.resources[VOLUME]/1000), 8, false, "resources/volumeIcon.png"
    ));

    Game.upgrades.push(new Upgrade(
        "Galactic Compression", "Using the power of the galaxy, reduces the volume of the tank by a factor of 100.", 10**12, "MASS", 10**11, false,
        x=>setVolume(Game.resources[VOLUME]/1000), 9, false, "resources/volumeIconBlue.png"
    ));

    Game.upgrades.push(new Upgrade(
        "Solar Clicks", "100 times more Manual Pump value!", 10**8, "MASS", 10**7, false, 
        x=>Game.clickMult *= 100, 10, false, "resources/cursorIcon.png"
    ));

    Game.upgrades.push(new Upgrade(
        "Galactic Clicks", "Harness the galaxy to pump manually yet 1000 times better.", 10**11, "MASS", 10**10, false, 
        x=>Game.clickMult *= 1000, 11, false, "resources/cursorIcon.png"
    ));

}

function updateShop(){
    for(i in Game.buildings){
        u = Game.buildings[i];
        if(u.visible == false && Game.resources[MASS] >= u.visibleReq){
            u.visible = true;
            document.getElementById("buildings").innerHTML += generateBuildingTemplate(u);
        }
    }
    for(i in Game.upgrades){
        u = Game.upgrades[i];
        if(u.purchased == false && u.visible == false && Game.resources[MASS] >= u.visibleReq){
            u.visible = true;
            document.getElementById("upgrades").innerHTML += generateUpgradeTemplate(u);
        }
    }
}

function loadShopItems(){
    document.getElementById("buildings").innerHTML = "";
    document.getElementById("upgrades").innerHTML = "";
    for(i in Game.buildings){
        u = Game.buildings[i];
        if(u.visible){
            document.getElementById("buildings").innerHTML += generateBuildingTemplate(u);
        }
    }
    for(i in Game.upgrades){
        u = Game.upgrades[i];
        if(u.visible && u.purchased == false){
            document.getElementById("upgrades").innerHTML += generateUpgradeTemplate(u);
        }        
    }
}

function workBuildings(){
    for(i in Game.buildings){
        b = Game.buildings[i];
        incResource(b.resourceGain, b.count*b.production/updateSpeed);
    }
}

function generateUpgradeTemplate(u){ // messy....
    let index = u.upgradeIndex.toString(); 
    let upg = "Game.upgrades[" + index +"]"
    return `<div class="upgradeItem" id="` + u.name + `" 
    onclick=
    'if(Game.resources[MASS] >= `+upg+`.cost){
        `+upg+`.onclick();
        incResource(`+upg+`.resourceCost, -1* `+upg+`.cost); 
        `+upg+`.purchased = true;
        document.getElementById("`+ u.name + `").remove();
        updateDisplay();
    }'>
    <div class="popupcontainer">
        <span class="popup">
            <div>` + u.name + `</div>
            <div>` + u.description + `</div>
            <div> Cost: ` + formatNumber(u.cost) + `g Gas</div>
        </span>
    </div>
    <div class="buildingImg d-inline-block"><img src="`+ u.img +`" alt="gas" width="58" height="58"></div>
    </div>
    `;
}

function generateBuildingTemplate(u){
    let index = u.upgradeIndex.toString(); 
    let upg = "Game.buildings[" + index +"]"
    return `
    <div class="shopItem" title="`+u.description+`"
    onclick=
        'if(Game.resources[MASS] >= `+upg+`.cost){
            `+upg+`.count++; 
            incResource(`+upg+`.resourceCost, -1* `+upg+`.cost); 
            `+upg+`.cost *= `+upg+`.multiplier;
            document.getElementById("`+ u.name
                + `cost").innerHTML =  formatNumber(`+upg+`.cost, 2) + "g Gas";
            document.getElementById("`+ u.name + `count").innerHTML =
                `+upg+`.count;
        }'>

        <div class="buildingImg d-inline-block">
            <img src="`+ u.img +`" alt="gas" width="60" height="60">
        </div>
        <div class="d-inline-block">
            <span class="d-block fs-8">` + u.name +`</span>
            <span class="d-block" id="` + u.name + `cost">` + formatNumber(u.cost, 2) + `g Gas</span>
        </div>
        <div class="d-inline-block float-end fs-7 m-7">
            <span class="d-block" id="`+ u.name + `count">` 
                + u.count +`
            </span>
        </div>
    </div>`;
}
