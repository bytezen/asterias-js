var asteriasAPI = (function(){
    
function lerp(a,b,t) {
    return (1-t)*a + b*t;
}
    
    
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
    
    var genomeConfig = { "ring" :[3,21],
            "point": [3,20],
            "size": [50,200],
            "pointiness": [0.01,1.0],
            "brightness": [100,250],
            "twisty": [0,100],
            "color": [0,360],
            "shadow": [30,80],
            "nucleus": [.10,.50],
            "coil": [-1.0,1.0],
        }    
    
    //define the gene order
    var _chromosome = [
        'ring',
        'point',
        'size',
        'pointiness',
        'brightness',
        'twisty',
        'color',
        'shadow',
        'nucleus',
        'coil'
    ]
    
    function getExpressionValue(gene,level) {
        var expression = _.get(genomeConfig,gene,[0,0])
        return lerp( expression[0], expression[1], level);
    }    
     
    
    function chromosomeValues(arr) {
        return _.map(arr,
                     function(o) {
                       return _.mapValues(o,'value')
                    });
    }

    function chromosomeLevels(arr) {
        return _.map(arr,
                     function(o) {
                       return _.mapValues(o,'level')
                    });

    }    
    
    function _create(name,opt){
        var geneLevels = Object.assign(defaultexpr,opt);

        function dna() {
            return _.map(_chromosome,
                         function(geneName){
                            var obj = {};
                            obj[geneName] = getExpressionValue(geneName,geneLevels[geneName]);
                            return obj;
            })
        }
        
        function expressionLevel(name,level) {
            if(!_.has(geneLevels,name))
                throw new Error("no gene by that name: " + name)
                
            if(!_.isNil(level)) {
                geneLevels[name] = level;  
                console.log('expression level vvvv')
                _updateGeneProperties();
            } 
            console.log('expression level ^^^^')
        }
        

        function chromosome() {
            return _.map(_chromosome,
                        function(geneName){
                            var obj = {}
                            obj[geneName] = Object.assign({},ret[geneName])
                            return obj;
            })
        }
        
//        function _getMyValues(){
//            var values = chromosomeValues(this.chromosome)
//            return _.assign.apply({},values)
//        }
//        
//        function _getMyLevels(){
//            var levels = chromosomeLevels(this.chromosome)
//            return _.assign.apply({},levels)            
//        }
        
        function _updateGeneProperties() {
            
            _.each(_chromosome,
                  function(geneName){
                    ret[geneName].level = geneLevels[geneName];
                    ret[geneName].value = getExpressionValue(geneName, geneLevels[geneName])
            })
            
            ret.chromosome = chromosome();
//            ret.values =  chromosomeValues(ret.chromosome)
//            ret.levels =  chromosomeLevels(ret.chromosome)
            ret.genes = _.flatten(_.map(ret.chromosome,_.keys))
            
//            if(!_.isEqual(['ring'],_.keys(_.head(ret.levels))) || 
//               !_.isEqual(['ring'],_.keys(_.head(ret.values)))) {
//                
//                console.log(ret.name + '{asterias.updateGeneProperties:levels(head), values(head) } vvvv' )
//                console.log(_.head(ret.levels))
//                console.log(_.head(ret.values))
//                console.log('^^^^\n')
//            } 
        }
                
        function dataFromChromosome(property) {
            return _.map(this.chromosome, 
                  function(o) { 
                    var obj = {}; 
                    var gene = _.head(_.keys(o)); 
                    obj[gene] = o[gene][property]; 
                    return obj; 
            })             
        }

        var ret = {
                name: name || "_asterias",
                expression: expressionLevel,
                chromosome: [],
//                values: [],
//                levels: [],
                genes: []
               };
        
        //initialize gene properties
        _.each(_chromosome,
              function(geneName){
                ret[geneName] = {};
        })
        
        ret.dataFromChromosome = dataFromChromosome.bind(ret);
        ret.getLevels = function() { return this.dataFromChromosome('level'); }
        ret.getValues = function() { return this.dataFromChromosome('value'); }
        
        _updateGeneProperties()
        
//        var _shadowDebug = _.assign({},ret)
//        console.log('_create asterias vvvv')
//        console.log(_shadowDebug)
//        console.log('_create asterias ^^^^')
        
        
        //create a property for each gene as a shortcut to access the 
        // value and level
        
        return ret;
    }
    
    return {
        newAsterias: _create,
        getExpressionValue: getExpressionValue,
        defaultExpression: defaultexpr,
        genomeConfig: genomeConfig,
        chromosome: _chromosome,
        chromosomeValues: chromosomeValues,
        chromosomeLevels: chromosomeLevels        
        }
    }());

//OLD DEPRECATED CODE
/*
var DNAdefault = {};

var genome = {ring:'ring', point:'point', size:'size', pointiness:'pointiness', brightness:'brightness', twisty:'twisty', color:'color', shadow:'shadow', nucleus: 'nucleus', coil:'coil'}

var initState = { "ring" :[3,21],
            "point": [3,20],
            "size": [50,200],
            "pointiness": [0.01,1.0],
            "brightness": [100,250],
            "twisty": [0,100],
            "color": [0,360],
            "shadow": [30,80],
            "nucleus": [.10,.50],
            "coil": [-1.0,1.0],
        }

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

//define the gene order
var chromosome = [
    'ring',
    'point',
    'size',
    'pointiness',
    'brightness',
    'twisty',
    'color',
    'shadow',
    'nucleus',
    'coil'
]


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
*/
/*
an array of objects --> gene names and level
*/

/*
function createAsterias(geneticCode) {
    geneticCode = _initializeGenome(geneticCode)    
    var asterias = createLife(_.values(geneticCode));
 
    //given a name return a configured gene based on the 
    //organisms current expression level for that gene
    asterias.getGene = function getGene(name) {
        if(_.has(asterias, name)) {
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
*/    
    

