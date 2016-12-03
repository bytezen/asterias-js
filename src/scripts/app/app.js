//var R = Redux.combineReducers({simulation: simulation.reducer});

/* 1. Setup Redux for the app */

var _debug = {}

var asteriasApp = (function(){
    
var reducer = Redux.combineReducers({simulation: simulation.reducer}),
//var store = Redux.createStore(simulation.reducer),
    store = Redux.createStore(reducer),
    getState = function () { 
                    return  store.getState().simulation;
                },
    dispatch = function(action) {
                    console.log("{dispatching: " + action.type  +"}");
                    store.dispatch(action);
                },
    action = simulation.actions,
    state = {pool: {}, ids:[]}
    
    console.log(store.getState());
    unsubscribeSim = observeStore(store,storeSelect,onStoreChange),
    update = appSetup

//FOR DEBUG

function storeSelect(nextState) {
    console.log('{app} storeSelect')
//    console.log('00000')
//    console.log(nextState)
//    console.log('11111')
    return nextState.simulation;
}
    
function onStoreChange(currentState) {
    console.log('{app} onStoreChange')
    console.log(currentState)
    state = Object.assign({},state,{pool: currentState.poolById,
                                         ids: currentState.allIds})
    _update();
    render();
}

/* 2. Create components */
// Create a components for every member of the population

function asteriasComponentFactory(asterias){
    console.log('asterias factory....')
    console.log(asterias)
    var compact = _.assign.apply({},asterias.values)
    console.log(compact)
    console.log('....asterias factory')
    return asteriasComponent({id:asterias.name},compact);//asterias.values)
}

/* OLD MANUAL WAY
var astComponents = _.map(getState().allIds,
                         function(id,i){
                            var org = getState().poolById[id]
//                            return asteriasComponent({id:'test_'+i},
//                                          {size: 200,
//                                          point: 15,
//                                          pointiness: .5,
//                                          ring: 9,
//                                          shadow: 50,
//                                          brightness: 100,
//                                          nucleus: .25,
//                                          twisty: 15,
//                                          coil: .8,
//                                          color: 0})                            
//                            return asteriasComponent(
//                              {id:id},
//                               _.assign.apply(_,asteriasAPI.chromosomeValues(org.chromosome)));
                            return asteriasComponentFactory(org);
//                            return asteriasComponent({id:id},org.values)
//                            console.log(astComponents) 
                        });


// set the id to the container to be the name of the organism

var cells = _.map(astComponents,
                  function(c) {
                    return asteriasGridCell({children: [c]},store)
            });
*/

var astComponents, cells, grid, btnEvolve;

function onEvolveClick() {
    //unsubscribe the cells
    //clear everything out to make way for the new population
    _.each(cells,function(c){c.unsubscribe()})
    cells = [];
    grid.clear();
//    dispatch(action.resetSim({populationSize: 4}))
    dispatch(action.runSimulation());
}


function _updateAsteriasComponent() {
    astComponents = _.map(state.ids,
                         function(id,i){
//                            var org = getState().poolById[id]
                            var org = state.pool[id]
                            return asteriasComponentFactory(org);
                        });
}

function _updateCells() {
    cells = _.map(astComponents,
                  function(c) {
                    return asteriasGridCell({children: [c]},store)
            });
}

function _updateGrid() {
    grid = asteriasGrid({children: cells,
                             rows: 2,
                             cols: 3,
                             width: 600,
                             height: 500,
                             center: true
                            })         
}
    
function _update() {
    _updateAsteriasComponent();
    _updateCells();
    _updateGrid();    
}
    
    
function appSetup() {

/*    
//    astComponents = _.map(getState().allIds,
    astComponents = _.map(state.ids,
                         function(id,i){
//                            var org = getState().poolById[id]
                            var org = state.pool[id]
                            return asteriasComponentFactory(org);
                        });
    
    cells = _.map(astComponents,
                  function(c) {
                    return asteriasGridCell({children: [c]},store)
            });
    
    grid = asteriasGrid({children: cells,
                             rows: 2,
                             cols: 3,
                             width: 600,
                             height: 500,
                             center: true
                            })  
*/
    _update();
//    _updateAsteriasComponent();
//    _updateCells();
//    _updateGrid();
    btnEvolve = createButton("Evolve It")
    btnEvolve.parent("ui");
//    btnEvolve.mouseReleased(onEvolveClick);    
    btnEvolve.mouseReleased(handler);    
}


//-----
    function start() {
        dispatch(action.simulationSize(4))
        dispatch(action.generatePopulation())    
        
        appSetup();
    }
    
    function render() {
        grid.render()
    }
//var grid = asteriasGrid();
    
    function _state(){ return state}
    
    return {
        start: start,
        render: render,
        evolveHandler: onEvolveClick,
        state: _state
    }
    
})