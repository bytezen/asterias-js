var DNAdefault = {};

var genome = {ring:'ring', point:'point', size:'size', pointiness:'pointiness', brightness:'brightness', twisty:'twisty', color:'color', shadow:'shadow', nucleus: 'nucleus', coil:'coil'}

//var genomeConfig = {minring: 3, maxring: 21,
//                    minpoint: 5, maxpoint: 15,
//                    minsize:100, maxsize: 250,
//                    minpointiness: 0.3, maxpointiness: 0.95,
//                    minbrightness: 20, maxbrightness: 200,
//                    mintwisty: 45, maxtwisty: 100,
//                    mincolor: 120, maxcolor: 120,
//                    minshadow: 50 , maxshadow: 50,
//                    minnucleus: .10, maxnucleus: .40,
//                    mincoil: -1.0, maxcoil: 1.0                    
//                   }

var defaultexpr = {
    ring: 0.0,
    point: 0.0,
    size: 0.4,
    pointiness: 0.5,
    brightness: 0.0,
    twisty: 0.0,
    color: 0.0,
    shadow: 0.0,
    nucleus: 1.0,
    coil: 0.5
}




function getExpressionValue(gene,level) {
    var geneRange = getState().dna;
    return lerp( geneRange[gene][0], geneRange[gene][1], level);
}

function _initializeGenome(geneticCode) {    
    var res = {};
    geneticCode = _.isArray(geneticCode) ? geneticCode : [geneticCode];
    _.each(genome, function(name){
        var gene = _.find(geneticCode, ['name',name]) || {};        
        
        var opt = { name: name, level: 0}        
        opt.min = genomeConfig['min'+name];
        opt.max = genomeConfig['max'+name];
                
        res[name] = _.defaults(gene,opt); 
    })    
    
    return res;
}

/*
an array of objects --> gene names and level
*/

function createAsterias(geneticCode) {
    geneticCode = _initializeGenome(geneticCode)    
//    console.log(_.values(geneticCode))
    var asterias = createLife(_.values(geneticCode));
 
    //given a name return a configured gene based on the 
    //organisms current expression level for that gene
    asterias.getGene = function getGene(name) {
        if(_.has(asterias, name)) {
//            var value = asterias[name];
            var level = asterias[name+'Level'];
            //get the min and max from the genetic Config based on the name
            var min = genomeConfig['min'+name]
            var max = genomeConfig['max'+name]
            
            return createGene({name:name, min: min, max: max, level: level()});
        }
        
        return undefined;
    }
    
    return asterias;
}