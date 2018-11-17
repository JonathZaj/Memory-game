var Memory = {};
Memory.score = 0;
Memory.wrong = 0;
Memory.urls = [`url('./images/Toy_Story.jpg')`, `url('./images/Monster_inc.jpg')`, `url('./images/finding_nemo.jpeg')`, `url('./images/incredibles.jpg')`, `url('./images/up.jpg')`, `url('./images/wall-e.jpg')`, `url('./images/Toy_Story.jpg')`, `url('./images/Monster_inc.jpg')`, `url('./images/finding_nemo.jpeg')`, `url('./images/incredibles.jpg')`, `url('./images/up.jpg')`, `url('./images/wall-e.jpg')`];
const len = Memory.urls.length

// Distribute the deck
Memory.distribute = function () {
    for (i = Memory.urls.length - 1; i >= 0; i--) {
        var randomSrc = Memory.urls[Math.floor(Math.random() * Memory.urls.length)];
        var cardNumber = "#card" + i;
        $(cardNumber).css('background-image', randomSrc);
        var index = Memory.urls.indexOf(randomSrc);
        Memory.urls.splice(index, 1);
        $(cardNumber).prepend('<img src="./images/back.jpg" />');
        $('img').css("height", "170px");
    }
}

// Disable click if the card is already uncovered
Memory.disableClick = function () {
    $(".card").click(function () {
        if ($(this).attr("src") != "./images/back.jpg") {
            $(this).addClass("click-disabled");
        }
    })
}

// Compare the uncovered cards and give a point if it matches
Memory.compare = function () {
    var clicked = [];
    $('.card').click(function (event) {
        $(event.target).hide();
        clicked.push($(this));
        if (clicked.length === 2) {
            if (clicked[0].css('background-image') != clicked[1].css('background-image')) {
                first = clicked[0];
                second = clicked[1];
                $(".card").addClass("click-disabled");
                setTimeout(function () {
                    first.prepend('<img src="./images/back.jpg" />');
                    second.prepend('<img src="./images/back.jpg" />');
                    $('img').css("height", "170px");
                    $(".card").removeClass("click-disabled");
                }, 1000);
                Memory.wrong++;
            }
            else {
                Memory.score++;
            }
            clicked = [];
            return Memory.score;
        }
    });
}

// Display a winner banner when the player has uncovered all the cards
Memory.anounceWin = function () {
    $(".card").click(function () {
        if (Memory.score === len / 2) {
            var winnerDiv = $("<div/>");
            winnerDiv.text(`To infinity and beyond! Only ${Memory.wrong} wrong guesses...`);
            winnerDiv.addClass("winner-div");
            $('body').prepend(winnerDiv);
            $('body').css("background-image", "url('./images/piston_cup.jpg')");
            $(".card").remove();
            $("#wrong-guesses").remove();
        }
    })
}

// Refresh page if the player clicks on the button "New game"
Memory.newGame = function () {
    $('button').click(function () {
        location.reload();
    });
}

Memory.wrongGuesses = function () {
    $('.card').click(function () {
        $('#wrong-guesses').text(`Wrong guesses: ${Memory.wrong}`)
    })
}

Memory.start = function () {
    $(document).ready(function () {
        Memory.disableClick();
        Memory.distribute();
        Memory.compare();
        Memory.anounceWin();
        Memory.newGame();
        Memory.wrongGuesses();
    })
}

Memory.start();

