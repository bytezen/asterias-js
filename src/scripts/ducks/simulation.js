// src/scripts/ducks/simulation.js


var simulation = (function(){

//    var GA, population, matingPool;
//
//    before(function(){
//        population = _.map(_.range(16),
//                          function(i) {
//                            return asteriasAPI.newAsterias('a_'+i);
//                        })        
//    })
    
        
//        matingPool = GA.population(population,fitness)
    var GA = geneticAlgorithmAPI();
    
    function runSimulation(state) {
        var organisms = _.values(_.mapValues(state.poolById,
                                            function(v,k){
                                                 return _.assign({fitness:state.fitnessById[k]},
                                                                 v)
//                                                state.fitnessById[k];
                                            }
                                    ));        
        return GA.runSimulation(organisms,
                                state.populationSize,
                                state.fitness)            
    }
    
    function update(state, newstate) {
        return Object.assign({},state,newstate);
    }
    
    function addToPopulation(pool,org) {
        console.log(pool)
        console.log(org)
        var newOrganism = {},
            newPool = {};

        newOrganism[org.name] = org;                
        newPool['poolById'] = update(pool,newOrganism)

        return newPool
    }
    
    function addIds(arr,id) {
        return arr.concat(id);
    }
    
    function randomId() {
        var stem = (Math.random() * Math.random()).toFixed(5)
        return 'ast_'+stem
    }
    
    function randomAsterias() {        
        var ret = asteriasAPI.newAsterias(randomId())
        
        _.each(ret.chromosome,
               function(g){ 
                    var gene = _.keys(g)[0]
                    ret.expression(gene,Math.random())
                }); 
        return ret;
    }
    

    
    
    var types = {
            ADD_TO_POPULATION: "SIMULATION/ADD_TO_POPULATION",
            ADD_GROUP_TO_POPULATION: "SIMULATION/ADD_GROUP_TO_POPULATION",
            SETUP: '',
            RUN: 'SIMULATION/RUN',
            SET_FITNESS_MODEL:'SIMULATION/SET_FITNESS_MODEL',
            RESET: "SIMULATION/RESET",
            GENERATE_POPULATION: "SIMULATION/GENERATE_POPULATION",
            SIM_SIZE: "SIMULATION/SET_POPULATION_SIZE",
            ADJ_FITNESS: "SIMULATION/ADJUST_FITNESS",
        },
        initialState = {
            mutationRate: 0,
            populationSize: 20,
            poolById: {},
            parentsById: {},
            allIds: [], // only poolIds
            generations: 0,
            fitness: fitnessAPI.equal,
            fitnessById: {}
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
                        nextState.allIds = addIds(nextState.allIds, action.payload.organism.name)    
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
                        newPool.poolById =
                            _.reduce(_.take(action.payload.organisms,
                                            state.populationSize),
                                              function(res,asterias){
                                                var obj = {};
                                                obj[asterias.name] = asterias
                                                return update(res,obj);
                                              },
                                              newPool.poolById)
                        nextState = update(state,newPool)

                        nextState.allIds = addIds(nextState.allIds,_.keys(nextState.poolById))                        
                        
                        nextState.fitnessById =
                            _.mapValues(nextState.poolById, function(){return 0;})
                        
                        
                        return nextState;
                        
                    case types.GENERATE_POPULATION:
                        var randomPop = _.map(_.range(state.populationSize),
                                              randomAsterias)
//                        console.log(randomPop)
                        var nextPool = {poolById: update({},state.poolById)};
                        nextPool.poolById = _.reduce(randomPop,
                                              function(res,asterias){
                                                var obj = {};
                                                obj[asterias.name] = asterias
                                                return update(res,obj);
                                              },
                                              nextPool.poolById)
//                        console.log(nextPool);
                        nextState = update(state,nextPool)                        
                        
                        nextState.allIds = addIds(nextState.allIds,_.keys(nextState.poolById))                        
                        
                        nextState.fitnessById =
                            _.mapValues(nextState.poolById, function(){return 0;})
//                        FOR SINGLE ORG                        
//                        var newOrg = randomAsterias()
//                        var newPool = addToPopulation(state.poolById,newOrg);
//                        var nextState = update(state, newPool)        
//                        nextState.allIds = addId(nextState.allIds, newOrg.name)    
                        return nextState;
                    
                    case types.RUN:
                        var simResults = runSimulation(state)
                        var nextPool = {poolById: simResults.nextPool}
                        nextState = update(state,nextPool)
                        nextState.allIds = _.keys(nextState.poolById);
                        nextState.parentsById = simResults.nextParentPool;
                        nextState.fitnessById = _.assign({},initialState.fitnessById)
                        return nextState;
                        
                    case types.RESET:
                        var nextState = initialState                        
                        return update(nextState,action.payload);
                    
                    case types.SIM_SIZE:                        
                        return update(state,{populationSize: action.payload});
                    
                    case types.ADJ_FITNESS:
                        var updatedObj = {},
                            id = action.payload.id,
                            amt = action.payload.amt;
                        
                        updatedObj[id] = Math.max(0,state.fitnessById[id] + amt)
                            
                        var nextFitnessById = { 
                            fitnessById: update(state.fitnessById,
                                                updatedObj)}
                        
                        return update(state,nextFitnessById)
                        
                        
                    case types.SET_FITNESS_MODEL:
                        return update(state,{fitness: action.payload});
                        break;
                        
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
            
            generatePopulation: function() {
                            return {type: types.GENERATE_POPULATION}
                        },
            
            runSimulation: function() { return {type:types.RUN} },
            
            simulationSize: function(num) { return {type:types.SIM_SIZE, 
                                                    payload: num}},
            
            resetSim: function(opt) { return {type:types.RESET, payload:opt}},
            
            setFitnessModel: function(model) { 
                return {type:types.SET_FITNESS_MODEL, payload:model}
            },
            
            adjustFitness: function(payload/*id: id, amt: amt*/) {
                return {type:types.ADJ_FITNESS, payload:payload}},
            
            increaseFitness: function(amt) { return {type:types.INC_FITNESS, payload:amt}},
            
            decreaseFitness: function(amt) { return { type:types.DEC_FITNESS, payload:amt }}
        },
        
        utils: {
            randomAsterias: randomAsterias
        }
        
    }

}())