var game = {
    level: 1,
    nextClickPosition: 0,                                   //which spot in the sequence to check
    active: false,                                          //whether or not the buttons are currently working
    buttons: false,                                         //whether or not the buttons have been turned on for the first time (on first play from page load)
    flash: function (element, timesToFlash, speed) {        //what makes the flashing animation happen
        var that = this;                                    //timesToFlash is exclusively for the incorrect sequence function
        if (timesToFlash > 0) {
            this.playSound(element);
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
    playSound: function (element) {                         //determines which sound to play based on the id of the element
        var audio;
        switch ($(element).attr("id")) {
            case "top-left":
                audio = $("#audio1")[0];
                break;
            case "top-right":
                audio = $("#audio2")[0];
                break;
            case "bottom-left":
                audio = $("#audio3")[0];
                break;
            case "bottom-right":
                audio = $("#audio4")[0];
                break;
        }
        audio.currentTime = 0;
        audio.play();
    },
    gameSequence: [],                                       //generated sequence
    playerSequence: [],                                     //player entered sequence
    newGame: function () {                                  //initializes the game
        $("#game-over-text").hide();
        this.gameSequence = [];
        this.level = 1;
        $("#game-start").hide();
        $("#level-text").show();
        this.activateButtons();
        this.newLevel();
    },
    activateButtons: function () {                          //turns buttons on for the first time if buttons == false
        var that = this;                                    //activates event listener for when active
        if (this.buttons == false) {
            $(".game-boxes").click(function () {
                if (that.active == true) {
                    var clickedBox = "#" + $(this).attr("id");
                    that.flash($(clickedBox), 1, 300);
                    that.logPlayerInput(clickedBox);
                }
            });
        }
        this.buttons = true;
    },
    newLevel: function () {                                 //starts a new level
        this.nextClickPosition = 0;
        this.playerSequence = [];
        this.displayLevel();
        this.genSequence();
        this.displaySequence();
    },
    genSequence: function () {                              //generates the next random number in the sequence
        this.gameSequence.push(Math.floor(Math.random() * 4) + 1);
    },
    displaySequence: function () {                          //displays the generated sequence to the user and then activates the buttons
        var that = this;
        $.each(this.gameSequence, function(index, element) {
            setTimeout (function(){
                that.flash($(".box" + element), 1, 300);
            }, 500 * index);
            setTimeout(function(){
                that.active = true;
            }, 501 * that.gameSequence.length);
        });
    },
    logPlayerInput: function (clickedBox) {                 //convert the user click into a value to push to the player sequence
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
        this.checkPlayerInput();
    },
    checkPlayerInput: function () {                         //checks the most recent click from the user against the generated sequence
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
    displayLevel: function () {                             // changes the level text to reflect the current round
        $("#level-text").text("Level: " + this.level);
    },
    incorrect: function () {                                //activates on an incorrect click and displays end game screen
        this.active = false;
        $("#level-text").text("You got to level " + this.level + "!");
        $("#game-start").show();
        $("#game-over-text").show();
        this.flash($(".game-boxes"), 4, 300);
    }
};



$("#game-start").click(function(e) {
    e.preventDefault();
    game.newGame();
});