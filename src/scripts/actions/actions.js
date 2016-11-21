


/**
* position an organism
*
*/
function move(id,arr) {
    var action = {type:'move', payload: {id:id, position:arr}}; 
    return action;
}

/**
* add organism to population
*
*/
function create(id) {
    var action = {type:'create', payload: {id:id}} 
    return action;
}

function changeGeneExpression(id,gene,level) {
    return {
            type:"expressionChange",
            payload: {gene:gene, 
                      level:level,
                      id: id 
                     }
    }
}

/**
* create a new asterias
*
* options:
*   - name
*   - initial gene expression levels: [0-1]
*/
function asteriasBirth(opt) {
    // get expression levels for the genes
    var expr = _.defaults(opt, defaultexpr);
    console.log("#### expression ###")
    console.log(expr);
    // scale the expression levels 
    var geneRange = store.getState().dna;
    
    expr = _.mapValues(expr,
               function(v,k,o){
                    if( _.has(geneRange,k) ){
                        return getExpressionValue(k,v);
                    } else {
                        return v;
                    }
                }
              );    
    
    return {type:"createOrganism", payload:expr}   
}
//function addToPopulation(organism) {
//    var action = {type:'addToPopulation', payload: {organism:organism}} 
//    return action;    
//}