var createLife = function(geneticCode) {
    var genes = {};
    var gene, args;
    var organism = {};            
    
    if(!_.isArray(geneticCode)) {
        args = [geneticCode]
    } else {
        args = geneticCode;
    }
    _.each(args, function(a) {  
        var name = a.name;
        if(name != undefined) {                
            
            genes[name] = createGene(a);            
//            genes[name].min(a.min || 0);
//            genes[name].max(a.max || 0);
//            genes[name].val(a.val || genes[name].min());
            
            //create shortcut to get value of gene as property on organism
            organism[name] = genes[name].val();                
            
            //shortcut for setting expression level of gene
            organism[name+'Level'] = function(g) {
                    if(g != undefined) {
                        genes[name].level(g);  
                    }
                    //update the value of this gene since the expr level changed
                    this[name] = genes[name].val();      
                    
                    return genes[name].level();
            }
        }
    })
    
    organism.gene = function(aStr) {
                    if(_.has(organism,aStr)) {
                        return organism[aStr]
                    } else {
                        return undefined;
                    }
                }
    
    return organism;
}