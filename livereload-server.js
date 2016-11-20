var connect = require('connect'),
    createStatic = require('connect-static'),
    path = require('path'),
    http = require('http'),
    argv = require('yargs')
            .usage("Usage: $0 <rootdir>")
            .demand(1)
            .command('rootdir','directory to serve files from')
            .argv

var server = connect();

var dir = argv._[0];

// these are the default options
var options = {
  dir: "public",
  aliases: [
    ['/', '/index.html'],
  ],
  ignoreFile: function(fullPath) {
    var basename = path.basename(fullPath);
    return /^\./.test(basename) || /~$/.test(basename);
  },
  followSymlinks: true,
  cacheControlHeader: "max-age=0, must-revalidate",
}

createStatic({dir, 
              ignoreFile: ()=>{return false;}
             },
             (err,middleware) => {
                    if (err) throw err;
                    server.use('/',middleware);    
                })

http.createServer(server).listen(3000);

var livereload = require('livereload'),
    lrserver = livereload.createServer()

lrserver.watch(__dirname);

