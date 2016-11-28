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
    
    return {
        ordinalModel: ordinalRankFitness,
        ordinal16: _ordinal16
    }
}())