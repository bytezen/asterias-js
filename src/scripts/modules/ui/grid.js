var gridAPI = function makeGrid(config) {
    var defaults = { width: 400, height: 400, rows: 4, cols: 4, center: false},
        opt = _.defaults(config,defaults),
        cellwidth = opt.width/opt.cols,
        cellheight = opt.height/opt.rows,
        rowrange = [0,opt.height],
        colrange = [0,opt.width],
        rowitercount = opt.rows,
        colitercount = opt.cols;
    
    if(opt.center) {
        var halfwidth = cellwidth * 0.5,
            halfheight = cellheight * 0.5;
        
        rowrange = [halfheight, opt.height - halfheight]
        colrange = [halfwidth, opt.width - halfwidth]
        
        rowitercount = opt.rows - 1;
        colitercount = opt.cols - 1;
        
        console.log(rowrange)
        console.log(colrange)
    }
    
//    console.log(opt);
    
    //create coordinates column Major
    var colpts = _.times(opt.cols,
                        function(j){
                            return bytezenAPI.map(j,0,colitercount,colrange[0],colrange[1]);
                        }
                );
//    console.log('cols--')
//    console.log(colpts);
    
    
    var rowpts = _.times(opt.rows,
                        function(i){
                            return bytezenAPI.map(i,0,rowitercount,rowrange[0],rowrange[1]);
                        }
                ); 
    if(!opt.center) {
        console.log('cows--')
        console.log(colitercount, colrange)
        console.log(colpts)
    }

    //returns the right combination of coordinates, but col major form
    var origins = bytezenAPI.product(colpts,rowpts);
    
    //convert from colMajor to rowMajor
    origins = _.flatten(_.zip.apply(null,
                                    _.chunk(origins, opt.rows)
                                   )
                       )
    
    
    return {
        cellSize: [cellwidth,cellheight],
        origins: origins,
        ar: cellwidth / cellheight
    }
}