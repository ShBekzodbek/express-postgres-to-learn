const http = require('http');
const app = require("./src/index");

require('dotenv').config();


const server = http.createServer(app);

// _________LISTEN PORT___________
const port = process.env.PORT || 5000

server.listen(port, () => console.log("Listening port on " + port))