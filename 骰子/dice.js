var CurrentPlayer = 1;
var Player1TotalScore = 0;
var Player2TotalScore = 0;
var counter = 1;
var isPlaying = true;

document.querySelector('.dice-img').style = "display:none";


document.querySelector('.start').addEventListener('click', function() {
    if (isPlaying) {
        counter++;
        var dice = Math.floor(Math.random() * 6) + 1;
        document.querySelector('.dice-img').style = "display:block;margin:auto";
        document.querySelector('.dice-img').src = 'dice' + dice + '.png'
            // console.log(dice);
        if (CurrentPlayer === 1) {
            document.getElementById('player' + CurrentPlayer + '-current-score').textContent = dice;

            Player1TotalScore += dice;

            document.getElementById('player' + CurrentPlayer + '-total-score').textContent = Player1TotalScore;

            document.querySelector('.player' + CurrentPlayer).style = "background-color: rgb(252, 192, 95);font-weight: bold;"

            CurrentPlayer = 2;

            document.querySelector('.player' + CurrentPlayer).style = "background-color:rgb(255, 203, 119);"

        } else {

            document.getElementById('player' + CurrentPlayer + '-current-score').textContent = dice;

            Player2TotalScore += dice;

            document.getElementById('player' + CurrentPlayer + '-total-score').textContent = Player2TotalScore;

            document.querySelector('.player' + CurrentPlayer).style = "background-color: rgb(252, 192, 95);font-weight: bold;"

            CurrentPlayer = 1;

            document.querySelector('.player' + CurrentPlayer).style = "background-color:rgb(255, 203, 119);"
        }


        if (counter === 7) {
            if (Player1TotalScore > Player2TotalScore) {
                document.querySelector('#crown1').style = "display:inline-block";
                isPlaying = false;

            } else if (Player1TotalScore < Player2TotalScore) {
                document.querySelector('#crown2').style = "display:inline-block";
                isPlaying = false;

            } else if (Player1TotalScore = Player2TotalScore) {
                document.querySelector('.dice-img').src = "平局.png";
                isPlaying = false;
            }

        };
    } else {
        // init
        init();
        isPlaying = true;
    };
});
document.querySelector('.reset').addEventListener('click', function() {
    init();
});


function init() {
    CurrentPlayer = 1;
    Player1TotalScore = 0;
    Player2TotalScore = 0;
    counter = 1;
    document.getElementById('crown1').style = "display:none";
    document.getElementById('crown2').style = "display:none";
    document.querySelector('.dice-img').style = "display:none";
    document.getElementById('player1-current-score').textContent = 0;
    document.getElementById('player2-current-score').textContent = 0;
    document.getElementById('player1-total-score').textContent = 0;
    document.getElementById('player2-total-score').textContent = 0;
    document.querySelector('.player1').style = "background-color:rgb(255, 203, 119);"
    document.querySelector('.player2').style = "background-color:rgb(255, 203, 119);"
}

/*forEach*/
var array = [4, 9, 16, 25];
array.forEach(myFunction);

function myFunction(item, index) {
    console.log('index[' + index + ']:' + item);
}

/*map*/
var newArray = array.map(function(item) {
    return item * 2
});

console.log(newArray);
console.log(array);