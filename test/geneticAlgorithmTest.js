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

describe('genetic algorithm',function(){
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
//            matingPool = GA.population(population,{},fitness)
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


        it('can create progeny from random mix of parents', function(){
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
    
    describe('popularity fitness function', function(){
        
        var fitnessOpt = {
            minPopularity:1,
            popularityFactor:2,
            pLive: 0.5
        }
        
        var fitnessFunc = fitnessAPI.getPopularityModel(fitnessOpt);
        var GA = geneticAlgorithmAPI()        
        
        var store, getState, dispatch, action
        
        beforeEach(function(){
            store = Redux.createStore(simulation.reducer),
            getState = store.getState,
            dispatch = store.dispatch,
            action = simulation.actions
        })
        
        it('can properly set counts for organisms with votes', function(){
            //dispatch(simulation.actions.generatePopulation())
            var popularityOptions = {minPopularity:1,
                                     popularityFactor:2,
                                     pLive: 0.5}
            
            var fitnessModel = fitnessAPI
                                    .getPopularityModel(popularityOptions)

            var populationSize = 10
            var population = 
                _.map(_.range(populationSize),
                             function(i) {
                              var org = simulation.utils.randomAsterias()
                                  org.name = "a_" + i;
                              return org;
                        })
            
            dispatch(action.simulationSize(populationSize))
            dispatch(action.addMultipleOrganisms(population))
            dispatch(action.setFitnessModel(fitnessModel))
            
            // organisms with id# less than are 0 fitness
            // else
            // fitness = 2
            
            _.each(population,
                  function(v,i){
                if(i >= Math.floor(population.length * 0.5)) {
                    dispatch(action.adjustFitness({id:v.name, amt: 2}))
                }
            })
            
            expect(getState().populationSize).toBe(populationSize)
            expect(_.filter(getState().fitnessById,
                           function(v,k) {
                                return v > 0;
                    }).length)
                    .toBe(5)
            
            dispatch(action.runSimulation());

            //print out a report of child, mom name fitness, dad name fitness
            _.each(getState().parentsById,
                  function(parents,kidId) {
                     console.log('kid: ' + kidId
                                 + ' mom: ' + parents.mom.name + ' fitness: ' + parents.mom.fitness
                                + ' dad: ' + parents.dad.name + ' fitness: ' + parents.dad.fitness)
            })
            
//            // ********* Let's do another round of fitness simulation
//            _.each(getState().poolById,
//                  function(v,k) {
//                    dispatch(action.adjustFitness({id:v.name, amt:}))
//                })
            
            window._state = getState();
            
            
            
            
        })
        
        it('can have self Mating', function(){
            var popularityOptions = {minPopularity:1,
                                     popularityFactor:2,
                                     pLive: 0.0}
            
            var fitnessModel = fitnessAPI
                                    .getPopularityModel(popularityOptions)

            var populationSize = 10
            var population = 
                _.map(_.range(populationSize),
                             function(i) {
                              var org = simulation.utils.randomAsterias()
                                  org.name = "a_" + i;
                              return org;
                        })
            
            dispatch(action.simulationSize(populationSize))
            dispatch(action.addMultipleOrganisms(population))
            dispatch(action.setFitnessModel(fitnessModel))
            dispatch(action.adjustFitness({id:'a_5', amt: 2}))
            dispatch(action.setMutationRate(0.0))
            
            dispatch(action.runSimulation())
            
            //all of the children should have the same gene levels
            var nextPopulation = getState().poolById
            var levels = _.head(_.values(nextPopulation)).levels;
            
            expect(_.every(nextPopulation, 
                    function(v) { 
                        return _.isEqual(v.levels,levels)
                }))
                .toBe(true)
            
            var parents = getState().parentsById
            var mom = _.head(_.values(parents)).mom.name
            var dad = _.head(_.values(parents)).dad.name
            
            expect(_.every(parents,
                        function(v){
                            return ( v.mom.name == mom && v.dad.name == dad)
                }))
            .toBe(true)
            
            window._state = getState();            
        })
        
        it('mutate changes gene values', function(){
            var popularityOptions = {minPopularity:1,
                                     popularityFactor:2,
                                     pLive: 0.0}
            
            var fitnessModel = fitnessAPI
                                    .getPopularityModel(popularityOptions)

            var populationSize = 10
            var population = 
                _.map(_.range(populationSize),
                             function(i) {
                              var org = simulation.utils.randomAsterias()
                                  org.name = "a_" + i;
                              return org;
                        })
            
            dispatch(action.simulationSize(populationSize))
            dispatch(action.addMultipleOrganisms(population))
            dispatch(action.setFitnessModel(fitnessModel))
            dispatch(action.adjustFitness({id:'a_5', amt: 2}))
            dispatch(action.setChromosomeSplit(0.5))
            dispatch(action.setMutationRate(0.1))
            
            dispatch(action.runSimulation())
            
            var nextPopulation = getState().poolById
            var levels = _.head(_.values(nextPopulation)).levels;
            
            expect(_.every(nextPopulation, 
                    function(v) { 
                        return _.isEqual(v.levels,levels)
                }))
                .toNotBe(true,'all organisms have the same gene levels. No mutations')
            
            var parents = getState().parentsById
            var mom = _.head(_.values(parents)).mom.name
            var dad = _.head(_.values(parents)).dad.name
            
            expect(_.every(parents,
                        function(v){
                            return ( v.mom.name == mom && v.dad.name == dad)
                }))
            .toBe(true)
            
            window._state = getState();            
            
            
        })
    /*
        it('will assign minPopularity to all 0 fitness organisms', function(){ 
            dispatch(simulation.actions.generatePopulation())
            var fitnessById = _.get(getState(),'fitnessById')
            
            //ALL should live            
            fitnessOpt.pLive = 1.0
            var newFitness = fitnessFunc(fitnessById,fitnessOpt)
            
            expect(_.every(_.values(newFitness),
                          function(v){ 
                            return v == opt.minPopularity}
                          ));

        })
        
        it('will reject all 0 fitness organisms', function(){ 
            dispatch(simulation.actions.generatePopulation())
            var fitnessById = _.get(getState(),'fitnessById')
            
            //ALL should live            
            fitnessOpt.pLive = 0.0
            var newFitness = fitnessFunc(fitnessById,fitnessOpt)
        
            expect(_.every(_.values(newFitness), 
                           function(v){ 
                                return v == 0}
                            ));            
        
            fitnessOpt.pLive = 0.5
            var newFitness = fitnessFunc(fitnessById,fitnessOpt)
        
            expect(_.some(_.values(newFitness), 
                           function(v){ 
                                return v == 0}
                            ));            
        
        })        
            
        it('',function(){
            //All will die next
             pLive = 0.0; 
            newFitness = _.assign({},fitnessById)
            _.each(newFitness,
                  function(v,k,coll){
                    if( v > 0 ) {
                        coll[k] = v + popularityShift
                    } else if( Math.random() < pLive ) {
                        coll[k] = minPopularity;
                    } 
            })            



            //Some will live
            pLive = 0.2; 
            var newFitness = _.assign({},fitnessById)
            _.each(newFitness,
                  function(v,k,coll){
                    if( v > 0 ) {
                        coll[k] = v + popularityShift
                    } else if( Math.random() < pLive ) {
                        coll[k] = minPopularity;
                    } 
            })            

            expect(_.some(_.values(newFitness),
              function(v){ 
                return v == minPopularity}
              ));
            
            console.log(newFitness)
            console.log(_.values(_.filter(newFitness,function(v){ return v == minPopularity})))            
            
        })
        

        it('filter out organisms that should die off',function(){
            
        })
        
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
    */
    })


})

