var game = {
    level: 1,
    nextClickPosition: 0,
    active: false,
    flash: function () {},
    gameSequence: [],
    playerSequence: [],
    newGame: function () {},
    activateButtons: function () {},
    newLevel: function () {},
    genSequence: function () {},
    displaySequence: function () {},
    checkPlayerInput: function () {},
    displayLevel: function () {},
    incorrect: function () {}
};



$("#game-start").click(function(e) {
    e.preventDefault();
    $("#game-start").toggle();
    $("#level-text").toggle();
});