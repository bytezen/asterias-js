var geneticCodeReducer = (function(){
    var initState = { "ring" :[3,21],
                "point": [3,20],
                "size": [50,200],
                "pointiness": [0.01,1.0],
                "brightness": [100,250],
                "twisty": [0,100],
                "color": [0,360],
                "shadow": [30,80],
                "nucleus": [.10,.50],
                "coil": [-1.0,1.0],
            }
    
    function update(state,mutations) {
        return Object.assign({},state,mutations);        
    }
    
    var reducer = function(state,action) {
        var nextState;
        state = _.isNil(state) ? initState : state 
        console.log('calling geneticCode reducer.. with: {' + action.type +'}')
        
        switch(action.type) {
            case 'setGeneExpressionRange':
                var obj = {};
                obj[action.payload.gene] = [action.payload.min, action.payload.max]
                nextState = update(state,obj);  
                break;
            default:
                nextState = state;
        }
        
        return nextState;
    }
    
    return reducer;
}())