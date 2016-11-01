var game = {
    level: 1,
    nextClickPosition: 0,
    active: false,
    buttons: false,
    flash: function (element, timesToFlash, speed) {
        var that = this;
        if (timesToFlash > 0) {
            element.stop().animate({opacity: "1"}, {
                duration: 50,
                complete: function () {
                    element.stop().animate({opacity: ".5"}, 300);
                }
            });
            timesToFlash--;
        }
        if (timesToFlash > 0) {
            setTimeout (function () {
                that.flash(element, timesToFlash, speed);
            }, speed);
        }
    },
    gameSequence: [],
    playerSequence: [],
    newGame: function () {
        this.gameSequence = [];
        this.level = 1;
        $("#game-start").hide();
        $("#level-text").show();
        this.activateButtons();
        this.newLevel();
    },
    activateButtons: function () {
        var that = this;
        if (this.buttons == false) {
            $(".game-boxes").click(function () {
                if (that.active == true) {
                    var clickedBox = "#" + $(this).attr("id");
                    console.log(clickedBox);
                    that.flash($(clickedBox), 1, 300);
                    that.logPlayerInput(clickedBox);
                }
            });
        }
        this.buttons = true;
    },
    newLevel: function () {
        this.nextClickPosition = 0;
        this.playerSequence = [];
        this.displayLevel();
        this.genSequence();
        this.active = true;
        this.displaySequence();
    },
    genSequence: function () {
        this.gameSequence.push(Math.floor(Math.random() * 4) + 1);
    },
    displaySequence: function () {
        var that = this;
        $.each(this.gameSequence, function(index, element) {
            setTimeout (function(){
                that.flash($(".box" + element), 1, 300);
            }, 500 * index);
        });
    },
    logPlayerInput: function (clickedBox) {
        var input;
        switch (clickedBox) {
            case "#top-left":
                input = 1;
                break;
            case "#top-right":
                input = 2;
                break;
            case "#bottom-left":
                input = 3;
                break;
            case "#bottom-right":
                input = 4;
                break;
        }
        this.playerSequence.push(input);
        console.log(this.playerSequence);
        this.checkPlayerInput();
    },
    checkPlayerInput: function () {
        var that = this;
        if (this.playerSequence[this.nextClickPosition] == this.gameSequence[this.nextClickPosition]) {
            that.nextClickPosition++;
        } else {
            this.incorrect();
        }
        if (that.nextClickPosition == this.gameSequence.length) {
            this.level++;
            this.active = false;
            setTimeout(function () {
                that.newLevel();
            }, 1000);
        }
    },
    displayLevel: function () {
        $("#level-text").text("Level: " + this.level);
    },
    incorrect: function () {
        this.active = false;
        alert("lose");
        $("#game-start").show();
    }
};



$("#game-start").click(function(e) {
    e.preventDefault();
    game.newGame();
});