const characterCardNumber = createRandomTable(11);
const lootCardNumber = createRandomTable(104);
const monsterCardNumber = createRandomTable(107);
const soulCardNumber = createRandomTable(3);
const startingItemCardNumber = createRandomTable(10);
const treasureCardNumber = createRandomTable(80);
const players = localStorage.getItem("players");

var first = true;

createBoard();

function createBoard() {
    for(let i = 1; i <= players; i++) {
        appendPlayerSetUp("player" + i);

        for(let j = 0; j < 2; j++) {
            appendRow("#player" + i + " .set");
        }
    }

    appendPlayerStats();
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
    let startingItemCardDraw = $("<div></div>").attr("id", "starting-item").attr("class", "slot");
    let treasureCardDraw = $("<div></div>").attr("id", "treasure").attr("class", "slot");

    let soulCard1 = $("<div></div>").attr("id", "soul001").attr("class", "slot");
    let soulCard2 = $("<div></div>").attr("id", "soul002").attr("class", "slot");
    let soulCard3 = $("<div></div>").attr("id", "soul003").attr("class", "slot");

    left.append(treasureCardDraw);
    $("body").append(left);

    middle.append(characterCardDraw);
    middle.append(lootCardDraw);
    middle.append(startingItemCardDraw);
    middle.append(soulCard1);
    middle.append(soulCard2);
    middle.append(soulCard3);
    $("body").append(middle);

    right.append(monsterCardDraw);
    $("body").append(right);
}

function appendPlayerSetUp(id) {
    let setUp = $("<div></div>").attr("id", id).attr("class", "set-up");
    let set = $("<div></div>").attr("class", "set");
    let stats = $("<div></div>").attr("class", "stats");
    let attack = $("<div></div>").attr("class", "attack");
    let life = $("<div></div>").attr("class", "life");
    let roll = $("<div></div>").attr("class", "roll");
    
    stats.append(roll);
    stats.append(life);
    stats.append(attack);
    setUp.append(stats);
    setUp.append(set);
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

function appendPlayerStats() {    
    let dice = $("<img></img>").attr("src", "./assets/red_dice.png");
    $(".roll").append(dice);

    for(let i = 1; i <= 4; i++) {
        let heart = $("<img></img>").attr("src", "./assets/heart.png");
        if(i > 2) heart.attr("class", "brightness");
        $(".life").append(heart);
    }
        
    for(let i = 1; i <= 4; i++) {
        let knife = $("<img></img>").attr("src", "./assets/knife.png");
        if(i > 1) knife.attr("class", "brightness");
        $(".attack").append(knife);
    }
}

function appendAllCards() {
    characterCardNumber.forEach(card => {
        appendCard("character", card);
    });
    lootCardNumber.forEach(card => {
        appendCard("loot", card);
    });
    monsterCardNumber.forEach(card => {
        appendCard("monster", card);
    });
    soulCardNumber.forEach(card => {
        appendCard("soul", card);
    });
    startingItemCardNumber.forEach(card => {
        appendCard("starting item", card);
    });
    treasureCardNumber.forEach(card => {
        appendCard("treasure", card);
    });
}

function appendCard(type, id) {
    let flip = $("<div></div>").attr("class", "draggable flip " + type);
    let card = $("<div></div>").attr("class", "card");
    
    if(type != "soul") card.attr("class", "card flipped");

    let frontFace = $("<div></div>").attr("class", "front face");
    let backFace = $("<div></div>").attr("class", "back face");
    let frontImg = $("<img></img>").attr("src", "./assets/cards/base/" + type + "/" + id + ".png");
    let backImg = $("<img></img>").attr("src", "./assets/cards/base/" + type + "/000.png");
    
    frontFace.append(frontImg);
    backFace.append(backImg);
    card.append(frontFace);
    card.append(backFace);
    flip.append(card);

    if(type == "starting item") $("#starting-item").append(flip);
    else if(type == "soul") $("#" + type + id).append(flip);
    else $("#" + type).append(flip);
}

/* *************************************************************************************************************** */
/*                                   ┬ ┌┐┌ ┌┬┐ ┌─┐ ┬─┐ ┌─┐ ┌─┐ ┌┬┐ ┬ ┌─┐ ┌┐┌ ┌─┐                                   */
/*                                   │ │││  │  ├┤  ├┬┘ ├─┤ │    │  │ │ │ │││ └─┐                                   */
/*                                   ┴ ┘└┘  ┴  └─┘ ┴└─ ┴ ┴ └─┘  ┴  ┴ └─┘ ┘└┘ └─┘                                   */
/* *************************************************************************************************************** */

const menu = document.getElementById("menu");
const characterCardDrawSlot = document.getElementById("character");

$(document).contextmenu(function(event) {
    event.preventDefault();
});

$(document).click(function() {
    menu.classList.remove("show");
});

$("#starting-item").contextmenu(function(event) {
  event.preventDefault();

  menu.style.top = `${event.clientY}px`;
  menu.style.left = `${event.clientX}px`;
  menu.classList.add("show");
});

$(".flip").dblclick(
    function() {
        if($(this).children("div").hasClass("flipped")) $(this).children("div").removeClass("flipped");
        else $(this).children("div").addClass("flipped");
    }
);

// Use to zoom on card front face to allow users to read instructions
$(".front").hover(
    function() {
        $(this).addClass("active");
        changeZIndex($(".flip"));
        $(this).parent("div").parent("div").css("z-index", "315");
    },
    function() {
        $(this).removeClass("active");
        $(this).removeClass("hover");
    }
);

$(document).keydown(function(event) {
    if(event.which == 17){
        $(".active").addClass("hover"); 
    }
});

$(document).keyup(function(event) {
    if(event.which == 17){
        $(".active").removeClass("hover"); 
    }
});

$(function() {
    $(".draggable").draggable();
});

$(".stats img").click(function(event) {
    if(event.button == 0) {
        if($(this).parent("div").hasClass("roll"));
            else if($(this).parent("div").hasClass("money")) {
            let value = parseInt($(this).parent("div").children("p").text());
            $(this).parent("div").children("p").text(value + 1);
        }
        else if($(this).hasClass("brightness")) $(this).removeClass("brightness");
        else $(this).addClass("brightness");
    }
    else if(event.button == 2) {
        if($(this).parent("div").hasClass("money")) {
            let value = parseInt($(this).parent("div").children("p").text());
            $(this).parent("div").children("p").text(value - 1);
        }
    }
});

// Die Roll
let die = document.getElementById("die");
die.classList.add("draggable");

die.addEventListener("click", function() {
    let result = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
    die.dataset.side = result;
    die.classList.toggle("reRoll");
});

/* *************************************************************************************************************** */
/*                                               ┬ ┬ ┌┬┐ ┬  ┬   ┌─┐                                                */
/*                                               │ │  │  │  │   └─┐                                                */
/*                                               └─┘  ┴  ┴  ┴─┘ └─┘                                                */
/* *************************************************************************************************************** */

function createRandomTable(counter) {    
    let array = [];
    
    for(let i = 1; i <= counter; i++) {
        array.push(concat(i));
    }

    const shuffledArray = array.sort((a, b) => 0.5 - Math.random());

    return shuffledArray;
}

function concat(number) {
    let id;

    if(number < 10) id = "00" + number;
    else if(number < 100) id = "0" + number;
    else id = number;

    return id;
}

// change this in the future to keep the order of z-index
function changeZIndex(cards) {
    Array.prototype.slice.call(cards).forEach(card => {
        let previous = $(card).css("z-index");
        if(previous > 1) $(card).css("z-index", previous - 1);
    });
};