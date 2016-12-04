var asteriasGrid = function(config){
    var defaultProps = {children:undefined,
                        rows:0, columns:0,
                        width:0, height:0, 
                        center: true,
                        style: {fill: "black", stroke: "white"}
                       },
        defaultState = { component: undefined, children: undefined, mousePos:[-100,-100] }
    
    var props = _.defaults(config, defaultProps),
        state = _.defaults({}, defaultState)    
    
    var _grid = gridAPI({width: props.width, height: props.height, 
                         rows:props.rows, cols: props.cols, center: props.center});
    
    function setState(nextState) {
        state = _.assign({},state, nextState);
        return state;
    }
    
    function inBounds(x,y,l,r,t,b) {
        return (_.inRange(x,l,r) && _.inRange(y, t, b))        
    }
    
    var factor, width, height, hWidth, hHeight
    
    function _renderBg() {
//        var factor = .95,
//            width = _grid.cellSize[0] * factor,
//            height = width / _grid.ar,
//            hWidth = 0.5 * width,
//            hHeight = 0.5 * height;
        
        if(props.center) {
            rectMode(CENTER);    
        }
        noFill();
        stroke('purple');
        
        _.each(_grid.origins,
               function(p){
                push();
//                if(_.inRange(state.mousePos[0], p[0] - hWidth, p[0] + hWidth) &&
//                   _.inRange(state.mousePos[1], p[1] - hHeight, p[1] + hHeight)) {
//                    fill(60,100,100);
//                }
                if( inBounds(state.mousePos[0] , state.mousePos[1],
                            p[0] - hWidth, p[0] + hWidth ,
                            p[1] - hHeight, p[1] + hHeight)) {
                    fill(60,100,100)
                }
                translate(p[0],p[1])
                rect(0,0,width,height)
                pop();
            })
    }
    
    function render(){
        factor = .95, 
        width = _grid.cellSize[0] * factor,
        height = width / _grid.ar,
        hWidth = 0.5 * width,
        hHeight = 0.5 * height;        
        
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
                            
                            state.children[i].setState(
                                {mouseOver: inBounds(state.mousePos[0] ,                            state.mousePos[1],
                                                     p[0] - hWidth, 
                                                     p[0] + hWidth,
                                                     p[1] - hHeight,
                                                     p[1] + hHeight),
                                 mousePos: [state.mousePos[0], state.mousePos[1]],
                                 mouseClicked: state.mouseClicked,
                                 mouseClickedPos: state.mouseClickedPos,
                                 mouseBtn: state.mouseBtn
                                })
                                                
                        
                        state.children[i].render();
                        pop();
                    }        
                }
        );

        
    }

    function hoverCell(mx,my) {     
        
        var childCount = state.children.length;
        var _cell = undefined;
        var found = _.find(_grid.origins,
               function(p,i) {
                    if(i<childCount) {                        
                        if(inBounds(mx,my,
                                 p[0] - hWidth,
                                 p[0] + hWidth,
                                 p[1] - hHeight,
                                 p[1] + hHeight)) {
                            
                            _cell = state.children[i];
                            return true;
                        }
                    } else {
                        return false;
                    }
                });
        return _cell;
    }
    
    var component = { props: props,
                      render: render,
                      clear: function(){
                                console.log('11111111')
                                console.log(props)
                                props.children = [];
                                console.log(this.props)
                                console.log('0000000')
                            },
                      hoverCell: hoverCell
                    };
    
    component.render = render.bind(component);        
    component.setState = setState.bind(component);
    
    component.setState({children: props.children})
    return component;
}