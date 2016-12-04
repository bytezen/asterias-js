//var R = Redux.combineReducers({simulation: simulation.reducer});

/* 1. Setup Redux for the app */

var _debug = {}

var asteriasApp = function(width,height){
    
var reducer = Redux.combineReducers({simulation: simulation.reducer,
                                     ui: ui.reducer}),
//var store = Redux.createStore(simulation.reducer),
    store = Redux.createStore(reducer),
    getState = function () { 
                    return  store.getState().simulation;
                },
    dispatch = function(action) {
                    if(_watch(action)) {
                        console.log("{dispatching: " + action.type  +"}");
                    }
                    store.dispatch(action);
                },
    action = simulation.actions,
    uiaction = ui.actions,
    state = {pool: {}, ids:[], hoverId: undefined, hoverCell:undefined}
    
//    console.log(store.getState());
    unsubscribeSim = observeStore(store,storeSelect,onStoreChange),
    unsubscribeUI = observeStore(store, uiStoreSelect, onUIStoreChange)
    update = appSetup

    _debug.store = store;
    
//function _dispatchWatcher(actionsToWatch) {     
//    return function(action) {
//        return _.some(actionsToWatch,function(a) {return a == action.type})
//    }
//}    
    
var _watch = dispatchWatcher('*');

    
// >>> Store observers ----  //
        
function uiStoreSelect(nextState) {
    return nextState.ui;
}
    
function onUIStoreChange(currentState) {
//    console.log('{app} onUIStoreChange')
//    console.log(currentState)
//    state = _.assign({},state,{mousePos: mousePos})
    grid.setState({mousePos: currentState.mousePos,
                   mouseClicked: currentState.mouseClicked,
                   mouseClickedPos: currentState.mouseClickedPos,
                   mouseBtn: currentState.mouseBtn}
                 )
    render();
    
}    
    
function storeSelect(nextState) {
//    console.log('{app} storeSelect')
//    console.log('00000')
//    console.log(nextState)
//    console.log('11111')
    return nextState.simulation;
}

    
function onStoreChange(currentState) {
//    console.log('{app} onStoreChange')
//    console.log(currentState)
    state = Object.assign({},state,{pool: currentState.poolById,
                                         ids: currentState.allIds})
    _update();
    render();
}

// ---- Store observers <<<  //    
    
/* 2. Create components */
// Create a components for every member of the population

function asteriasComponentFactory(asterias){
    var compact = _.assign.apply({},asterias.values)
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

var astComponents, cells, grid, btnEvolve, hoverCell;


// --- Handler functions --- //

    
function onEvolveClick() {
    //unsubscribe the cells
    //clear everything out to make way for the new population
    _.each(cells,function(c){c.unsubscribe()})
    cells = [];
    grid.clear();
//    dispatch(action.resetSim({populationSize: 4}))
    dispatch(action.runSimulation());
}


function onMouseMove(x,y) {
    //dispatch mouse position?? NO!   
//    dispatch(uiaction.mouseMoved(x,y))
    
    //try to have the gridCells respond directly
    var prev = state.hoverCell
    state.hoverCell = grid.hoverCell(x,y);
    
    if(state.hoverCell != prev) {
        console.log(state.hoverCell)
    }
    
}    
    
function onMouseClick(event) {
//    dispatch(uiaction.mouseClicked(e))
    if(!_.isNil(state.hoverCell)){
        var amt = (event.button == 0) ? 1 : -1
        dispatch(action.adjustFitness({id:state.hoverCell.id, amt:amt}))
    }
}    

function mouseReleasedHandler(e) {
//    dispatch(uiaction.mouseReleased())
}
    
function keyPressedHandler(event) {    
    console.log('show the parent window')
    
    // if there is a hoverchild grab its details
    // and display it in the parent overlay component.
}
    
function onGridCellClick(id,btn) {
//    console.log("gridCell clicked " + id + " " + btn
    var amt = (btn == ui.constants.LEFT_MOUSE) ? 1 : -1
    
    dispatch(action.adjustFitness({id:id, amt:amt}))
}    
    
// --- Handler functions --- //    
    
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
                    return asteriasGridCell({children: [c], onClickHandler: onGridCellClick },store)
            });
}

function _updateGrid() {
    grid = asteriasGrid({children: cells,
                             rows: 4,
                             cols: 4,
                             width: 1000,
                             height: 1000,
                             center: true
                            })
//    state.gridOrigins = grid.origins();
//    console.log(state,grid.props)
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
    
//    _updateAsteriasComponent();
//    _updateCells();
//    _updateGrid();
    btnEvolve = createButton("Evolve It")
    btnEvolve.parent("ui");
//    btnEvolve.mouseReleased(onEvolveClick);    
    btnEvolve.mouseReleased(handler);    
    
    
    _update();    
}


//-----
    function start(astCount) {
        astCount = astCount || 16;
        
        dispatch(action.simulationSize(16))
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
        mouseMovedHandler: onMouseMove,
        mouseClickHandler: onMouseClick,
        mouseReleasedHandler: mouseReleasedHandler,
        state: _state
    }
    
}