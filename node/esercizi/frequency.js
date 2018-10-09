var parameters = process.argv;

if (parameters.length !== 3) {
    console.log("Usage: node frequency.js path/to/file");
} else {
    var fs = require("fs");
    var fileName = parameters[2];

    var data = fs.readFileSync(fileName).toString().split("\n");

    var frequency = [];
    
    var tag = [];
    var count = 0;

    for(var i = 0; i < data.length; i++){
        if(frequency[data[i]] != null){
            frequency[data[i]]++;
        } else {
            frequency[data[i]] = 1;
            tag[count] = data[i];
            count++;
        }
    }

    
    for(var i = 0; i < tag.length; i++)
        console.log("%s | %d", tag[i], frequency[tag[i]]);
}