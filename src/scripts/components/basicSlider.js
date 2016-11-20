var basicSlider = (function(){
    var MIN =0, 
        MAX = 10, 
        SCALE = 1.0 / (MAX - MIN);

    var defaultProps = {name:'slider',
                        change: function(){},
                        initialize: function(){},
                        value: 0,
                        parent: undefined,
                        label: undefined
                       },
//        state = {},
        prevState = {};

    function _onChange(handler,evt){
        
        var id = ( evt.target.id && evt.target.id.length > 0 ) ?
                    evt.target.id :
                    this._component.props.name;
        
        handler({value: evt.target.value * SCALE, id: id});
    }

    //State is not needed??
//    function setState(key,val) {
//        prevState[key] = state[key];
//        state[key] = val;
//        return;
//    }

    function createComponent(props) {
        if(_.isNil(this.createSlider)) {
            throw 'looks like you are trying to create a slider outside of the p5 setup() function. This ain\'t gonna work. Try moving this component to the setup function';
        }
        props = _.defaults(props,defaultProps);
        //props.change = onChange.bind(slider);
        

        var _slider_component = {
//            setState: setState,
            props: props
        }
        
        //Create the P5 Slider with P5 DOM

        // Label it??
        var labelIt = !_.isNil(props.label) 
        if(labelIt) {
            label = createElement('label',props.label);            
        }
        
        slider = createSlider(MIN, MAX, props.value);
        slider.changed(_onChange.bind(slider,props.change))
        
        if(!_.isNil(props.parent)) {
            if(labelIt) {
                label.parent(props.parent);
            }    
            slider.parent(props.parent);
        }        
        slider._component = _slider_component;
        
        return slider;
    }
    
    return createComponent;
    
}())
