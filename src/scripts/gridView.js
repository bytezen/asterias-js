var canvas;
var gridwidth = 550, gridheight = 400;
var grid = gridAPI({width: gridwidth, height: gridheight, cols: 6});
var grid2 = gridAPI({width: gridwidth, height: gridheight, rows:3, cols: 3, center: true});

//expect(_.isEqual(grid.cellSize,[600/4,100])).toBe(true);

function setup() {
    canvas = createCanvas(gridwidth,gridheight);    
    canvas.parent("sketch");
    rectMode(CENTER);
    textSize(32);
    background(200,175);
    noStroke();
    
    fill(200,0,200);
    _.each(grid.origins, function(pt){
        ellipse(pt[0],pt[1],10,10);        
    })
//    
    _.each(grid2.origins, function(pt){
        ellipse(pt[0],pt[1],10,10);
        push();
        translate(pt[0],pt[1]);
        fill(255);
        rect(0,0,grid2.cellSize[0]*1.0, (grid2.cellSize[0]*1.0)/ grid2.ar);
        fill(200,200,0);
        rect(0,0,grid2.cellSize[0]*.9, (grid2.cellSize[0]*.9)/ grid2.ar);
        pop();
    })
    
    
    
    
    noLoop();
}

function draw () {
    
}