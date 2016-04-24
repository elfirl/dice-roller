$(document).ready(function() {

    var numberOfDice;
    var numberOfSides;
    var modifier = getModifier();
    var result = [];
    
    $("#rollButton").on("click", function(event){
        event.preventDefault();

        getValues();
        getModifier();
        rollDice(numberOfDice, numberOfSides);
        displayRolls();
    });

    $(".options-button").on("click", function(event){
        event.preventDefault();
        $(this).toggleClass("btn btn-active");
    })

    function getValues() {
        numberOfDice = parseInt($("input[name='numberDice']").val());
        numberOfSides = parseInt($("input[name='numberSides']").val());
    };

    function getModifier() {
        var modInput = $("input[name='modifier']").val();
        if (modInput.length < 1) {
            modifier = 0; 
        } else {
            modifier = parseInt($("input[name='modifier']").val()); 
        }         
    };

    function rollDice(quantity, sides) {
        result = [];
        for (var i = quantity - 1; i >= 0; i--) {
            result.push(Math.floor(Math.random() * sides) + (1 + modifier));
        };
    };

    function sumRolls() {
        if($("#sumOption").hasClass("btn-active")) {
            function addArray(a, b) {
                return a + b;
            }
            var theSum = result.reduce(addArray, 0);
            result = [];
            result.push(theSum);
        }
        
    };

    function reRollDice() {
        if($("#reRollOption").hasClass("btn-active")) {
            for (var i = result.length - 1; i >= 0; i--) {
                if (result[i] <= 1 + modifier) {
                    result.splice(i, 1);
                    var replacementNumber = Math.floor(Math.random() * numberOfSides) + (1 + modifier);
                    result.push(replacementNumber);
                    reRollDice();
                }
            }
        }
    };

    function explodeRolls() {
        if($("#explodingOption").hasClass("btn-active")) {
            for (var i = result.length - 1; i >= 0; i--) {
                if (result[i] === numberOfSides) {
                    result.splice(i, 1);
                    var explodedNumber = numberOfSides + Math.floor(Math.random() * numberOfSides) + (1 + modifier);
                    result.push(explodedNumber);
                }
            }
        }
    }

    function dropLowest() {
        if($("#dropLowOption").hasClass("btn-active")) {
            var smallestNumber = numberOfSides;
            for (var i = result.length - 1; i >= 0; i--) {
                if (result[i] <= smallestNumber) {
                    smallestNumber = result;
                }
            }
            result.splice(smallestNumber, 1);
        }
    }

    function displayRolls() {
        reRollDice();
        dropLowest();
        explodeRolls();
        sumRolls();
        $(".roll-results").append((result.join(", ")) + "<br />");
    };



});
