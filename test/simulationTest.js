/* copied from asterias.js */

var _chromosome = asteriasAPI.chromosome,
    _defaultexpr = asteriasAPI.defaultExpression,
    _genomeConfig = asteriasAPI.genomeConfig;
    getExpressionValue = asteriasAPI.getExpressionValue;


var geneNames = function flattenListOfObj(arr){
    return _.flatten(_.map(arr,_.keys));
}



describe('simulation',function(){
//    var R = Redux.combineReducers({population: populationReducer, dna: geneticCodeReducer})
    var silent = false;
    var R = Redux,
        reducer = R.combineReducers({simulation: simulation.reducer}),
        dispatch = function(action) {
                    if(!silent) {
                        console.log("{dispatching: " + action.type  +"}  ")
                    }
                    store.dispatch(action);
                },
        store = R.createStore(reducer),
        getState = function() { return store.getState().simulation };
    
    
    if(window) {
        var obj = {reducer: reducer, getState: getState};
        window.__R = obj;        
    }
    
    var types = simulation.types,
        actions = simulation.actions;
        
    var state;
    
    describe('setup',function() {
        beforeEach(function(){
            silent = true;
            dispatch(actions.resetSim())
            state = getState()
        })

        it('defaults to proper values', function(){

            expect(state.mutationRate).toBe(0)
            expect(state.populationSize).toBe(20)
            expect(_.isNil(state.poolById)).toBe(false);
        });

        it('returns same state by default', function(){
            var pState = state;
            dispatch({type: 'NOTHING'})    
            var newState = getState();

            expect(_.isEqual(pState,newState)).toBe(true);
        })

        it('does not mutate state', function(){
            var pState = state;
            var aster = asteriasAPI.newAsterias('simTest');
            dispatch(simulation.actions.addAsterias(aster))    
            var newState = getState();

            expect(!_.isEqual(pState,newState)).toBe(true);
        })

        it('can add organisms to the population', function(){

            var aster = asteriasAPI.newAsterias('simTest'),
                aster2 = asteriasAPI.newAsterias('simTest2');

            dispatch(simulation.actions.addAsterias(aster))

            state = getState()
            expect(_.keys(state.poolById).length).toBe(1)
            expect(_.has(state.poolById,aster.name)).toBe(true);
            expect(state.allIds[0]).toBe(aster.name);
            expect(state.allIds.length).toBe(_.keys(state.poolById).length);

            dispatch(simulation.actions.addAsterias(aster2))

            state = getState()
            expect(_.keys(state.poolById).length).toBe(2)
            expect(_.has(state.poolById,aster2.name)).toBe(true);
            expect(state.allIds[1]).toBe(aster2.name);
            
            expect(state.allIds.length).toBe(_.keys(state.poolById).length);

        });

        it('can add a group of organisms to empty pool', function(){
            var population = _.map(_.range(10),
                                   function(i) {
                                     return asteriasAPI.newAsterias('a_'+i)
                                });

            dispatch(actions.addMultipleOrganisms(population));
            state = getState()
            expect(_.keys(state.poolById).length).toBe(10);
        });


        it('can add a group of organisms to non-empty pool without clobbering',
          function(){
            var aster = asteriasAPI.newAsterias('simTest'),
                aster2 = asteriasAPI.newAsterias('simTest2'),
                aster3 = asteriasAPI.newAsterias('simTest3'),
                population = _.map(_.range(18),
                                   function(i) {
                                     return asteriasAPI.newAsterias('a_'+i)
                                });

            dispatch(actions.addMultipleOrganisms([aster,aster2]))        
            expect(_.keys(getState().poolById).length).toBe(2)

            dispatch(actions.addMultipleOrganisms(population))         
            expect(_.keys(getState().poolById).length).toBe(20)        

            dispatch(actions.addAsterias(aster3))
            expect(_.keys(getState().poolById).length).toBe(21)        

        });

    })
    
    describe('running sim', function(){
        it('can reset population')
    })
})


describe('asterias',function(){
    var test;
    describe('setup', function(){
        beforeEach(function(){
                test = asteriasAPI.newAsterias('test');     
            }) 

        it('can create named organism with DNA', function() {        
            expect(test.name).toBe('test')

        });

        it('has all its genes',function(){
            var allThere = _.every(_chromosome,
                                    function(geneName){
                                        return _.has(test,geneName)
                                })
            expect(allThere).toBe(true);
        });

        it('no extra genes and in proper order', function(){
            var geneOrder = geneNames(test.chromosome);
            expect(_.isEqual(geneOrder,_chromosome)).toBe(true);        
        });

        it('sets proper default levels', function() {
            expect(_.every(_chromosome,
                          function(gene){
                            return _.isEqual(test[gene].level, _defaultexpr[gene])
            }))
            .toBe(true)
        });

        it('sets proper default values', function(){
            expect(_.every(_chromosome,
                          function(gene){
                            return _.isEqual(test[gene].value,
                                             getExpressionValue(gene,test[gene].level)
                                            );
            }))
            .toBe(true)
        });

        it('can override defaults', function(){
            var exprlevels = _.map(_.range(_chromosome.length), 
                                   function(){ return Number(Math.random().toFixed(2))})
            var overrides = _.fromPairs(_.zip(_chromosome, exprlevels))        

            test = asteriasAPI.newAsterias('testB',overrides);

            expect(
                _.every(_chromosome,
                   function(gene){
    //                console.log(gene,
    //                            test[gene].level == overrides[gene],
    //                            getExpressionValue(gene,overrides[gene]),
    //                            Math.abs(test[gene].value -
    //                                getExpressionValue(gene,overrides[gene])));

                    return test[gene].level == overrides[gene] && 
                            (Math.abs(test[gene].value -
                                    getExpressionValue(gene,overrides[gene]) <= 0.01))


            })
            ).toBe(true)

        });
        
        it('can access chromosome values',function(){
            var values = asteriasAPI.chromosomeValues(test.chromosome)
            expect(values.length).toBe(test.chromosome.length);
            
            _.each(values, 
                   function(o){
                    var gene = _.head(_.keys(o));
                    var val = o[gene];
                    expect(val).toBe(test[gene].value)
                    
            })
        });
        
        it('can access chromosome levels', function(){
            var values = asteriasAPI.chromosomeLevels(test.chromosome)
            expect(values.length).toBe(test.chromosome.length);
            
            _.each(values, 
                   function(o){
                    var gene = _.head(_.keys(o));
                    var val = o[gene];
                    expect(val).toBe(test[gene].level)
                    
            })
        });
        
    })
    
    
    describe('gene updates', function(){
        var test, randomExpression;
        
        beforeEach(function() {
            test = asteriasAPI.newAsterias('anothertest');
            randomExpression = Math.random();
            
        })
        
        it('update ring', function(){
            test.expression('ring',randomExpression);
            expect(test.ring.level).toBe(randomExpression);
            expect(test.ring.value).toBe( getExpressionValue('ring',randomExpression))
        })
        
        it('update point', function(){
            test.expression('point',randomExpression);
            expect(test.point.level).toBe(randomExpression);
            expect(test.point.value).toBe( getExpressionValue('point',randomExpression))
        })
        
        it('update size', function(){
            test.expression('size',randomExpression);
            expect(test.size.level).toBe(randomExpression);
            expect(test.size.value).toBe( getExpressionValue('size',randomExpression))
        })
        
        it('update pointiness', function(){
            test.expression('pointiness',randomExpression);
            expect(test.pointiness.level).toBe(randomExpression);
            expect(test.pointiness.value).toBe( getExpressionValue('pointiness',randomExpression))
        })
        
        it('update brightness', function(){
            test.expression('brightness',randomExpression);
            expect(test.brightness.level).toBe(randomExpression);
            expect(test.brightness.value).toBe( getExpressionValue('brightness',randomExpression))
        })
        
        it('update twisty', function(){
            test.expression('twisty',randomExpression);
            expect(test.twisty.level).toBe(randomExpression);
            expect(test.twisty.value).toBe( getExpressionValue('twisty',randomExpression))
        })
        
        it('update color', function(){
            test.expression('color',randomExpression);
            expect(test.color.level).toBe(randomExpression);
            expect(test.color.value).toBe( getExpressionValue('color',randomExpression))
        })
        
        it('update shadow', function(){
            test.expression('shadow',randomExpression);
            expect(test.shadow.level).toBe(randomExpression);
            expect(test.shadow.value).toBe( getExpressionValue('shadow',randomExpression))
        })
        
        it('update nucleus', function(){
            test.expression('nucleus',randomExpression);
            expect(test.nucleus.level).toBe(randomExpression);
            expect(test.nucleus.value).toBe( getExpressionValue('nucleus',randomExpression))
        })
        
        it('update coil', function(){
            test.expression('coil',randomExpression);
            expect(test.coil.level).toBe(randomExpression);
            expect(test.coil.value).toBe( getExpressionValue('coil',randomExpression))
        })
    })
    
})