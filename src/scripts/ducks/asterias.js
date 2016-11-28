// src/scripts/ducks/simulation.js

var asterias = (function(){
    function update(state, newstate) {
        return Object.assign({},state,newstate);
    }    
    
    return {
        types: {
            
        },
        
        initialState: {
            name: undefined,
            genes: {
                    ring: 0.0,
                    point: 0.0,
                    size: 0.4,
                    pointiness: 0.5,
                    brightness: 0.0,
                    twisty: 0.0,
                    color: 0.0,
                    shadow: 0.0,
                    nucleus: 1.0,
                    coil: 0.5
            },
            
            //determines gene order
            chromosome: [
                    'ring',
                    'point',
                    'size',
                    'pointiness',
                    'brightness',
                    'twisty',
                    'color',
                    'shadow',
                    'nucleus',
                    'coil'
            ]
            
        },
        
        reducer: function(state,action) {
            
        },
        
        actions: {
            
        }
    }
    
}())
//export const types = {