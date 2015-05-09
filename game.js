//The game board handles all the dom interaction
//Drawing the board and listening for click events
var gameBoard = function() {

    //store a reference to the container
    var container = document.querySelector('.game').querySelector('.board');

    var info = document.querySelector('.move');
    //create an image node
    var returnImg = function(num) {
        //create a new image
        var img = new Image();
        //set the image source
        img.src = 'match.jpg';
        //add the class so we know wich one the user is hovering over
        img.classList.add(num);
        //get a reference to the style object
        var s = img.style
        s.width = '1%';
        s.height = '100%';
        s.padding = '5px'

        return img;
    }


    var drawPile = function(num) {
        //create a document fragment once
        var frag = document.createDocumentFragment();
        //create all num images
        for (var i = 0; i < num; i = i + 1) {
            var img = returnImg(i + 1);
            frag.appendChild(img);
        }
        //return the fragment
        return frag;
    }
    var hoverEvent = function() {
        var parent = this.parentElement;
        parent.classList[1];
        var num = parseInt(this.parentElement.querySelectorAll('img').length, 10);
        var rem = parseInt(this.classList[0], 10);
        info.innerHTML = 'If you click this match you will take ' + (num - (rem - 1)) +
         ' matches from pile ' + parent.classList[1].replace('pile','').toLowerCase() + '.';
    }


    var makeMove = function() {
        var pile = this.parentElement.classList[1];
        var matches = this.classList[0];
        var move = {};
        move[pile] = (matches - 1);
        pubSub.pub('PLAYER_MOVE', move);

    }


    var appendEventsToBoard = function() {
        var imgs = container.getElementsByTagName('img');
        for (var i = imgs.length - 1; i >= 0; i--) {
            imgs[i].onmouseover = hoverEvent;
            imgs[i].onclick = makeMove;
        };
    };

    var emptyPile = function(el) {
        if (el && el.firstChild) {
            while (el.firstChild) {
                el.removeChild(el.firstChild);
            }
        }
    }

    var drawBoard = function(board) {
       
        //loop through the board
        for (var i in board) {
            if (board.hasOwnProperty(i) && typeof i !== 'undefined') {
                //get images
                var frag = drawPile(board[i]);
                //append images to the pile
                console.log(container);
                emptyPile(container.querySelector('.' + i));
                container.querySelector('.' + i).appendChild(frag);
            }
        }
        appendEventsToBoard();
    };

    return {
        drawBoard: drawBoard,
    }
}

var game = (function() {
    var board = gameBoard();
    var ai = nimAi();
    var n = nim();

    //board.drawBoard(n.board());

    pubSub.sub('PLAYER_MOVE', function(move) {
        board.drawBoard(n.move(move));
        checkGame();
    	setTimeout(aiMove, 500);
    });

    var checkGame = function() {
        document.querySelector('.whos').innerHTML = n.status().player;
        if(!n.status().isGameOn) {
            document.querySelector('.move').innerHTML = '';
            document.querySelector('.repeat').style.display = 'block';
        }
    }

    var aiMove = function() {
        var aiMove =  ai.makeMove(n.board());
        n.move(aiMove);
    	board.drawBoard(n.board());
        checkGame();
    	
    }

    var start = function() {
        document.querySelector('.splash').style.display = 'none';
        document.querySelector('.game').style.display = 'block';
        document.querySelector('.whos').innerHTML = n.status().player;
    	board.drawBoard(n.board());
    }

    var reset = function() {
    	n.reset();
        document.querySelector('.repeat').style.display = 'none';
        
        start();
    }

    return {
    	reset : reset,
    	start : start
    }

})();
window.game = game;