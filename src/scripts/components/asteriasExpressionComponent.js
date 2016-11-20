//state, setState, props, props.children, render
var ringlevel = 0.2,
    pointlevel = 0.3,
    sizelevel = 0.4,
    pointinesslevel = 0.5,
    brightnesslevel = 0.6,
    twistylevel = 1.0,
    colorlevel = 0.1,
    shadowlevel = 0.0;


var asterias = createAsterias(
[
    {name:'ring', level: ringlevel},
    {name:'point',level: pointlevel},
    {name:'size', level: sizelevel},
    {name:'pointiness', level: pointinesslevel},
    {name:'brightness', level: brightnesslevel},
    {name:'twisty', level: twistylevel},
    {name:'color', level: colorlevel},
    {name:'shadow', level: shadowlevel}
])

var defaultGene = undefined;
var defaultProps = {gene: defaultGene, expressionChange: function(){}, parent: null};

var gene = createGene({min:10,max:20,name:'foo',level: 0.2})
var component = geneExpressionComponent({gene: gene});

/*
    opt.asterias,
    opt.onChange
*/
function asteriasComponent(opt){
    var props = {
            children: [],
            changeHandler: function(){},
            id: Math.random()+"",
            parent: undefined
        },
        
        comp = {
            addChild: function(c) { 
                props.children.push(c)
            },
            
            setProp: function(prop,val) {
                if(_.has(props,prop)){
                    props[prop] = val;
                }
            },
            
            initialize: initialize,
            
            render: render
            
        };
    
    //will be intializes with all props when initialized is called
    var state =  {}
//    {name:'ring', level: ringlevel},
//    {name:'point',level: pointlevel},
//    {name:'size', level: sizelevel},
//    {name:'pointiness', level: pointinesslevel},
//    {name:'brightness', level: brightnesslevel},
//    {name:'twisty', level: twistylevel},
//    {name:'color', level: colorlevel},
//    {name:'shadow', level: shadowlevel},

    
    //must be called from within setup function
    function initialize() {
        //iterate through all of the gene items and create
        _.each(props.children, function(child) {
            var slider = createSlider(child.min(), child.max(), child.val());
            slider.changed(onChange)
            slider.attribute("id", child.name()+"_"+props.id)
            if(props.parent != undefined) {
                slider.parent(props.parent);
            }     
            
            //set the state
            state[child.name()] = child.val();
        })
//        slider = createSlider(this.gene.min(),
//                              this.gene.max(),
//                              this.gene.val());
//        slider.changed(onChange.bind(this,this.expressionChange))
        
    }
    
    function setState(opt) {
        var prevState = Object.assign({},state);
        state = Object.assign(state, opt);        
    }
    
    function getState() {
        return Object.assign({},state);
    }
    
    function onChange(evt) {
        //create a new object from the event
        var data = {value: evt.target.value, name: evt.target.id }
        props.changeHandler(data);        
    }
    
    function render() {
        ellipse(0,0,state.size, state.size);
    }
    
    return comp;
}