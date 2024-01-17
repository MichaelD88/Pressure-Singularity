function load(){
    let loadedSave = JSON.parse(localStorage.getItem('save'));
    if(loadedSave != null){
        Game = loadedSave;
        updateDisplay();
        loadShopItems();
        setupCanvas();
        setupTank();
        return true;
    } else {
        return false;
    }
}

function save(){
    let s = Game;
    localStorage.setItem('save', JSON.stringify(Game));
}

function resetSave(){
    localStorage.removeItem('save');
    newGame(Game);
}