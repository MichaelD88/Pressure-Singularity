function formatNumber(a, d){
    if(Game.format == "SI"){
    if(a >= 10**(-18) && a < 10**(-15)){
        return (a*10**18).toFixed(d).toString() + " a"
    }
    else if(a >= 10**(-15) && a < 10**(-12)){
        return (a*10**15).toFixed(d).toString() + " f"
    }
    else if(a >= 10**(-12) && a < 10**(-9)){
        return (a*10**12).toFixed(d).toString() + " p"
    }
    else if(a >= 10**(-9) && a < 10**(-6)){
        return (a*10**9).toFixed(d).toString() + " n"
    }
    else if(a >= 10**(-6) && a < 10**(-3)){
        return (a*10**6).toFixed(d).toString() + " μ"
    }
    else if(a >= 10**(-3) && a < 1){
        return (a*10**3).toFixed(d).toString() + " m"
    }
    else if(a >= 1 && a < 10**3){
        return a.toFixed(d).toString() + " "
    }
    else if(a >= 10**3 && a < 10**6){
        return (a/10**3).toFixed(d).toString() + " k";
    }
    else if(a >= 10**6 && a < 10**9){
        return (a/10**6).toFixed(d).toString() + " M";
    }
    else if(a >= 10**9 && a < 10**12){
        return (a/10**9).toFixed(d).toString() + " G";
    }
    else if(a >= 10**12 && a < 10**15){
        return (a/10**12).toFixed(d).toString() + " T";
    }
    else if(a >= 10**15 && a < 10**18){
        return (a/10**15).toFixed(d).toString() + " P";
    }    
    else if(a >= 10**18 && a < 10**21){
        return (a/10**18).toFixed(d).toString() + " E";
    } else {
        return (a).toFixed(d) + " ";
    }
    } else {


    return Number.parseFloat(a).toExponential(d) + " ";
    }
}