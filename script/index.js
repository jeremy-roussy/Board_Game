$("#stick2").hover(
    function() { $("#stick3").removeClass("contrast"); $("#stick4").removeClass("contrast")},
    function() {}
);

$("#stick3").hover(
    function() { $(this).addClass("contrast"); $("#stick4").removeClass("contrast")},
    function() {}
);

$("#stick4").hover(
    function() { $(this).addClass("contrast"); $("#stick3").addClass("contrast")},
    function() {}
);

$("#sticks").click(function() {    
    var players = $(".contrast").length;
    localStorage.setItem('players', players);

    window.location.href = "./board.html";
});