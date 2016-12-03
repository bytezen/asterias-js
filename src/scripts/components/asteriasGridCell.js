//TODO: Refactor to use stamps

var asteriasGridCell = function(props,store) {
    var defaultProps = {children:[] 
//                        ,store: undefined
//                        ,storeChange: undefined
//                        ,storeSelect: undefined
                       },
        state = {},
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
        
        if(shouldUpdate) {
            this.render()
        }
        return this.state
    }
    
    function setProps(param) {
        this.props = Object.assign({},this.props,param)
        
        if(shouldUpdate) {
            this.render()
        }
        return this.props
    }
        
    function onStoreChangeSelect(nextState) {
        //only interested in the id that is in our asterias component
//        console.log('onStoreChangeSelect', this.props._id)
//        console.log(this.props)
//        console.log(nextState)
        return nextState.poolById[this.props._asteriasId]
    }
    
    function onStoreChangeHandler(currentState) {
//        console.log('gridCell: ' + this.props._asteriasId + ' changed...')
        return currentState;
    }
    
    
    function render() {
        _asteriasComponent.render();
    }
        
        
    var component = {
        props: defaultProps,
        state: state,
        shouldUpdate: function(bool){ shouldUpdate = bool},
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