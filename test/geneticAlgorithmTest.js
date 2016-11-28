//var _chromosome = asteriasAPI.chromosome,
//    _defaultexpr = asteriasAPI.defaultExpression,
//    _genomeConfig = asteriasAPI.genomeConfig;
//    getExpressionValue = asteriasAPI.getExpressionValue;


//var geneNames = function flattenListOfObj(arr){
//    return _.flatten(_.map(arr,_.keys));
//}

var fitness = fitnessAPI.ordinalModel,
    expectedCounts = fitnessAPI.ordinal16
    

var debug;

describe('simulation',function(){
    var GA, population, matingPool;

    before(function(){
        population = _.map(_.range(16),
                          function(i) {
                            return asteriasAPI.newAsterias('a_'+i);
                        })        
    })
    
    beforeEach(function(){
        GA = geneticAlgorithmAPI(fitness,0,true)
        matingPool = GA.population(population,fitness)
    })
    
    it('can generate a population', function() {        
        matingPool = GA.population(population,fitness)
        var matingPoolGroupedById = _.mapValues(_.groupBy(matingPool,'name'), 'length')

        
        expect(_.keys(matingPoolGroupedById).length).toBe(population.length)
        
        _.each(matingPoolGroupedById,
              function(count,name){
                var ind = _.indexOf(population,_.first(
                                                    _.filter(
                                                        population,
                                                        {name:name})
                                                )
                                   );
                expect(count).toBe(expectedCounts[ind]);
        })
    })
    
    it('can select two unique parents', function(){
        debug = population
        matingPool = GA.population(population,fitness)
        var parents;

        _.each(_.range(100), 
              function(){
                parents = GA.parents(matingPool)
                expect(parents[0].name).toNotBe(parents[1].name)
        })        
        
    })
    
    function randomGenes() {
        var res = _.mapValues(asteriasAPI.defaultExpression,
                           function(gene) {
                                return Math.random()
                    })
        
        return res
    }
    
    it('can correctly create progeny from mother', function(){
        var mom = asteriasAPI.newAsterias('mom',randomGenes()),
            dad = asteriasAPI.newAsterias('dad',randomGenes()),
            momChromosome = asteriasAPI.chromosomeValues(mom.chromosome),
            dadChromosome = asteriasAPI.chromosomeValues(dad.chromosome)
        
        
        // SPLIT POINT = 1.0 -- all mom
        var splitpoint = 1.0;
        debug  = [mom,dad,kid]
        
        var kidgenes = GA.progeny(mom.chromosome, dad.chromosome, splitpoint),
            kid = asteriasAPI.newAsterias(mom.name+'_'+dad.name,kidgenes);
        
        expect(kid.chromosome.length).toBe(mom.chromosome.length)
        expect(_.isEqual(kid.chromosome, mom.chromosome)).toBe(true);
        
        _.each(asteriasAPI.chromosomeValues(kid.chromosome),
               function(gene,i){
                expect(_.head(_.values(gene)))
                    .toBe(_.head(_.values(momChromosome[i])));    
               }
        );
        
    })
    
    it('can correctly create progeny from father', function(){
        var mom = asteriasAPI.newAsterias('mom',randomGenes()),
            dad = asteriasAPI.newAsterias('dad',randomGenes()),
            momChromosome = asteriasAPI.chromosomeValues(mom.chromosome),
            dadChromosome = asteriasAPI.chromosomeValues(dad.chromosome)
        
        
        // SPLIT POINT = 0.0 -- all dad
        var splitpoint = 0.0;
        debug  = [mom,dad,kid]
        
        var kidgenes = GA.progeny(mom.chromosome, dad.chromosome, splitpoint),
            kid = asteriasAPI.newAsterias(mom.name+'_'+dad.name,kidgenes);
        
        expect(kid.chromosome.length).toBe(dad.chromosome.length)
        expect(_.isEqual(kid.chromosome, dad.chromosome)).toBe(true);
        
        _.each(asteriasAPI.chromosomeValues(kid.chromosome),
               function(gene,i){
                expect(_.head(_.values(gene)))
                    .toBe(_.head(_.values(dadChromosome[i])));    
               }
        );
    })
      
    it('can correctly create progeny from 0.5 mix of parents', function(){
        var mom = asteriasAPI.newAsterias('mom',randomGenes()),
            dad = asteriasAPI.newAsterias('dad',randomGenes()),
            momChromosome = asteriasAPI.chromosomeValues(mom.chromosome),
            dadChromosome = asteriasAPI.chromosomeValues(dad.chromosome)
        
        
        // SPLIT POINT = 0.5 -- half mom and half dad
        var splitpoint = 0.5;
        debug  = [mom,dad,kid]
        
        var kidgenes = GA.progeny(mom.chromosome, dad.chromosome, splitpoint),
            kid = asteriasAPI.newAsterias(mom.name+'_'+dad.name,kidgenes);
        
        expect(kid.chromosome.length)
            .toBe(0.5*(dad.chromosome.length + mom.chromosome.length));
        
        var testTake = Math.floor(mom.chromosome.length * splitpoint)
        var testChromosome = asteriasAPI.chromosomeValues(
                                    _.concat(_.take(mom.chromosome, testTake),
                                    _.drop(dad.chromosome, testTake)));
        
//        console.log(asteriasAPI.chromosomeValues(kid.chromosome))
//        console.log(momChromosome)
//        console.log(dadChromosome)
//        console.log(testChromosome)
        
        expect(_.isEqual(
                    asteriasAPI.chromosomeValues(kid.chromosome),
                    testChromosome)
              ).toBe(true);
        
        _.each(asteriasAPI.chromosomeValues(kid.chromosome),
               function(gene,i){
                expect(_.head(_.values(gene)))
                    .toBe(_.head(_.values(testChromosome[i])));    
               }
        );
    });
    
    it('can correctly create progeny from 0.25 mix of parents', function(){
        var mom = asteriasAPI.newAsterias('mom',randomGenes()),
            dad = asteriasAPI.newAsterias('dad',randomGenes()),
            momChromosome = asteriasAPI.chromosomeValues(mom.chromosome),
            dadChromosome = asteriasAPI.chromosomeValues(dad.chromosome)
        
        
        // SPLIT POINT = 0.5 -- half mom and half dad
        var splitpoint = 0.25;
        debug  = [mom,dad,kid]
        
        var kidgenes = GA.progeny(mom.chromosome, dad.chromosome, splitpoint),
            kid = asteriasAPI.newAsterias(mom.name+'_'+dad.name,kidgenes);
        
        expect(kid.chromosome.length)
            .toBe(0.75*dad.chromosome.length + 0.25*mom.chromosome.length);
        
        var testTake = Math.floor(mom.chromosome.length * splitpoint)
        var testChromosome = asteriasAPI.chromosomeValues(
                                    _.concat(_.take(mom.chromosome, testTake),
                                    _.drop(dad.chromosome, testTake)));
        
//        console.log(asteriasAPI.chromosomeValues(kid.chromosome))
//        console.log(momChromosome)
//        console.log(dadChromosome)
//        console.log(testChromosome)
        
        expect(_.isEqual(
                    asteriasAPI.chromosomeValues(kid.chromosome),
                    testChromosome)
              ).toBe(true);
        
        _.each(asteriasAPI.chromosomeValues(kid.chromosome),
               function(gene,i){
                expect(_.head(_.values(gene)))
                    .toBe(_.head(_.values(testChromosome[i])));    
               }
        );
    });
    

    it('can correctly create progeny from 0.75 mix of parents', function(){
        var mom = asteriasAPI.newAsterias('mom',randomGenes()),
            dad = asteriasAPI.newAsterias('dad',randomGenes()),
            momChromosome = asteriasAPI.chromosomeValues(mom.chromosome),
            dadChromosome = asteriasAPI.chromosomeValues(dad.chromosome)
        
        
        // SPLIT POINT = 0.5 -- half mom and half dad
        var splitpoint = 0.75;
        debug  = [mom,dad,kid]
        
        var kidgenes = GA.progeny(mom.chromosome, dad.chromosome, splitpoint),
            kid = asteriasAPI.newAsterias(mom.name+'_'+dad.name,kidgenes);
        
        expect(kid.chromosome.length)
            .toBe(0.25*dad.chromosome.length + 0.75*mom.chromosome.length);
        
        var testTake = Math.floor(mom.chromosome.length * splitpoint)
        var testChromosome = asteriasAPI.chromosomeValues(
                                    _.concat(_.take(mom.chromosome, testTake),
                                    _.drop(dad.chromosome, testTake)));
        
//        console.log(asteriasAPI.chromosomeValues(kid.chromosome))
//        console.log(momChromosome)
//        console.log(dadChromosome)
//        console.log(testChromosome)
        
        expect(_.isEqual(
                    asteriasAPI.chromosomeValues(kid.chromosome),
                    testChromosome)
              ).toBe(true);
        
        _.each(asteriasAPI.chromosomeValues(kid.chromosome),
               function(gene,i){
                expect(_.head(_.values(gene)))
                    .toBe(_.head(_.values(testChromosome[i])));    
               }
        );
    });
    
    
    it('can mate ')
})

