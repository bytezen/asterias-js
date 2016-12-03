// src/scripts/ducks/simulation.js


var ui = (function(){
    function actionCreator(type) {
        return function(payload) {
            return {type:type, payload:payload}
        }    
    } 
    
    var types = {
        hover: "UI/HOVER",
        mouseMoved: "UI/MOUSE_MOVED",
        mouseClicked: "UI/MOUSE_CLICKED",
        mouseReleased: "UI/MOUSE_RELEASED"
    },
    
    constants = {
        simulation_mode: "UI/SIMULATION_MODE",
        LEFT_MOUSE: "UI/LEFT_MOUSE",
        RIGHT_MOUSE: "UI/RIGHT_MOUSE"
    },
    
    actions = {
        hoverOn: function(id) { 
            return {type:types.hover, payload:id}
        },
        
        mouseMoved: function(mousex,mousey) { 
            return {type:types.mouseMoved, payload:[mousex,mousey]}
        },
        
        mouseClicked: function(event) { 
            return {type:types.mouseClicked, payload:event}
        },
        
        mouseReleased: function() {
            return {type:types.mouseReleased};
        }
        
        
        
    },
        
    initialState = {
        showOrganismDetail: false,
        hoverId: "",
        mousePos: [],
        mouseClicked: true,
        mouseClickedPos: [],
        mouseBtn: -1
    },
        
    reducer = function(state,action) {
        state  = _.isNil(state) ? initialState : state;
        
        switch(action.type) {
            case types.mouseReleased:                
                return _.assign({},state,{mouseClicked: false,
                                         mouseClickedPos:[],
                                         mouseBtn: -1}); 
                
            case types.mouseMoved:                
                return _.assign({},state,{mousePos: action.payload}); 
            case types.mouseClicked:  
                var btn = action.payload.button == 0 ? constants.LEFT_MOUSE :
                constants.RIGHT_MOUSE;
                console.log(btn);
                return _.assign({},
                                state,
                                {mouseClicked:true,                       mouseClickedPos: [action.payload.x, action.payload.y],
                                 mouseBtn: btn
                            });
            default:
                return state;
        }
    }    
    
    return {
        types: types,
        initialState: initialState,
        reducer: reducer,
        actions: actions,        
        utils: { },
        constants: constants
    }

}())