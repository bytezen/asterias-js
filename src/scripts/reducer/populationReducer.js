var populationReducer = (function(){
    var initState = {        
            "byId" : {
                
            },
            "allIds" : []
        }
//        position: [0,0],
//        ring: genomeConfig.minring,
//        size: genomeConfig.minsize 
    
        
    
    function update(state,mutations) {
        return Object.assign({},state,mutations);        
    }
    
    /**
    * takes the object returned from createAsterias and
    * converts it to an objec with geneName indexes and geneExpression Level values
    */
    function createOrganism() {
        var ret = {};
        var organism = createAsterias();
        //get all properties of form xxxxLevel, 
        //where xxxx is the gene name and xxxxLevel is a function
        //returning the level for that gene
        ret = _.filter(_.map(organism,
                            function(val,key){               
                                var ind = key.search(/Level/)
                                if(ind > 0) {
                                    var ret = {}
                                    ret[key.substring(0,ind)] = val();
                                    return [key.substring(0,ind),val()]
                                }
                                return undefined;
                            }),
                        function(item) {
                            return !_.isNil(item);
                        });

        //convert the array from above into an object of
        // {geneName: expressionLevel, geneName: expressionLevel}
        // format
        ret = _.reduce(ret,
                       function(obj,i,ind) { 
                            obj[i[0]] =i[1];
                            return obj;
                        },
                       {})
        
//        console.log(ret);
        return ret;
    }
    
    var reducer = function(state,action) {
        var nextState;
        state = _.isNil(state) ? initState : state 
        
        console.log('calling population reducer.. with: {' + action.type +'}')
//        console.log(state)
//        console.log(action)
//        console.log(nextState);
        
        switch(action.type) {
            case 'createOrganism':
                console.log('\t...create organism')
                
                var id = action.payload.name;
                var org = {};                
                org[action.payload.name] = _.pick(action.payload, _.keys(genome));

                var nextById = update(state.byId, org);
                var nextAllIds = state.allIds.concat(id);
                
                nextState = update(state,{byId: nextById, 
                                          allIds: nextAllIds});
                
                expect(state.allIds).toNotEqual(nextState.allIds);
                break;
            case 'expressionChange':
                var oldExpression = state.byId[action.payload.id];
                
//                var newExpression = update(oldExpression,{})
//                nextById = update(state.byId,{})
                nextState = state;
            default:
                nextState = state;
        }
        
        return nextState;
    }
    
    return reducer;
}())