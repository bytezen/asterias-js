var asteriasGrid = function(config){
    var defaultProps = {children:undefined,
                        rows:0, columns:0,
                        width:0, height:0, 
                        center: true,
                        style: {fill: "black", stroke: "white"}
                       },
        defaultState = { component: undefined, children: undefined }
    
    var props = _.defaults(config, defaultProps),
        state = _.defaults({}, defaultState)    
    
    var _grid = gridAPI({width: props.width, height: props.height, 
                         rows:props.rows, cols: props.cols, center: props.center});
    
    function setState(nextState) {
        state = _.assign({},state, nextState);
        return state;
    }
    
    function _renderBg() {
        var factor = .95,
            width = _grid.cellSize[0] * factor,
            height = width / _grid.ar;
        
        if(props.center) {
            rectMode(CENTER);    
        }
        noFill();
        stroke('purple');
        
        _.each(_grid.origins,
               function(p){
                push();
                translate(p[0],p[1])
                rect(0,0,width,height)
                pop();
            })
    }
    
    function render(){
        //at every grid origin draw a child if there is one assigned
        var childCount = state.children.length;
        _renderBg()
        
        if(!state.children) {
            console.log('NO CHILLUNSS')
            return;   
        }
        
        _.each(_grid.origins,
               function(p,i) {
                    if(i<childCount) {
                        push();
                        translate(p[0],p[1])
                        state.children[i].render();
                        pop();
                    }        
                }
        );

        
    }

    var component = { props: props,
                      render: render,
                      clear: function(){
                                console.log('11111111')
                                console.log(props)
                                props.children = [];
                                console.log(this.props)
                                console.log('0000000')
                            }                     
                    };
    
    component.render = render.bind(component);        
    component.setState = setState.bind(component);
    
    component.setState({children: props.children})
    return component;
}