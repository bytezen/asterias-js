// src/scripts/ducks/simulation.js


var simulation = (function(){
    //export const types = {
    
    function runSimulation(state,fitFn) {
        
    }
    
    function update(state, newstate) {
        return Object.assign({},state,newstate);
    }
    
    function addToPopulation(pool,org) {
        var newOrganism = {},
            newPool = {};

        newOrganism[org.name] = org;                
        newPool['poolById'] = update(pool,newOrganism)

        return newPool
    }
    
    function addId(arr,name) {
        return arr.concat(name);
    }
    
    var types = {
            ADD_TO_POPULATION: "SIMULATION/ADD_TO_POPULATION",
            ADD_GROUP_TO_POPULATION: "SIMULATION/ADD_GROUP_TO_POPULATION",
        SETUP: '',
        RUN: 'SIMULATION/RUN',
        ADD_FITNESS_MODEL:'',
            RESET:             "SIMULATION/RESET"
        },
        initialState = {
            mutationRate: 0,
            populationSize: 20,
            poolById: {},
            allIds: [],
            generations: 0,
            fitness: fitnessAPI.ordinalModel
        }
    
    return {
        types: types,

        //export const initialState = {
        initialState: initialState,

        //export default (state=initialState, action) => { }
        reducer: 
            function simulationReducer(state, action) {
                state  = _.isNil(state) ? initialState : state;
                switch(action.type) {
                    case types.ADD_TO_POPULATION:
                        var newPool = addToPopulation(state.poolById,action.payload.organism);
                        var nextState = update(state, newPool)        
                        nextState.allIds = addId(nextState.allIds, action.payload.organism.name)    
//                        var newOrganism = {},
//                            newPool = {};
//
//                        newOrganism[action.payload.organism.name] = action.payload.organism;                
//                        newPool['poolById'] = update(state.poolById,newOrganism)
//
//                        nextState = update(state, newPool)

                        return nextState;
                        
                    case types.ADD_GROUP_TO_POPULATION:                        
                        var newPool = {poolById: update({},state.poolById)};
                        newPool.poolById = _.reduce(action.payload.organisms,
                                              function(res,asterias){
                                                var obj = {};
                                                obj[asterias.name] = asterias
                                                return update(res,obj);
                                              },
                                              newPool.poolById)
                        nextState = update(state,newPool)
                        return nextState;
                        
                    case types.RESET:
                        return initialState;
                        
                    default:
                        return state;
            }
        },


        //export const actions = {
        actions: {
            addAsterias: function(obj) { 
                            return {type:types.ADD_TO_POPULATION, payload:{organism: obj}}
                        },
            
            addMultipleOrganisms: function(arr) {
                            return {type: types.ADD_GROUP_TO_POPULATION, payload: {organisms: arr}}
                        },
            
            resetSim: function() { return {type:types.RESET}}
        }
        
    }

}())