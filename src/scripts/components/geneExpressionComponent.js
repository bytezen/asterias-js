//state, setState, props, props.children, render

//gene expression slider is a basic slider with a gene name
// and on change inject the gene name?? and dispatch an action
// This is a slider container

var geneExpressionComponent = (function(){
    var defaultGene = createGene({min:0,max:100,val:0,name:'geneXX'})
    var defaultProps = {gene: defaultGene, expressionChange: function(){}, parent: null};


    function createComponent(opt){
        opt = _.defaults(opt, defaultProps);
        var comp = {state: getState,
                    setState: setState,
                    initialize: initialize
                   };
        console.log(opt.gene.toString())
            var state = {level: opt.gene.level()};
        _.each(_.keys(opt), function(p){
            comp[p] = opt[p]    
        })

    //    console.log(defaultGene)

        //must be called from within setup function
        function initialize() {
            slider = createSlider(this.gene.min(),
                                  this.gene.max(),
                                  this.gene.val());
            slider.changed(onChange.bind(this,this.expressionChange))
            if(this.parent != null) {
                slider.parent(this.parent);
            }        

        }

        function setState(opt) {
            var prevState = Object.assign({},state);
            state = Object.assign(state, opt);        
        }

        function getState() {
            return Object.assign({},state);
        }

        function onChange(cb,evt) {
            //create a new object from the event
            var data = {value: evt.target.value, name: this.gene.name() }
            cb(data);
        }

        return comp;
    }
    
    return createComponent;
}());

