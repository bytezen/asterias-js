
function norm(c,a,b) {
    if( a==b ) return 0;
    return (c-a)/(b-a);
}

function lerp(a,b,t) {
    return (1-t)*a + b*t;
}


var createGene = function(opt) {
    opt = opt || {};
    _.defaults(opt ,{min:0 ,max:0, level: 0, name: "geneX"})
    
    var minValue = opt.min,
        maxValue = opt.max,
        level =  Math.min(1.0,Math.max(0.0,opt.level)),
        genename = opt.name;    
    
    var gene = {
        
        min: function geneMin() {
            if(arguments.length == 1) { 
                minValue = Number(Array.from(arguments)[0]);         
            }
            return minValue;
        },
        
        max: function geneMax() {
            if(arguments.length == 1) { 
                maxValue = Number(Array.from(arguments)[0]);
            }
            return maxValue;            
        },
        
        level: function setLevel(v) {
            if(arguments.length == 1) {
                level = Math.min(1.0,Math.max(0.0,Number(v)));
            }
            return level;
        },
        
        /* should be normalized */
        val: function val() {     
            return lerp(minValue,maxValue,level);            
        },
        
        name: function name(aStr) {
            if(aStr != undefined) {
                genename = aStr;
            } 
            return genename;
        },
        
        toString: function() {
            return "{" + this.name() + ","
                       + this.min() + ","
                       + this.max() + ","
                       + this.level() + ","
                       + this.val() + "}"
                        
        }
    }
    
//    gene.min(opt.minVal);
//    gene.max(opt.maxVal);
//    gene.level(opt.level);
//    gene.name(opt.name);
    
    return gene;
}