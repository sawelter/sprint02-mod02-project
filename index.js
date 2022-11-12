const { fifaData } = require('./fifa.js')

// ⚽️ M  V P ⚽️ //

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 1: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Practice accessing data by console.log-ing the following pieces of data note. 


💡 HINT: You may want to filter the data first 😉*/


// an array of finals games in 2014 (a single-element array, basically)
const finals = fifaData.filter((element) => {
    return element.Stage === "Final" && element.Year === 2014;
});


//(a) Home Team name for 2014 world cup final
console.log(finals[0]['Home Team Name']); // should print "Germany"

//(b) Away Team name for 2014 world cup final
console.log(finals[0]['Away Team Name']); // should print "Argentina"

//(c) Home Team goals for 2014 world cup final
console.log(finals[0]['Home Team Goals']); // should print "1"

//(d) Away Team goals for 2014 world cup final
console.log(finals[0]['Away Team Goals']); // should print "0"

//(e) Winner of 2014 world cup final */
{
    if(finals[0]["Home Team Goals"] > finals[0]["Away Team Goals"]) {
        console.log(finals[0]["Home Team Name"])
    } else {
        console.log(finals[0]["Away Team Name"]);
    } // should print "Germany"
} // prints just the winner name rather than win conditions

console.log(finals[0]["Win conditions"]);


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 2: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use getFinals to do the following:
1. Receive an array as a parameter that will take the fifa data as its argument
2. Return an array of objects with the data of the finals games<str>teams that made it to the final stage</str>

💡 HINT - you should be looking at the stage key inside of the objects
*/

function getFinals(array) {
    const finalsTeams = array.filter((game) => {
        return game.Stage === "Final";
    });

    // return finalsTeams.map((game) => {
    //     return {"Year": game["Year"], "Home": game["Home Team Name"], "Away": game["Away Team Name"]}
    // });

    return finalsTeams;
 }

//  console.log(getFinals(fifaData));


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 3: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function called getYears to do the following: 
1. Receive an array as the first parameter that will take fifaData as an argument
2. Receive a callback function as the second parameter that will take getFinals from task 2 as an argument
3. Return an array called years containing all of the years in the getFinals data set*/

function getYears(array, callback) {
    const years = callback(array).map((game) => {
        return game.Year;
    })
    return years;
}

// console.log(getYears(fifaData, getFinals));



/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 4: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function getWinners to do the following:  
1. Receive an array as the first parameter that will take fifaData as an argument
2. Receive a callback function as the second parameter that will take getFinals from task 2 as an argument
3. Determines the winner (home or away) of each `finals` game. 
💡 HINT: Don't worry about ties for now (Please see the README file for info on ties for a stretch goal.)
4. Returns the names of all winning countries in an array called `winners` */ 

function getWinners(array, callback) {
    const finals = callback(array);

    const winners = finals.map((game) => {
        if(game["Home Team Goals"] > game["Away Team Goals"]) {
            return game["Home Team Name"];
        } else {
            return game["Away Team Name"];
        }
    });

    return winners;
} // Returns array of winners ["Argentina", "Uraguay", "Germany", etc.]

// console.log(getWinners(fifaData, getFinals))

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 5: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use the higher-order function getWinnersByYear to do the following:
1. Receive an array as the first parameter that will take fifaData as an argument
2. Receive a callback function as the second parameter that will take getFinals from task 2 as an argument
3. Receive a callback function as the third parameter that will take getYears from task 3 as an argument
4. Receive a callback function as the fourth parameter that will take getWinners from task 4 as an argument
5. Return an array of strings that say "In {year}, {country} won the world cup!" 

💡 HINT: the strings returned need to exactly match the string in step 4.
 */

// Game[] getFinals(Game[])
// int[] getYears(Game [], function())
// String[] getWinners(Game [], function())
// getWinnersByYear(Game[], function(), function(), function())

function getWinnersByYear(array, callback1 /*getFinals*/, callback2 /*getYears*/, callback3/*getWinners*/) {
    const yearsArray = getYears(array, callback1);
    const winnersArray = getWinners(array, callback1);
    
    const winnerYearStrings = [];
    for(let i = 0; i < winnersArray.length; i++) {
        winnerYearStrings.push(`In ${yearsArray[i]}, ${winnersArray[i]} won the world cup!`)
    }

    return winnerYearStrings; // `In ${}, ${} won the world cup!`;
}

// console.log(getWinnersByYear(fifaData, getFinals, getYears, getWinners));



/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 6: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher order function `getAverageGoals` to do the following: 
 1. Receive a callback function as a parameter that will take `getFinals` (from task 2) as an argument; ensure you pass in `fifaData` as its argument
 
 💡 HINT: Example of invocation: `getAverageGoals(getFinals(fifaData));`

 2. Calculate the AVERAGE number of the TOTAL home team goals AND TOTAL away team goals scored PER MATCH

 3. Round to the second decimal place and return the value
 
 💡 HINT: use .reduce, .toFixed (refer to MDN for syntax), and do this in 2 steps) 
 
*/

function getAverageGoals(array) {
    let totalGoals = array.reduce((acc, game) => {
        return acc + game["Away Team Goals"] + game["Home Team Goals"];
    }, 0);

    return (Math.round((totalGoals / array.length) * 100) / 100).toString();
 }

// console.log(getAverageGoals(getFinals(fifaData)));



/// 🥅 STRETCH 🥅 ///

/* 💪💪💪💪💪 Stretch 1: 💪💪💪💪💪 
Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(array, initials) {

    /* code here */

}

console.log(getCountryWins(fifaData, "PER"));



/* 💪💪💪💪💪 Stretch 2: 💪💪💪💪💪 
Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals(/* code here */) {

    /* code here */

}


/* 💪💪💪💪💪 Stretch 3: 💪💪💪💪💪
Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(/* code here */) {

    /* code here */

}


/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */


/* 🛑🛑🛑🛑🛑 Please do not modify anything below this line 🛑🛑🛑🛑🛑 */
function foo(){
    console.log('its working');
    return 'bar';
}
foo();
module.exports = {
    foo,
    getFinals,
    getYears,
    getWinners,
    getWinnersByYear,
    getAverageGoals
}
