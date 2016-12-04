var _ordinal16 = [15,14,12,11,9,9,8,6,5,3,2,2,2,2,2,2];


var fitnessAPI = (function(){
    
    /**
    * get fitness based on an index
    * 
    * @param: index {number} a number less than 20
    *
    * @return fitness
    */
    function ordinalRankFitness(val,ind){
        if(ind < 0 || ind >= _ordinal16.length){
            throw new RangeError("index: " + ind + " out of range " + _ordinal16.length)
        }
//        console.log(val,_ordinal16[ind])
        return _ordinal16[ind];
    }
    
    function equal() {
        return 1;    
    }
    
    
    //0 pop items will get this assigned randomly
    //opt.minPopularity = 1
    //  organisms with votes should be atleast this many times
    //  more popular than the ones that get randomly inflated
    //opt.popularityFactor = 2    
    // probability 0 vote organism will be assigned minPopularity
    //opt.pLive
    
    //return a function that will use opt to calculate the fitness
    function popularityVoteFactory(opt) {
        // all scored organisms should have this much added to their votes
        var shift = opt.minPopularity * opt.popularityFactor;
//        var newFitness = _.assign({},fitnessById)
        
        /*
        * the arguments will be injected by the caller
        * when the sim is run
        */
        return function(organism,index,coll) {
//            console.log('called popularity fitness model with: ')
//            console.log(arguments)
            
            var count = 0;
            //Ok...
            
            //if the fitness is 0 return minPopularity with prob pLive
            if(organism.fitness == 0 ) {
                if(Math.random() < opt.pLive) {
//                    console.log("**** organism " + organism.name + " is gonna live!!!")
                    count = opt.minPopularity
                }
            } else {
                count = organism.fitness + shift
            }
            
//            console.log("{popularityFitness}",
//                        organism.name,
//                        organism.fitness,
//                        count)
            return count;
        }
        
//        _.each(newFitness,
//              function(v,k,coll){
//                if( v > 0 ) {
//                    coll[k] = v + popularityShift
//                } else if( Math.random() < pLive ) {
//                    coll[k] = minPopularity;
//                } 
//        })
//        
//        return newFitness;
    }
    
    //REMEMBER -- Fitness function will be passed in the following 
    //parameters (value, key, collection)
    
    return {
        ordinalModel: ordinalRankFitness,
        ordinal16: _ordinal16,
        equal: equal,
        getPopularityModel: popularityVoteFactory
    }
}())