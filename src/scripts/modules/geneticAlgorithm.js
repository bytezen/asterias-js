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
    
    function population(arr,fit) {
        //arr of items
        //fit function will return count of those items needed
        //make fitNum copies of those items
        var pool = _.map(arr,
                         function(val){
                            var count = fit.apply(null,Array.from(arguments));     
                            return _.fill(new Array(count),val)
                        })
        
        return _.flatten(pool);
    }
    
    /**
    * return array of two unique values from arr
    */
    var parents = function(arr) {
        var mom = _.sample(arr);
        var dad = _.sample(_.nth(_.partition(arr,{name: mom.name}),
                                1)
                          )
        return [mom,dad];
    }
    
    
    function computeOffspringGenes(a,b,t) {
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
    var progeny = function(parent1, parent2, split) {
        var genes = computeOffspringGenes(parent1,parent2,split),
            kidExpressionLevel = _.assign.apply(
                {},
                asteriasAPI.chromosomeLevels(genes))
        
        return kidExpressionLevel;
    }
    
    if(!debug) {
        return {
            run: runSim
        }
    } else {
        return {
//            run: runSim,
            population: population,
            parents: parents,
            progeny: progeny
        }
    }
}