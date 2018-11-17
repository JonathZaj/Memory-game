var Memory = {};
Memory.score = 0;
Memory.urls = [`url('./images/Toy_Story.jpg')`, `url('./images/Monster_inc.jpg')`, `url('./images/finding_nemo.jpeg')`, `url('./images/incredibles.jpg')`, `url('./images/up.jpg')`, `url('./images/wall-e.jpg')`, `url('./images/Toy_Story.jpg')`, `url('./images/Monster_inc.jpg')`, `url('./images/finding_nemo.jpeg')`, `url('./images/incredibles.jpg')`, `url('./images/up.jpg')`, `url('./images/wall-e.jpg')`];


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

Memory.disableClick = function () {
    $(".card").click(function () {
        if ($(this).attr("src") != "./images/back.jpg") {
            $(this).addClass("click-disabled");
        }
    })
}

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
            }
            else {
                Memory.score++;
            }
            clicked = [];
            return Memory.score;
        }
    });
}

Memory.anounceWin = function () {
    $(".card").click(function () {
        var len = Memory.urls.length;
        if (Memory.score === len/2) {
            $(".container").css("opacity", "0.8");
            var winnerDiv = $("div");
            winnerDiv.text("You won !");
            winnerDiv.addClass("winner-div");
            $(body).prepend(winnerDiv);
        }
    })
}


Memory.disableClick();
Memory.distribute();
Memory.compare();
Memory.anounceWin();
