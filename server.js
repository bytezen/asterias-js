var connect = require('connect'),
    serveStatic = require('serve-static'),
    path = require('path'),
    http = require('http'),
    argv = require('yargs')
            .usage("Usage: $0 <rootdir>")
            .demand(1)
            .command('rootdir','directory to serve files from')
            .argv

var server = connect();

var dir = argv._[0];


//livereload middleware
//I think this has to be before serveStatic middleware
server.use(require('connect-livereload')({
    port: 35729
}))

//static middleware
server.use(serveStatic(argv._[0]));


//make the server and serve it
http.createServer(server).listen(3000);

// watch the root directory for changes
var livereload = require('livereload'),
    lrserver = livereload.createServer({},(x)=>{
        console.log("we are reloading...")        
    })

lrserver.watch(__dirname + "/" + dir);