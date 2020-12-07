$(document).ready(function () {

    // when a button is clicked run the function getLetter()
    $("input[type='button']").click(getLetter);

    //Create an array that contains at least a dozen words.
        var animals = ["Alligator", "Armadillo", "Blowfish", "Bobcat", "Camel", "Caterpillar",
    "Cheetah", "Dolphin", "Donkey", "Eagle", "Elephant", "Ferret", "Gecko", "Giraffe"];

        // initialize variable outside of the functions
        var letter;
        var wrongGuesses = 0;

        // create arrays for easier searching
        var randomWords = [];
        var dashArray = [];
        var wrongGuess = [];

        // start game
        startGame();

        function startGame() {
            //When the game begins, generate a random valid index to pick one of the words.
            var index = Math.floor(Math.random() * animals.length);
            var word = animals[index].toUpperCase();
            randomWords = word.split("");

            //Display one dash for each unguessed letter for the length of the random word
            for (var i = 0; i < word.length; i++) {
                dashArray[i] = "-";
            }

            //Output the dashes
            $("#mysteryWord").text(dashArray.join(" "));
        }

        function getLetter() {
            // Get the users chosen letter value
            var chosenLetter = $(this);
            letter = chosenLetter.val();
            getIndex(letter);
        }

        function getIndex(letter) {
            var letterIndex = [];
            for (var i = 0; i < randomWords.length; i++) {
                if (randomWords[i] === letter) {
                    letterIndex.push(i);
                }
            }
            enterLetters(letterIndex);
        }

        /* As the user enters each guess, display the word again,
        replacing dashes with the guessed letter if it occurs in that position.*/
        function enterLetters(letterIndex) {
            if (letterIndex.length !== 0) {
                for (var i = 0; i < letterIndex.length; i++) {
                    var replaceLetter = letterIndex[i];
                    dashArray[replaceLetter] = letter;
                }
            }
            else {
                wrongGuesses++;
                // push the wrong guess into the wrong guesses array
                wrongGuess.push(letter);

                // output the wrong guess so they know what they have guessed
                $("#wrongGuesses").text(wrongGuess.join(" "));
            }
            $("#mysteryWord").text(dashArray.join(" "));
            gameResult();
        }

        function gameResult() {
           // Allow the user to guess letters continuously (up to 6 guesses)
           // If the user has used all of their guesses without completing the word, they have lost and the game is over.
            if (wrongGuesses === 6) {
                // output loser message
                $("#lost").text("You Lost!");
            }
            // If the joined letters = the random word that was picked the user wins
            if (dashArray.join("") === randomWords.join("")) {
                // output winner message
                $("#win").text("You won!");
            }
        }
});