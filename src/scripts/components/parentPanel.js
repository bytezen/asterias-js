var parentPanel = function(properties){
    var defaultProps = {width: 900, 
                        height: 900, 
                        x: 50, 
                        y: 50, 
                        textSize: 18},
        props = _.defaults(defaultProps, properties),
        state = {mom: undefined, dad: undefined, organism: undefined },
        momComponent = undefined,
        dadComponent = undefined,
        childComponent = undefined
    
    function setState(params) {
        state = _.assign({},state,params,{momComponent: undefined, 
                                          dadComponent: undefined, 
                                          childComponent: undefined})
        
        if(!_.isNil(state.organism)) {
            childComponent = asteriasComponent({id:state.organism.name},
                                               bytezenAPI.compact(
                                                    state.organism.getValues())
                                              );
        }
        
        if(!_.isNil(state.mom)) {
            momComponent = asteriasComponent({id: state.mom.name},
                                            bytezenAPI.compact(
                                                state.mom.getValues()
                                            ))
        }
        
        if(!_.isNil(state.dad)) {
            dadComponent = asteriasComponent({id: state.dad.name},
                                            bytezenAPI.compact(
                                                state.dad.getValues()
                                            ))            
        }
        
        render()
    }
    
    function render() {
        push();
        textSize(props.textSize)
        textAlign(CENTER)
        rectMode(CORNERS);
        fill(100,100,0,0.75);
        rect(props.x,props.y,props.width,props.height);
        
        stroke(0,0,100)
        fill(0,0,100)
        
        if(!_.isNil(state.organism)) {
            text(state.organism.name, props.x + props.width * 0.5, 100);
        }
        if(!_.isNil(state.mom)) {
            text(state.mom.name, props.x + props.width * 0.15, 200);
        }
        if(!_.isNil(state.dad)) {
            text(state.dad.name, props.x + props.width * 0.85, 200);
        }
        pop();
        
        if(!_.isNil(childComponent)) {
            console.log('rendering child component')
            push()
            translate(props.x + props.width * 0.5, props.y + props.height * 0.5)
//            rect(50,50,300,300)
            childComponent.render()
            pop();
        }
        
        if(!_.isNil(momComponent)) {
            console.log('rendering mom component')
            push()
            translate(props.x + props.width * 0.25, props.y + props.height * 0.25)
//            rect(50,50,300,300)
            momComponent.render()
            pop();
        }
                
        if(!_.isNil(dadComponent)) {
            console.log('rendering dad component')
            push()
            translate(props.x + props.width * 0.75, props.y + props.height * 0.25)
//            rect(50,50,300,300)
            dadComponent.render()
            pop();
        }
        
        
        
    }    
    
    var component = {
        render: render
    }
    
    component.setState = setState.bind(component)
    return component 
}