

var cards = ["ciri.png", "geralt.png", "jaskier.png", "jaskier.png", "iorweth.png", "triss.png", "geralt.png", "yen.png", "ciri.png", "triss.png", "yen.png", "iorweth.png" ];

//alert(cards[4]);
//console.log(cards);
//liczba rund
var counter = 0;
//zmienna wychwytująca koniec gry
var endgame = cards.length;
//liczba kliknięć
var nclick = 0;
table = new Array();
//odsłonięta karta
var vcard = new Array();
//zmienna przechowująca info czy jest para
var tf = "";

function start(){
    text = "";
    for (i = 0; i <= cards.length - 1; i++){
        text = text +  '<div class="card" onclick="fclick(' + i + ');" id="c' + i + '"></div>';
    }
    //document.getElementById("board").innerHTML = text;
    $('#board').html(text);
}

function fclick(nr){
    nclick = nclick + 1;
    check(nr, nclick);
}

function check(nr, nclick){
    
    $("#c" + nr).css("background-image", 'url("img/' + cards[nr] + '")');
    $("#c" + nr).css("filter", "brightness(100%)");
    table[nclick] = cards[nr];
    vcard[nclick] = nr;
    document.getElementById("c" + vcard[nclick]).setAttribute("onclick", ";");
   
    //jeżeli odsłonęte karty ne są parą
    if (tf == "false"){
        for (i = nclick - 1; i >= nclick - 2; i--){
            $('#c' + vcard[i]).css('background-image', 'url("img/karta.png")');
            //document.getElementById("c" + vcard[i]).style.backgroundImage = 'url("img/karta.png")';
            document.getElementById("c" + vcard[i]).setAttribute("onclick", "fclick(" + vcard[i] + ");");
            $("#c" + vcard[i]).css("filter", "brightness(70%)");
        }
        tf = "";
    }
    //jeżeli karty są parą
    else if (tf == "true"){
        correct(nclick);
        tf = "";
    }
    //czy została już kliknięta druga karta? 
    if (nclick % 2 == 0) {
        if (table[nclick] == table[nclick - 1]) {
            tf = "true";
            endgame = endgame - 2;
            if (endgame == 0) setTimeout(end(counter), 500);
        }
        else tf = "false";

        counter = nclick / 2;
        //document.getElementById("score").innerHTML = "Turn counter: " + counter;
        $('.score').html("Turn counter: " + counter);
        //return counter;
    }
}

function correct(nclick){
    for (i = nclick - 1; i >= nclick - 2; i--){
        document.getElementById("c" + vcard[i]).style.background = "#26282E";
        document.getElementById("c" + vcard[i]).style.border = "none";
        document.getElementById("c" + vcard[i]).style.cursor = "default";
        document.getElementById("c" + vcard[i]).style.filter = "brightness(100%)";
        document.getElementById("c" + vcard[i]).setAttribute("onclick", ";");
    }
}

function end(counter){
    var finalcounter = counter + 1;
    $('.board').html("<h1> <br /> Congratulations! <br />" + "You did it correctly in " + finalcounter + " rounds! </h1> <br /> <br />" + '<span onclick="location.reload()" class="reset">ONE MORE!?</span>' + "<br /><br />" );
}