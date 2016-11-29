//var R = Redux.combineReducers({simulation: simulation.reducer});

/* 1. Setup Redux for the app */

var store = Redux.createStore(simulation.reducer),
    getState = store.getState,
    dispatch = function(action) {
                    console.log("{dispatching: " + action.type  +"}");
                    console.log("\t...action")
                    console.log(action);
                    store.dispatch(action);
                }


/* 2. Create components */
//dummy children to test
var ellipseComponent = function(config){
    var props = _.defaults({size: 10, fill: 'yellow'},config)
    
    return {
        render: function ellipseRender(){                        
            if(!_.isNil(props.stroke)) {
                stroke(props.stroke);
            } else {
                noStroke()
            }
            fill(props.fill)
            ellipse(0,0,props.size,props.size)
        }
    }
}

//-----


//var grid = asteriasGrid();