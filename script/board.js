var first = true;
var isFlipped = true;
var players = localStorage.getItem("players");

var characterCardNumber = 11;
var lootCardNumber = 104;
var monsterCardNumber = 107;
var soulCardNumber = 3;
var startingItemCardNumber = 10;
var treasureCardNumber = 80;

createBoard();

function createBoard() {
    for(let i = 1; i <= players; i++) {
        appendPlayerSetUp("player" + i);

        for(let j = 0; j < 2; j++) {
            appendRow("#player" + i);
        }
    }

    appendDrawCardSlot();

    let rows = [].slice.call($(".row"));

    rows.forEach(row => {
        for(let i = 0; i < 9; i++) {
            if(i < 2 && first) appendPlayerCardSlot(row, "full ");
            else if(i > 6) appendPlayerCardSlot(row, "soul ");
            else appendPlayerCardSlot(row, "");
        }

        first = !first;
    });

    appendAllCards();
}

function appendDrawCardSlot() {
    let left = $("<div></div>").attr("class", "left");
    let middle = $("<div></div>").attr("class", "middle");
    let right = $("<div></div>").attr("class", "right");

    let characterCardDraw = $("<div></div>").attr("id", "character").attr("class", "slot");
    let lootCardDraw = $("<div></div>").attr("id", "loot").attr("class", "slot");
    let monsterCardDraw = $("<div></div>").attr("id", "monster").attr("class", "slot");
    let soulCardDraw = $("<div></div>").attr("id", "soul").attr("class", "slot");
    let startingItemCardDraw = $("<div></div>").attr("id", "starting-item").attr("class", "slot");
    let treasureCardDraw = $("<div></div>").attr("id", "treasure").attr("class", "slot");

    left.append(treasureCardDraw);
    $("body").append(left);

    middle.append(characterCardDraw);
    middle.append(lootCardDraw);
    middle.append(startingItemCardDraw);
    $("body").append(middle);

    right.append(monsterCardDraw);
    $("body").append(right);
}

function appendPlayerSetUp(id) {
    let setUp = $("<div></div>").attr("id", id).attr("class", "set-up");
    $("body").append(setUp);
}

function appendRow(id) {
    let row = $("<div></div>").attr("class", "row");
    $(id).append(row);
}

function appendPlayerCardSlot(element, additionnalClass) {
    let slot = $("<div></div>").attr("class", additionnalClass + "slot");
    $(element).append(slot);
}

function appendAllCards() {
    for(let i = 1; i <= characterCardNumber; i++) {
        appendCard("character", i);
    }
    for(let i = 1; i <= lootCardNumber; i++) {
        appendCard("loot", i);
    }
    for(let i = 1; i <= monsterCardNumber; i++) {
        appendCard("monster", i);
    }
    for(let i = 1; i <= soulCardNumber; i++) {
        appendCard("soul", i);
    }
    for(let i = 1; i <= startingItemCardNumber; i++) {
        appendCard("starting item", i);
    }
    for(let i = 1; i <= treasureCardNumber; i++) {
        appendCard("treasure", i);
    }
}

function appendCard(type, counter) {
    let id;
    if(counter < 10) id = "00" + counter;
    else if(counter < 100) id = "0" + counter;
    else id = counter;

    let flip = $("<div></div>").attr("class", "flip " + type).draggable();
    let card = $("<div></div>").attr("class", "card flipped");
    let frontFace = $("<div></div>").attr("class", "front face");
    let backFace = $("<div></div>").attr("class", "back face");
    let frontImg = $("<img></img>").attr("src", "./assets/cards/base/" + type + "/" + id + ".png");
    let backImg = $("<img></img>").attr("src", "./assets/cards/base/" + type + "/000.png");
    
    frontFace.append(frontImg);
    backFace.append(backImg);
    card.append(frontFace);
    card.append(backFace);
    flip.append(card);
    $("#" + type).append(flip);
}

$(".flip").click(
    function() {
        if(isFlipped) $(this).children("div").addClass("flipped");
        else $(this).children("div").removeClass("flipped");
        
        isFlipped = !isFlipped;
    }
);

// Use to zoom on card front face to allow users to read instructions
$(".front").hover(
    function() {
        $(this).addClass("active");
        changeZIndex($(".flip"));
        $(this).parent("div").parent("div").css("z-index", "" + soulCardNumber);
    },
    function() {
        $(this).removeClass("active");
        $(this).removeClass("hover");
    }
);

$(document).keydown(function(e) {
    if(e.which == 17){
        $(".active").addClass("hover"); 
    }
});

$(document).keyup(function(e) {
    if(e.which == 17){
        $(".active").removeClass("hover"); 
    }
});

// change this in the future to keep the order of z-index
function changeZIndex(list) {
    Array.prototype.slice.call(list).forEach(element => {
        let previous = $(element).css("z-index");
        if(previous > 1) $(element).css("z-index", previous - 1);
    });
};