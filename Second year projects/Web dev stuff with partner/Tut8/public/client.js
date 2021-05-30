function init(){
    let xhttp = new XMLHttpRequest();
    xhttp.open('GET', '/classes', true);
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){

        }
    }
    xhttp.send();
}

function reqCards(){
    let cardClass = document.getElementById("class").value;
    let rarity = document.getElementById("rarity").value;
    let minAttack = document.getElementById("minattack").value;
    let minHealth = document.getElementById("minhealth").value;
    let maxAttack = document.getElementById("maxattack").value;
    let maxHealth = document.getElementById("maxhealth").value;
    let name = document.getElementById("name").value;
    let artist = document.getElementById("artist").value;

    let params = "?"+"class="+cardClass+'&rarity='+rarity+"&minAttack="+minAttack+"&minHealth="
        +minHealth+"&maxAttack="+maxAttack+"&maxHealth="+maxHealth+"&name="+name+"&artist="+artist;

    document.getElementById('results').innerHTML = "Loading results...";
    let req = new XMLHttpRequest();
    req.open('GET', '/cards' + params, true);
    req.onreadystatechange = function() {
        if(this.readyState==4 && this.status==200){
            document.getElementById('results').innerHTML = req.responseText;
        }
    }
    req.send();
}
