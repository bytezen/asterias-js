var asteriasView = (function(){
    var defaultProps = {store:undefined, name:'asterias'},
        state = {size: 20,
                position: [0,0],
                ring: 0.2};
    
    function createComponent(props){
        if(_.isNil(this.createSlider)) {
            throw 'looks like you are trying to create a slider outside of the p5 setup() function. This ain\'t gonna work. Try moving this component to the setup function';
        }        
        
        props = _.defaults(props,defaultProps);
        
        var component = {
            props: props,
            setState: setState,
            render: render,
            position: function(x,y) {
                dispatch(move(this.props.name,[10,10]));
            }
        }
        
        //observer the store
        if(!_.isNil(props.store)) {
            observeStore(props.store,        
                         expressionChangedFilter.bind(component),
                         setState.bind(component))
            //store.subscribe(setState.bind(component));
        }
        
        return component;
    }
    
    function update() {
        
    }
    
    function render() {
        push();
        //fill(state.color);zvczx
        translate(state.position[0],state.position[1])
        ellipse(0,0,state.size, state.size);
        pop();
    }
    
    function expressionChangedFilter(nextState) {
//        var changedGenes = _.filter(_.toPairs(currState), 
//                                    function(item) {
//            console.log(item, state[item[0]], item[1] == state[item[0]])
//                                        return state[item[0]] != Number(item[1])  
//        zcvz
        console.log('select state...');
        var obj = nextState.population.byId[this.props.name]
        console.log(obj);
        return nextState;
    }
    
    function setState(opt) {
        console.log('values actually changed calling set state of view container... with arguments...')
        console.log(arguments);
//        this.props.store.getState();
        _.each(_.keys(opt), function(k) {
            state[k] = opt[k];
        })
        return;
    }
    
    return createComponent;
}())