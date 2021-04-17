const services = require('./services.json');
const fs = require('fs');

/*
* [
*   'node',
*   './update-image-version.js'
*   <image-name>
* ]
* */
const newImageName = process.argv[2];

//change the value in the in-memory object
services.api.image = newImageName;
//Serialize as JSON and Write it to a file
fs.writeFileSync('./services.json', JSON.stringify(services));
