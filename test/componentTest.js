
describe('components', function(){
    describe('base component', function(){
        var comp;
        
        var callbackObj = {
            cb: function() {}
        }
        
        var setStateObj = {
            setState: function(prevState, props) {
                return Object.assign({},prevState)
                    }
        } 
        
        beforeEach(function(){
            comp = baseComponent()
        })
        
        
        it('creates a component without props and state',function(){
            
            expect(comp.props).toExist()
            expect(comp.state).toExist()
            expect(comp.props.children).toExist()
            expect(_.isArray(comp.props.children)).toBe(true)
            expect(_.isFunction( comp.render)).toBe(true)
            expect(_.isFunction( comp.setState)).toBe(true)
        })
        
        it('create a component with properties', function() {
            comp = baseComponent({foo: 100, bar: 'baz'})
            
            expect(comp.props.foo).toExist().toBe(100);
            expect(comp.props.bar).toExist().toBe('baz');
        })
        
        it('can be created with children', function(){
            var child1 = baseComponent({foo:'you'}),
                child2 = baseComponent({bar:'me'}),
                child3 = baseComponent({baz:100}),
                comp = baseComponent({children:[child1,child2,child3]})
            
            expect(comp.props.children.length).toBe(3)
            expect(comp.props.children).toInclude(child1,'missing child1' )
                .toInclude(child2, 'missing child 2')
                .toInclude(child3, 'missing child 3')
        })
        
        it('can add children', function() {
            var child1 = baseComponent({foo:'you'}),
                child2 = baseComponent({bar:'me'}),
                child3 = baseComponent({baz:100})
            
            comp.props.children.push(child3)
            comp.props.children.push(child2)
            comp.props.children.push(child1)
            
            expect(comp.props.children.length).toBe(3)
            expect(comp.props.children).toInclude(child1,'missing child1' )
                .toInclude(child2, 'missing child 2')
                .toInclude(child3, 'missing child 3')            
        })
        
        it('can set state with an object', function() {
            var retState = comp.setState({foo:true, bar:100, baz:'lorum'})
            
            expect(comp.state).toIncludeKeys(['foo','bar','baz'])
            expect(retState).toBe(comp.state)
        })
        
        it('can set state with a callback', function() {
            var spy = expect.spyOn(callbackObj,'cb')  
            var retState = comp.setState({foo:true, bar:100, baz:'lorum'}, callbackObj.cb)
            
            expect(spy.calls.length).toBe(1)
            expect(spy.calls[0].arguments).toEqual([comp.state])
            expect(spy).toHaveBeenCalled()
            expect(retState).toBe(comp.state)
//            expect(spy).toHaveBeenCalledWith('some', 'args')

        })
        
        it('can set state with a function', function(){
            var spy = expect.spyOn(setStateObj,'setState'),
                dummyState = {foo:100},
                dummyProp = {baz:'bar'},
                comp = baseComponent(dummyProp)
                
            comp.setState(dummyState)
            var retState = comp.setState(setStateObj.setState, callbackObj.cb)
            
            expect(spy.calls.length).toBe(1)
            expect(spy.calls[0].arguments).toEqual([dummyState, comp.props])
            expect(retState).toBe(comp.state)
            expect(spy).toHaveBeenCalled()
            
        })
        
        it('setting state triggers a render when shouldUpdate is true', function(){
            var spy = expect.spyOn(comp,'render')
            comp.setState({foo:100})
            expect(spy.calls.length).toBe(1)
        })
        
        it('setting props triggers a render when shouldUpdate is true', function(){
            var spy = expect.spyOn(comp,'render')
            comp.setProps({foo:100})
            expect(spy.calls.length).toBe(1)
            
        })
        
        it('setting state does NOT trigger a render when shouldUpdate is false', function(){
            var spy = expect.spyOn(comp,'render')
            comp.shouldUpdate(false);
            comp.setState({foo:100})
            expect(spy.calls.length).toBe(0)
        })
        
        it('setting props does NOT trigger a render when shouldUpdate is false', function(){
            var spy = expect.spyOn(comp,'render')
            comp.shouldUpdate(false);
            comp.setProps({foo:100})
            expect(spy.calls.length).toBe(0)
            
        })        
        
    })
    
    describe('gene expression', function(){

        it('creates a default component with default gene', function(){
            var component = geneExpressionComponent();
            
            expect(component).toExist();
            expect(component.gene).toExist();
            expect(component.gene.val()).toBe(0);
            expect(component.gene.name()).toBe('geneXX');
            expect(component.state().level).toBe(0.0);            
            expect(component.expressionChange).toExist();
            expect(component.setState).toExist();
            expect(component.state().level).toBe(0)
        })
        
        it('initializes with gene property', function(){
            var gene = createGene({min:10,max:20,name:'foo',level: 0.2})
            var component = geneExpressionComponent({gene: gene});
            
            expect(component.gene).toExist();
            expect(component.gene.val()).toBe(12);
            expect(component.gene.name()).toBe('foo');
            expect(component.state().level).toBe(0.2);
            expect(component.expressionChange).toExist();            
        })
        
        it('initializes with callback property', function(){
            var called = false
            
            var cb = function(prev,curr) {
                called = true;
            }
            
            var component = geneExpressionComponent({expressionChange: cb})
            
            expect(component.gene).toExist();
            expect(component.gene.val()).toBe(0);
            expect(component.gene.name()).toBe('geneXX');
            expect(component.state().level).toBe(0.0);
            expect(component.expressionChange).toExist();             
                        
        })
        
        it('sets and gets state', function(){
            var called = false,
                oldState = undefined,
                newState = undefined;
            
            var cb = function(prev,curr) {
                called = true;
                oldState = prev;
                newState = curr;
            }
            
            var component = geneExpressionComponent({expressionChange: cb})
            
            expect(component.gene).toExist();
            expect(component.gene.val()).toBe(0);
            expect(component.gene.name()).toBe('geneXX');
            expect(component.state().level).toBe(0.0);
            expect(component.expressionChange).toExist();             
            
            component.setState({level: 0.75});
            
            expect(component.state().level).toBe(0.75);
            expect(called).toBeTruthy();
            expect(oldState.level).toBe(0);
            expect(newState.level).toBe(0.75);
                        
        })
        
        
    })
})