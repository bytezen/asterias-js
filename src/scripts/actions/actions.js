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
//function addToPopulation(organism) {
//    var action = {type:'addToPopulation', payload: {organism:organism}} 
//    return action;    
//}