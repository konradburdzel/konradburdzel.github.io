

var cards = ["ciri.png", "geralt.png", "jaskier.png", "jaskier.png", "iorweth.png", "triss.png", "geralt.png", "yen.png", "ciri.png", "triss.png", "yen.png", "iorweth.png" ];

function randomCards(){
    
    for (i = 0; i <= 40; i++){
        var a = 0;
        var b = 0;
        var text = "";
        a = Math.floor(Math.random()*(cards.length - 1));
        b = Math.floor(Math.random()*(cards.length - 1));
        text = cards[a];
        cards[a] = cards[b];
        cards[b] = text;
    }
}

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
var hide = true;

start();
randomCards();
console.log(cards);

function start(){
    text = "";
    for (i = 0; i <= cards.length - 1; i++){
        text = text +  '<div class="card" id="c' + i + '"></div>';
    }
    $('#board').html(text);
}

//tworzy nasłuch na kliknięcie w dany kafelek
for (i = 0; i <= cards.length - 1; i++){
    (function (e){
        $('#c' + e).on("click", function() {check(e);});
    })(i);
}

function check(nr){
    
    if (hide == true){
        $('#c' + nr).off();
        nclick++;
        //odwrócenie karty po kliknięciu
        $('#c' + nr).addClass('cardA');
        $("#c" + nr).css("background-image", 'url("img/' + cards[nr] + '")');
        //wczytanie, jaką kartę odsłonięto, do pamięci podręcznej
        table[nclick] = cards[nr];
        vcard[nclick] = nr;
        
        //czy została już kliknięta druga karta? 
        if (nclick % 2 == 0) {
            hide = false;
            if (table[nclick] == table[nclick - 1]) {
                endgame = endgame - 2;
                if (endgame == 0) setTimeout(function () {end(counter)}, 500);
                    setTimeout(function () {correct(nclick)}, 250);
            }
            else {
                setTimeout(function () {ncorrect(nclick)}, 500);
            }
            counter++;
            $('.score').html("Turn counter: " + counter);
        }
    } 
}

function correct(nclick){
    for (let i = nclick; i >= nclick - 1; i--){
        $('#c' + vcard[i]).css('opacity', '0');
    }
    hide = true;
}

function ncorrect(nclick){
    for (let i = nclick; i >= nclick - 1; i--){
        $('#c' + vcard[i]).css('background-image', 'url("img/karta.png")');
        $('#c' + vcard[i]).removeClass('cardA');
        $('#c' + vcard[i]).on("click", function() {check(vcard[i]);});
    }
    hide = true;
}

function end(counter){
    var finalcounter = counter + 1;
    $('.board').html("<h1> <br /> Congratulations! <br />" + "You did it correctly in " + finalcounter + " rounds! </h1> <br /> <br />" + '<span onclick="location.reload()" class="reset">ONE MORE!?</span>' + "<br /><br />" );
}