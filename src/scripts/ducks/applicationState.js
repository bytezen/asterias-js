// src/scripts/ducks/simulation.js


var applicationState = (function(){    
    
    function update(state, newstate) {
        return Object.assign({},state,newstate);
    }    
    
    var constants = { 
            evolveMode : "EVOLVE_MODE",
            modalParentMode: "MODAL_PARENT_MODE"
        },
        
        types = {
            changeMode: "APP_STATE/CHANGE_MODE"
        },
        
        initialState = {
            mode: constants.evolveMode
        }
    
    
    function appStateReducer(state,action) {
        state  = _.isNil(state) ? initialState : state;        
        
        switch(action.type) {
            case types.changeMode:
                return update(state,{mode: action.payload.mode})
            default:
                return state
        }
    }
    
    return {
        types: types,
        
        constants: constants,

        //export const initialState = {
        initialState: initialState,

        //export default (state=initialState, action) => { }
        reducer: appStateReducer,

        //export const actions = {
        actions: {
            changeMode: function(mode /*string*/) {
                return {type: types.changeMode, payload:{mode: mode}}
            }
        },
        
        utils: {
        }
        
    }

}())