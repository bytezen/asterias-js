/**
* return an object with a method that will run genetic algorithm using 
* the fitness function provided
*
* @param fit {Function} a function that calculate the fitness as a percentage.
*           The fitness model will be called with an array of obj that represents 
*           the population. It is up to the fitness function to know how to access
*           the values for the members of the population
* @param mutationRate {Number} chance of random mutations in evolution
*/


var geneticAlgorithmAPI = function(fit,mutationRate){ 
    var compact = bytezenAPI.compact
    debug = false;
    
    if(arguments.length == 3 && arguments[2] === true) {
        debug = true;
    }
    
    /**
    * given an array of objects and a model for evaluating the fitness of those 
    * objects return an array where the counts of the objects are equivalent to *their fitness
    *
    * @return array
    */
    
    function population(organisms,fitModel) {
        //arr of items
        //fitModel function will return count of those items needed
        //make fitModelNum copies of those items                
        
        //TODO:?? may need to merge organisms and fitness
        var pool = _.map(organisms,
                         function(val){
                            var count = fitModel.apply(null,Array.from(arguments));     
                            return _.fill(new Array(count),val)
                        })
        
//        console.log('GA.population param:')
//        console.log(arr)
//        console.log('GA.population pool:')
//        console.log(pool)
        return _.flatten(pool);
    }
    
    /**
    * return array of two unique values from arr
    */
    var parents = function(arr,selfMating) {
        selfMating = !_.isNil(selfMating) ? selfMating : false;
        
        var mom = _.sample(arr),
            dad;

        if(selfMating) {
            dad = _.sample(arr)
        } else {
            dad = _.sample(_.filter(arr,function(o){ return o.name != mom.name}))
        }
                          
        return [mom,dad];
    }
    
    
    /*
    * Given array a and b return a new array that
    * takes the first t% from the shorter array and 1-t%
    * from the longer array. If both arrays are the same length
    * then the first array will contribute its first t% of the elements
    * and the second array will contribute the remainder
    */
    function computeOffspringLevels(a,b,t) {
        var parents = _.sortBy([a,b], 'length')
        var len = parents[0].length,            
            left = parents[0],
            //trim longer to the same length
            right = _.dropRight(parents[1], parents[1].length - len)
        
        var takeNumber = Math.floor(t * len);
                
        var kidgenes = _.concat(_.take(left,takeNumber),
                                _.drop(right,takeNumber));      
            
        return kidgenes;
    }
    
    /**
    * create a new array by splicing [0..t) from array1 with [t..n) of array 2.
    * If the arrays are different lengths then use the shorter of the two to calculate
    * the snipping point.
    *
    * @param {Array} a first array
    * @param {Array} b second array
    * @param {Number} t number between 0 and 1, 0 = beginning of array 1 is end
    */
    var progeny = function(levelsArr1, levelsArr2, split) {
        
//        console.log(levelsArr1)
        var genes = computeOffspringLevels(levelsArr1,levelsArr2,split)
        
//        console.log(levelsArr1)    
//        console.log('--genes')
//        console.log(genes)
//        console.log(genes === levelsArr1)
        var kidExpressionLevel = _.reduce(genes,
                                          function(acc,g)                 {
                                            acc[_.keys(g)[0]] = _.values(g)[0];
                                            return acc;
                                        }, {})
//        var kidExpressionLevel = _.assign.apply(
//                {},
//                genes)
//        console.log(kidExpressionLevel)
//        console.log(levelsArr1)     
        
        return kidExpressionLevel;
    }
    
    var mutate = function(levelsObj, mutationRate) {
        var ret, debug = []
        ret = _.mapValues(levelsObj,
                   function(v,k){
                     if(Math.random() < mutationRate) {
                         debug.push(k)
                         return Math.random()
                     } else {
                         return v;
                     }   
                 })
        return ret;   
    }
    
    /*
    *
    * options( chromosomeSplit: default = random,
    *          selfMating: default = false   )
    */
    function runSimulation(organisms,nextPopulationSize,model,opt) {
//        var GA = geneticAlgorithmAPI(model,0,true); 
//        opt = _.defaults(opt,{chromosomeSplit: function(){Math.random}})
        var chromosomeSplit, selfMating, mutationRate;
        
        selfMating = !_.isNil(opt.selfMating) ? opt.selfMating : false
        chromosomeSplit = !_.isNil(opt.chromosomeSplit) 
                                ? function(){return opt.ChromosomeSplit;} 
                                : Math.random
        mutationRate = !_.isNil(opt.mutationRate) ? opt.mutationRate : 0.0
        
        var nextPool = {},
            nextParentPool = {},
            mates,
            progenyName
        
        //1. generate mating pool
        //fitness return the counts of an organism
        var matingpool = population(organisms,model)
        
        
//        console.log(matingpool)
        _.times(nextPopulationSize,
                function() {
                    mates = parents(matingpool,selfMating)
                    split = chromosomeSplit();// || Math.random()
                    
//                    console.log(split,mates[0].levels,mates[1].levels)
                    
                    kidgenes = progeny(mates[0].getLevels(),mates[1].getLevels(), split);
                    if(mutationRate > 0 ) {
                        kidgenes = mutate(kidgenes,mutationRate)
                    }
//                    console.log(kidgenes)    
                
                    progenyName = 'ast_' + Math.random().toFixed(5)
                    
                    nextPool[progenyName] = 
                        asteriasAPI.newAsterias(progenyName, kidgenes)
                    
                    nextParentPool[progenyName] = {mom: mates[0], dad:mates[1]}
                })

        return {nextPool: nextPool, nextParentPool:nextParentPool};
        // for the number of progeny needed:
        //          GA.parents
        //          GA.progeny
        //          createAsterias from progeny
        //          poolId
        //          add new population
        
            
    }    
    
    
//    if(!debug) {
//        return {
//            run: runSim
//        }
//    } else {
        return {
//            run: runSim,
            population: population,
            parents: parents,
            progeny: progeny,
            mutate: mutate,
            runSimulation: runSimulation
        }
//    }
}