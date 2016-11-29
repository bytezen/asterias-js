var asteriasGrid = function(config){
    var defaultProps = {children:undefined,
                        rows:0, columns:0,
                        width:0, height:0, 
                        center: true,
                        style: {fill: "black", stroke: "white"}
                       },
        defaultState = { component: undefined }
    
    var props = _.defaults(config, defaultProps),
        state = _.defaults({}, defaultState)    
    
    var _grid = gridAPI({width: props.width, height: props.height, 
                         rows:props.rows, cols: props.cols, center: props.center});
    
    
    function render(){
        if(!props.children)
            return;
        //at every grid origin draw a child if there is one assigned
        var childCount = props.children.length;
        
        console.log(_grid.origins)
        _.each(_grid.origins,
               function(p,i) {
                    if(i<childCount) {
                        push();
                        console.log(p)
                        translate(p[0],p[1])
                        props.children[i].render();
                        pop();
                    }        
                }
        );

        
    }

    var component = { props: props,
                      render: render};
    component.render = render.bind(component);        
    
    return component;
}