//var _chromosome = asteriasAPI.chromosome,
//    _defaultexpr = asteriasAPI.defaultExpression,
//    _genomeConfig = asteriasAPI.genomeConfig;
//    getExpressionValue = asteriasAPI.getExpressionValue;


//var geneNames = function flattenListOfObj(arr){
//    return _.flatten(_.map(arr,_.keys));
//}

var fitness = fitnessAPI.ordinalModel,
    expectedCounts = fitnessAPI.ordinal16,
    genes = _.map(_.keys(asteriasAPI.genomeConfig))
    

var debug;

describe('simulation',function(){
    var GA, population, matingPool;

    describe('general', function(){
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
//        /*
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

//        */
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
//                momChromosome = asteriasAPI.chromosomeValues(mom.chromosome),
//                dadChromosome = asteriasAPI.chromosomeValues(dad.chromosome)
                momLevels = mom.levels,
                dadLevels = dad.levels
            
            // SPLIT POINT = 1.0 -- all mom
            var splitpoint = 1.0;
            debug  = [mom,dad,kid]

//            console.log(momLevels)
            var kidgenes = GA.progeny(momLevels, dadLevels, splitpoint)
//            console.log(momLevels)
            var kid = asteriasAPI.newAsterias(mom.name+'_'+dad.name,kidgenes);

            expect(kid.chromosome.length).toBe(mom.chromosome.length)
            expect(_.isEqual(kid.chromosome, mom.chromosome)).toBe(true);
            expect(_.isEqual(kid.levels, mom.levels)).toBe(true)
        })
///*
        
        it('can correctly create progeny from father', function(){
            var mom = asteriasAPI.newAsterias('mom',randomGenes()),
                dad = asteriasAPI.newAsterias('dad',randomGenes()),
                momLevels = mom.levels,
                dadLevels = dad.levels,
                splitpoint = 0.0;

            // SPLIT POINT = 0.0 -- all dad
            debug  = [mom,dad,kid]

            var kidgenes = GA.progeny(momLevels, dadLevels, splitpoint)
            var kid = asteriasAPI.newAsterias(mom.name+'_'+dad.name,kidgenes);

            expect(kid.chromosome.length).toBe(dad.chromosome.length)
            expect(_.isEqual(kid.chromosome, dad.chromosome)).toBe(true);
            expect(_.isEqual(kid.levels, dad.levels)).toBe(true)            
        })

        
        it('can correctly create progeny from 0.5 mix of parents', function(){
            var mom = asteriasAPI.newAsterias('mom',randomGenes()),
                dad = asteriasAPI.newAsterias('dad',randomGenes()),
                momLevels = mom.levels,
                dadLevels = dad.levels,
                splitpoint = 0.5;
                

            // SPLIT POINT = 0.0 -- all dad
            debug  = [mom,dad,kid]

            var kidgenes = GA.progeny(momLevels, dadLevels, splitpoint)
            var kid = asteriasAPI.newAsterias(mom.name+'_'+dad.name,kidgenes);
            var takeNumber = Math.floor(splitpoint * kid.genes.length)
            
            expect(kid.chromosome.length).toBe(dad.chromosome.length)
            
            expect(_.isEqual(_.take(kid.levels,takeNumber), 
                             _.take(mom.levels, takeNumber)))
                   .toBe(true,'kid dont have momma genes')
                   
            expect(_.isEqual(_.drop(kid.levels,takeNumber), 
                             _.drop(dad.levels, takeNumber)))
                   .toBe(true,'kid dont have daddy genes')      

        });


        it('can create progeny from mix of parents', function(){
            var mom = asteriasAPI.newAsterias('mom',randomGenes()),
                dad = asteriasAPI.newAsterias('dad',randomGenes()),
                momLevels = mom.levels,
                dadLevels = dad.levels
                
            _.times(50,
                   function(){
                        splitpoint = Number(Math.random().toFixed(2));
                        var kidgenes = GA.progeny(momLevels, 
                                                  dadLevels, 
                                                  splitpoint)
                        var kid = asteriasAPI
                                    .newAsterias(mom.name+'_'+dad.name,
                                                 kidgenes);
                        var takeNumber = Math.floor(splitpoint * kid.genes.length)
                        
                        expect(kid.chromosome.length)
                            .toBe(dad.chromosome.length)

                        expect(_.isEqual(_.take(kid.levels,takeNumber), 
                                         _.take(mom.levels, takeNumber)))
                               .toBe(true,'kid dont have momma genes. split = ' + splitpoint)

                        expect(_.isEqual(_.drop(kid.levels,takeNumber), 
                                         _.drop(dad.levels, takeNumber)))
                               .toBe(true,'kid dont have daddy genes split = ' + splitpoint);      
                        
                                 
                   }
                );
            
//            var kidgenes = GA.progeny(momLevels, dadLevels, splitpoint)
//            var kid = asteriasAPI.newAsterias(mom.name+'_'+dad.name,kidgenes);
//            var takeNumber = Math.floor(splitpoint * kid.genes.length)
            
            
        })        

//*/        
    })
    

    describe('running simulation - custom fitness function', function(){
        var population = _.map(_.range(4),
                               function() {
                                    return simulation.utils.randomAsterias()
                            })
        var GA = geneticAlgorithmAPI()
        
        //
        // Fitness function will be based an object, index and array
        // containing the object
        //
        var fitnessModel = function(o,i,arr) {
            return 4 * i + 1;
        }
        
        it('can return nextPool and parentPool', function(){
//            console.log(_.map(population,function(o){
//                return _.pick(o,['name','values'])
//            }))
            var popsize = 4
            var results = GA.runSimulation(population,popsize,fitnessModel)
            
            window._simres = results
            expect(results.nextPool).toExist()
            expect(results.nextParentPool).toExist()
            
            expect(_.keys(results.nextPool).length).toBe(popsize)
            expect(_.keys(results.nextParentPool).length).toBe(popsize)
        })
        
        it('can return progeny with correct gene mix', function() {
            var popsize = 4,
                split = 0.5
            
            _.times(50, function(){
                split = Number(Math.random().toFixed(2))
                
                var results = GA.runSimulation(
                                        population,
                                        popsize,
                                        fitnessModel, split)
                window._simres = results

//                console.log(population)

                var nextPool = results.nextPool,
                    parentPool = results.nextParentPool;

                var splitIndex = Math.floor(split * genes.length)
    //            var chromosomeSplitGene = genes[splitIndex]

    //            console.log(splitIndex,chromosomeSplitGene)

                function genePredicate(v,o) { return _.head(_.keys(o)) == v}

                _.each(parentPool, 
                       function(parents,childId){
                            var child = nextPool[childId]
                            var fromMom = _.take(child.levels,splitIndex)
                            var fromDad = _.drop(child.levels,splitIndex)

//                            console.log(childId,
//                                        fromMom, _.take(parents.mom.levels,splitIndex))

                            expect(_.isEqual(fromMom,
                                             _.take(parents.mom.levels, splitIndex)))
                                   .toBe(true, ' momma genes wrong')

                            expect(_.isEqual(fromMom,
                                             _.take(parents.mom.levels, splitIndex)))
                                   .toBe(true, ' poppa genes wrong')

    //                        console.log(fromMom,fromDad)
                })
            }) //end _.times            
        })
    })


})

