//TODO: Refactor to use Stamps

var baseComponent = function(props) {
    var defaultProps = {children:[]},
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
        shouldUpdate: function(bool){ shouldUpdate = bool}
    }
    
    component.setProps = setProps.bind(component)
    component.setState = setState.bind(component)
    component.render = render.bind(component)
    
    component.setProps(props)
    component.shouldUpdate(true);
    
    return component;
    
}