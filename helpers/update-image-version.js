const services = require('../services.json');
const fs = require('fs');

/*
* [
*   'node',
*   './update-image-version.js'
*   <image-name>
* ]
* */
const newImageName = process.argv[2];

// Change the value in the in-memory object
services.api.image = newImageName;
// Serialize as JSON and write it to a file
fs.writeFileSync('./services.json', JSON.stringify(services));
