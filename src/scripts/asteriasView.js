var store = Redux.createStore(testReducer);
var getState = store.getState,
    dispatch = store.dispatch;

var canvas, slider;
var displayList = [];

var circle = circleComponent(store, {fill:50, 
                                     cx: 190, 
                                     cy: 250 })
displayList.push(circle)

function onSliderChange(ctx,name) {
    dispatch({type: 'expression', val: slider.value()})
    console.log('onSliderChange: ' + ctx);
    console.log(name.target.id);
    console.log(getState());
}

function setup() {
    canvas = createCanvas(380,500);    
    canvas.parent("sketch");
    textSize(32);
    slider = createSlider(0,255,100);
    slider.attribute('id','gene1')
    slider.parent("ui");
    slider.changed(onSliderChange.bind(null,'foobar'))
}

function draw () {
    background(0);
    text(str, 50,200);
    _.each(displayList, function(i){i.render()});
}

var str = "Hello"

var dna = [
    {name:'ring', level: 0},
    {name:'point',level: 0},
    {name:'size', level: 0},
    {name:'pointiness', level: 0},
    {name:'brightness', level: 0},
    {name:'twisty', level: 0},
    {name:'color', level: 0},
    {name:'shadow', level: 0}
];


var component = {
    draw: function(ctx) {
        ctx.ellpise()
    }
}

var initState = {val: 0}
function testReducer(state, action) {
    switch(action.type) {
        case 'expression':
            return Object.assign({},state,{val: action.val});         
        default:
            return initState;
    }
}



dispatch({type:'expression', val:10})
console.log(store.getState());


function circleComponent(store, props) {
    props = _.defaults(props,{radius: 150, fill: 255, cx: 0, cy: 0})
    
    store.subscribe(onStoreChange)
    function onStoreChange() {
        props.radius = getState().val;
    }
    
    return {
        props: {radius: props.radius, fill: props.fill },        
        render: function() {
            push();
            fill(props.fill);
            ellipse(props.cx,props.cy,props.radius, props.radius)
            pop();
        }
    }
}

