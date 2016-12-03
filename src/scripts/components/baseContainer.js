//TODO: Refactor to use stamps

var baseContainer = function(props) {
    var defaultProps = {children:[], store: undefined, 
                        storeChange: undefined,
                        storeSelect: undefined
                       },
        state = {},
        shouldUpdate = false;
        
    
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
        
    function render() {
        
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
    component.shouldUpdate(true);
    
    if(_.some([component.props.store, 
               component.props.storeChange, 
               component.props.storeSelect],
              _.isNil)) {
        throw new Error("\nLooks like you are creating a container without a store, storeChange handler and/or storeSelect function...what gives?\n\n")
    }
    
    component.props.storeSelect = component.props.storeSelect.bind(component)
    component.props.storeChange = component.props.storeChange.bind(component)
    
    component.unsubscribe = observeStore(component.props.store,
                                         component.props.storeSelect,
                                         component.props.storeChange)
    
    return component;
    
}