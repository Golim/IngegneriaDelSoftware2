var parameters = process.argv;

if(parameters.length !== 3){
    console.log("Usage: node evennumbers.js n\nWhere n is an integer number");
} else {
    var number = parseInt(parameters[2], 10);
    if(number % 2 === 0)
        console.log("The number is even");
    else
        console.log("The number is odd");
}