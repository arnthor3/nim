'use strict';
var nimAi = function() {
	
	var getXOR = function (board) {
		return board.pileOne ^ board.pileThree ^ board.pileTwo;
	}

	var isOptimalMovePossible = function(board) {
		return getXOR(board) !== 0;
	};

	var makeOptimalMove = function(board) {
		
		var rem = getXOR(board);

		if((rem ^ board.pileOne) <= board.pileOne) {
			board.pileOne = (board.pileOne ^ rem);
			return board;
		}
		if((rem ^ board.pileTwo) <= board.pileTwo) {
			board.pileTwo = (board.pileTwo ^ rem);
			return board;
		}
		if((rem ^ board.pileThree) <= board.pileThree) {
			board.pileThree = (board.pileThree ^ rem);
			return board;
		}
	}

	var removeOneFromLargestPile = function(board) {
		
		var m = 0;
		var key;
		for(var i in board){
			if (board.hasOwnProperty(i)) {
				if(board[i] > m) {
					m = board[i];
					key = i;
				}
			}
		}
		board[key] = board[key] - 1;
		return board;
	}

	var makeMove = function(board) {
		if (isOptimalMovePossible(board)) {
			board = makeOptimalMove(board);
		} else {
			board = removeOneFromLargestPile(board);
		}

		return board;
	};

	return {
		makeMove : makeMove
	}
}