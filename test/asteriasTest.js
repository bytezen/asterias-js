
describe('Asterias', function() {
    var gene;
    
    var genomeConfig = asteriasAPI.genomeConfig,
        defaultLevel = asteriasAPI.defaultExpression,
        lerp = bytezenAPI.lerp;
         
    function defaultValue(gene,level) { 
        return lerp(genomeConfig[gene][0],
                    genomeConfig[gene][1],
                    level);
    }
    
    beforeEach(function(){
        
    });
    
    describe('defaults', function(){
        it('returns genes in chromosome order ', function(){
            var asterias = asteriasAPI.newAsterias();
            var chromosomeGeneOrder = _.flatten(_.map(asterias.chromosome,_.keys)),
                
            valuesGeneOrder = _.flatten(_.map(asterias.values,_.keys)),
                
            levelsGeneOrder = _.flatten(_.map(asterias.levels,_.keys))
            
            
            expect(asterias.genes).toEqual(chromosomeGeneOrder)
            expect(chromosomeGeneOrder).toEqual(valuesGeneOrder)
            expect(chromosomeGeneOrder).toEqual(levelsGeneOrder)
        })
        
        it('correct gene default expression & values', function(){
            var asterias = asteriasAPI.newAsterias();
            
            _.each(asterias.genes,
                function(name){
                    min = genomeConfig[name][0],
                    max = genomeConfig[name][1],
                    gene = asterias[name],
                    expLevel = defaultLevel[name],
                    expValue = defaultValue(name,expLevel);
                        
                    expect(gene).toExist(name + ' does not exist');
                    expect(gene.level)
                        .toBe(expLevel, name+ ' level incorrect'+ gene.level + ' vs. ' + expLevel);
                    expect(gene.value)
                        .toBe(expValue, name+ ' value incorrect'+ gene.value + ' vs. ' + expValue);
                  }
            );
                
        })        
        
        it('can override gene expression levels when creating', function(){
            var initLevels = _.mapValues(defaultLevel,Math.random)
            
            var asterias = asteriasAPI.newAsterias('ast_random',initLevels);
            
            _.each(asterias.genes,
                function(name){
                    min = genomeConfig[name][0],
                    max = genomeConfig[name][1],
                    gene = asterias[name],
                    expLevel = initLevels[name],
                    expValue = defaultValue(name,expLevel);
                        
                    expect(gene).toExist(name + ' does not exist');
                    expect(gene.level)
                        .toBe(expLevel, name+ ' level incorrect: ' + gene.level + ' vs. ' + expLevel);
                    expect(gene.value)
                        .toBe(expValue, name+ ' value incorrect' + gene.value + ' vs. ' + expValue);
                  }
            );
                
        })

        it('can override gene expression levels after creating', function(){
            var randomLevels = _.mapValues(defaultLevel,Math.random)
            
            var asterias = asteriasAPI.newAsterias('ast_random');
            
            _.each(asterias.genes,
                function(name){
                  var gene = asterias[name],
                    expLevel = randomLevels[name],
                    expValue = defaultValue(name,expLevel);
                        
                    asterias.expression(name,randomLevels[name])
                    expect(gene).toExist(name + ' does not exist');
                    expect(gene.level)
                        .toBe(expLevel, name+ ' level incorrect: ' + gene.level + ' vs. ' + expLevel);
                    expect(gene.value)
                        .toBe(expValue, name+ ' value incorrect' + gene.value + ' vs. ' + expValue);
                  }
            );
                
        })
        
    })
    
    
    describe('overrides', function(){
        
    })    
    
    
    describe('custom organism', function(){
        it('can change expression ranges for a single organism')
    })
})