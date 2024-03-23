//Import express and path modules.
const express =  require('express');
const path = require("path");
//Initialize the app as an instance of express 
const app= express();
//Serve the static files from the react app
app.use(express.static(path.join(__dirname, "build")));
//Redirect every request to index.html
app.get('/*', function (req, res) {
    res.sendFile(path.join (__dirname + "build","index.html"));
});
//Listen to the default port 80
app.listen(80)