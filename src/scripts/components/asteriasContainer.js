var asteriasContainer = function(store, asteriasComponent){
    var defaultProps = {component: undefined, store: undefined},
        defaultState = { component: undefined, id: undefined }
    
    function radians(deg) { return ( 3.14159 * deg / 180 ); }
    function normalize(val,min,max) { 
        if(max == min) { return 1.0; }
        return (val - min)/(max-min); 
    }
    
    function mapval(val,omin,omax,nmin,nmax) {
//        return 0.5;
        var t = normalize(val,omin,omax);
        console.log("mapval t = " + t);
        return t;
//        return nmin*(1-t) + nmax * t;
    }
    
    
    var props = _.defaults({component: asteriasComponent, store:store}, defaultProps),
        state = _.defaults({}, defaultState)

    

    
    function setState(newState) {
        console.log('asteriasContainer.setState');
        state = Object.assign({},state,newState);
        //make sure state is safe
        console.log(newState)
        //now push this state to the component
        updateComponent();
        return state;
    }    
    
    function updateComponent(){
        //for every property of state that is a gene expression 
        // set the corresponding component property to the value
        
        props.component.setState(state)
    }
    
    function p5Renderer() {
        if(!_.isNil(state.component)) {
            state.component.render();
        }
    }
    
    var render = p5Renderer; //stringRenderer;
    
    var component = {
        props: props,
        render: render
    };
    
    component.setState = setState.bind(component);
    component.render = render.bind(component);
    component.state = function() {
        return Object.assign({},state);
    }
    //initialize the state
    component.setState({component: props.component});
    

        if(!_.isNil(props.store)) {
        observeStore(props.store,        
                     storeChange.bind(component),
                     setState.bind(component))
    }    
    
    function storeChange(nextState) {
        console.log("...store change in asteriasContainer...get our component")
        console.log("get gene expression for our gene -- " + this.props.component.id())
        var me = this.props.component.id();
        
        console.log(nextState)        
        console.log(nextState.poolById[me])        
//        console.log(this.props)        
//        console.log(nextState.population.byId[this.props.component.props.id]);
        
//        return nextState.population.byId[this.props.component.props.id];
        return nextState.poolById[me]
    }
    
    return component;
    
    
};

