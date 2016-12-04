//TODO: Refactor to use stamps

var asteriasGridCell = function(props,store) {
    var defaultProps = {children:[] 
//                        ,store: undefined
//                        ,storeChange: undefined
//                        ,storeSelect: undefined
                       },
        state = { mouseOver: false, 
                 mousePos: [-100,-100], 
                 mouseReleased: false,
                 fitness: 0
                },
        shouldUpdate = false,
        //use duck typing to try to id the asteriasComponent
        _asteriasComponent = _.filter(props.children,
                                  function(c){
                                    return _.has(c,['props','id'])
                                })[0];;
    
    /**
    * param is either an object nextState or function(prevState,props)
    */
    function setState(param,cb) {
        if(_.isFunction(param)) {
            this.state = param(this.state,this.props);
        } else {
            this.state = Object.assign({},this.state,param)
            if(!_.isNil(cb)) {
                cb(this.state)
            }
        }
        
        if(this.state.mouseOver && this.state.mouseClicked) {
            this.props.onClickHandler(this.props._id, this.state.mouseBtn)    
        }
        
        
        
        if(shouldUpdate) {
            this.render()
        }
        
        
        return this.state
    }
    
    function setProps(param) {
        this.props = Object.assign({},this.props,param)
            
//        console.log(param)
        
        if(shouldUpdate) {
            this.render()
        }
        return this.props
    }
        
    function onStoreChangeSelect(nextState) {
        //only interested in the id that is in our asterias component        
        return nextState.simulation.fitnessById[this.props._id]
    }
    
    function onStoreChangeHandler(currentState) {
        this.state.fitness = currentState;
        return currentState;
    }
    
    
    function render() {
//        console.log(this.id)
        _asteriasComponent.render();
        textAlign(CENTER);
        
        text(this.state.fitness,-50,-50)
        
        if(this.state.mouseOver) {
            fill(120,80,100)
            rect(20,0,30,30)
            text("+",20,0);
            
            
            fill(0,80,100)
            rect(-20,0,30,30)
            text("-",-20,0);
            
//            if(this.state.mouseClicked) {
//                text("Whoops",0,0)
//            }
        } 
    }
        
    var component = {
        props: defaultProps,
        state: state,
        shouldUpdate: function(bool){ shouldUpdate = bool},
        id: _asteriasComponent.props.id
    }
    component.setProps = setProps.bind(component)
    component.setState = setState.bind(component)
    component.render = render.bind(component)
    
    

    //override any default props with what was based in the constructor
    component.setProps(props)
    
    if(_.isNil(store)) {
        console.warn("\nLooks like you are creating a container without a store, storeChange handler and/or storeSelect function...what gives?\n\n")
    }
        

    component.setProps({_id: _asteriasComponent.props.id });
    
    component.unsubscribe = observeStore(store,
                                         onStoreChangeSelect.bind(component),
                                         onStoreChangeHandler.bind(component))    
    
    //do this last to avoid premature rendering 
    component.shouldUpdate(true);
    
    return component;
    
}