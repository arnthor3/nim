'use strict';

var nim = function() {
    
    //The Game board
    var board = {
        pileOne: 3,
        pileTwo: 5,
        pileThree: 7
    }
    
    var playerOne = true;
    
    //Check the object if it's valid
    var parseObj = function(o) {
    	if (typeof o.pileOne === 'undefined') o.pileOne = board.pileOne;
    	if (typeof o.pileTwo === 'undefined') o.pileTwo = board.pileTwo;
    	if (typeof o.pileThree === 'undefined') o.pileThree = board.pileThree;
        return ((typeof o.pileOne !== 'undefined' && o.pileOne >= 0) &&
            (typeof o.pileTwo !== 'undefined' && o.pileTwo >= 0) &&
            (typeof o.pileThree !== 'undefined' && o.pileThree >= 0));
    };

    //is the move legal
    var isMoveLegal = function(obj) {
        var changed = 0;
        if (obj.pileOne !== board.pileOne) {
            if (obj.pileOne > board.pileOne) {
                return false;
            }
            changed = changed + 1;
        }

        if (obj.pileTwo !== board.pileTwo) {
            if (obj.pileTwo > board.pileTwo) {
                return false;
            }
            changed = changed + 1;
        }

        if (obj.pileThree !== board.pileThree) {
            if (obj.pileThree > board.pileThree) {
                return false;
            }
            changed = changed + 1;
        }


        return changed === 1;
    }



    var move = function(obj) {
        if (!parseObj(obj)) {
            console.log('one', (typeof obj.pileOne !== 'undefined' && obj.pileOne >= 0));
            console.log('two', (typeof obj.pileTwo !== 'undefined' && obj.pileTwo >= 0));
            console.log('trhee', (typeof obj.pileThree !== 'undefined' && obj.pileThree >= 0));

            throw new Error('object needs all the piles defined');
        }

        if (!isMoveLegal(obj)) {
            throw new Error('Move was not legal!!!');
        }

        board = obj;
        playerOne = !playerOne;
        console.log(playerOne);
        return board;
    };

    var getBoard = function() {
        return JSON.parse(JSON.stringify(board));
    };

    var getPlayer = function() {
        return playerOne;
    };

    var isGameOver = function() {
        return (board.pileThree === 0 && board.pileTwo === 0 && board.pileOne === 0);
    };

    var getStatus = function() {
        if (isGameOver()) {
            return {
                player: playerOne ?  "Better luck next time": "Congrats you won",
                isGameOn: false
            };
        }

        return {
            player: playerOne ? "it's your turn" : "it's my turn",
            isGameOn: true
        }

    }

    var resetGame = function() {
        board = {
            pileOne: 3,
            pileTwo: 5,
            pileThree: 7
        }
    }

    return {
        move: move,
        board: getBoard,
        play: getPlayer,
        status: getStatus,
        reset: resetGame
    };
}