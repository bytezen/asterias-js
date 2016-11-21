var asteriasComponent = function(props,opt){
    var defaultProps = {id:'asterias'+Math.random()},
        defaultState = {ring:1,
                         point:4,
                         size:100,
                         nucleus: .40,
                         pointiness:0.05,
                         brightness:230,
                         twisty:0,
                         coil: 0.0,
                         color:0,
                         shadow:20            
                        },
        defaultPrivState = {rotation:0,
                            outerOffset: 0,
                            innerOffset: 0
                           }
                                
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
    
    
    var props = _.defaults(props,defaultProps),
        state = _.defaults(opt, defaultState),
        _privState = Object.assign({},defaultPrivState,state);

    
    
    function setState(newState) {
        state = Object.assign({},state,newState);
        
        //make sure state is safe by setting the baseline for values
        state.point = Math.max(3,state.point);
        state.ring = Math.max(1, state.ring)
        state.pointiness = Math.max(.01, state.pointiness);
        
        
        _privState = Object.assign({},_privState,state);
        
//        var coilFactor;
        var coilFactor = mapval(_privState.coil,-1.0,1.0,0.0,1.0);
        console.log("coil factor = " + coilFactor)
        
        //update the ratios needed for rendering
        _privState.rotOffset = radians(360 / _privState.point)
        _privState.outerOffset = radians(-90);
        _privState.innerOffset = _privState.outerOffset+
            (_privState.rotOffset * coilFactor )
        
        return state;
    }    
    
    
    function stringRenderer() {
        console.log(props)
        _.each(state, function(v,k){console.log(k,v)});

                var verts = [];
        var theta = TAU / state.point,
            costheta = cos(theta),
            sintheta = sin(theta);
            
        
//        ellipse(0,0,state.size,state.size);
        _.each(_.range(state.point),
               function(i) {
                    verts.push([i * costheta * state.size,
                                i * sintheta * state.size])
                });

        console.log(verts)
    }
    
    function p5Renderer() {
        var rotOffset = _privState.rotOffset,
            radius = _privState.size,
            nucleus = _privState.nucleus,
            innerRadius = _privState.size * _privState.pointiness;
            outerOffset = _privState.outerOffset,
            innerOffset = _privState.innerOffset,
            brightness = _privState.brightness,
            shadow = _privState.shadow,
            ring = _privState.ring,
            twisty = _privState.twisty,
            color = _privState.color,
            t = 0.0;
        
        _.each(_.range(ring),
              function(r) {
                t = normalize(r,0.0,ring-1);
                push();
                scale( lerp(1.0, nucleus,t));
                stroke(color,80,shadow + (1-t)*brightness,100);
                fill(color,80,shadow + t*brightness);

                rotate(twisty * r)
                drawRing();
                pop();
            
        })    
            
        //draw a ring
        function drawRing() {
            beginShape();
            _.each(_.range(_privState.point),
                   function(p){
                        vertex(radius * cos(outerOffset + rotOffset * p),
                               radius * sin(outerOffset + rotOffset * p) );

                        vertex(innerRadius * cos(innerOffset + rotOffset * p),
                                innerRadius * sin(innerOffset + rotOffset * p));        
                })
            endShape(CLOSE);
        }
        
    }
    
    var render = p5Renderer; //stringRenderer;
    
    var component = {
        props: props,
        render: render
    };
    
    component.setState = setState.bind(component);
    component.render = render.bind(component);
    
    //initialize the state
    component.setState({});
    return component;
    
    
};

