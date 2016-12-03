


describe('containers', function(){
    var initState = {foo: 0}

    function reducer(state,action) {
        console.log('calling reducer: ACTION {' + action.type + '}')
        switch(action.type) {
            case 'inc':
                return Object.assign({},state,{foo: ++state.foo});
            case 'test':
                return state
            default:
                return initState
                
        }
    }    
    
    describe('same functionality as base component', function(){
        var container, dummyStoreObj;
        
        var callbackObj = {
            cb: function() {}
        }
        
        var setStateObj = {
            setState: function(prevState, props) {
                return Object.assign({},prevState)
                    }
        } 
                
        
        
        beforeEach(function(){
            store = Redux.createStore(reducer)
            dummyStoreObj = {store: store, 
                         storeChange: _.identity,
                         storeSelect: _.identity}            
            container = baseContainer(dummyStoreObj)
        })
        
        afterEach(function() {
            container.unsubscribe();    
        })
        
        it('creates a container without props and state',function(){
            
            expect(container.props).toExist()
            expect(container.state).toExist()
            expect(container.props.children).toExist()
            expect(_.isArray(container.props.children)).toBe(true)
            expect(_.isFunction( container.render)).toBe(true)
            expect(_.isFunction( container.setState)).toBe(true)
        })
        
        it('create a container with properties', function() {
            container = baseContainer(Object.assign({foo: 100, bar: 'baz'},dummyStoreObj))
            
            expect(container.props.foo).toExist().toBe(100);
            expect(container.props.bar).toExist().toBe('baz');
        })
        
        it('can be created with components children', function(){
            var child1 = baseComponent({foo:'you'}),
                child2 = baseComponent({bar:'me'}),
                child3 = baseComponent({baz:100}),
                container = baseContainer(Object.assign({children:[child1,child2,child3]}, dummyStoreObj))
            
            expect(container.props.children.length).toBe(3)
            expect(container.props.children).toInclude(child1,'missing child1' )
                .toInclude(child2, 'missing child 2')
                .toInclude(child3, 'missing child 3')
        })
        
        it('can be created with containers children', function(){
                    var child1 = baseContainer(Object.assign({foo:'you'},
                                                             dummyStoreObj)),
                        child2 = baseContainer(Object.assign({bar:'me'},
                                                             dummyStoreObj)),
                        child3 = baseContainer(Object.assign({baz:100},
                                                             dummyStoreObj)),
                        container = baseContainer(Object.assign({children:[child1,child2,child3]},dummyStoreObj))

                    expect(container.props.children.length).toBe(3)
                    expect(container.props.children).toInclude(child1,'missing child1' )
                        .toInclude(child2, 'missing child 2')
                        .toInclude(child3, 'missing child 3')
            })
        
        it('can add children', function() {
            var child1 = baseComponent({foo:'you'}),
                child2 = baseComponent({bar:'me'}),
                child3 = baseComponent({baz:100})
            
            container.props.children.push(child3)
            container.props.children.push(child2)
            container.props.children.push(child1)
            
            expect(container.props.children.length).toBe(3)
            expect(container.props.children).toInclude(child1,'missing child1' )
                .toInclude(child2, 'missing child 2')
                .toInclude(child3, 'missing child 3')            
        })
        
        it('can set state with an object', function() {
            var retState = container.setState({foo:true, bar:100, baz:'lorum'})
            
            expect(container.state).toIncludeKeys(['foo','bar','baz'])
            expect(retState).toBe(container.state)
        })
        
        it('can set state with a callback', function() {
            var spy = expect.spyOn(callbackObj,'cb')  
            var retState = container.setState({foo:true, bar:100, baz:'lorum'}, callbackObj.cb)
            
            expect(spy.calls.length).toBe(1)
            expect(spy.calls[0].arguments).toEqual([container.state])
            expect(spy).toHaveBeenCalled()
            expect(retState).toBe(container.state)
//            expect(spy).toHaveBeenCalledWith('some', 'args')

        })
        
        it('can set state with a function', function(){
            var spy = expect.spyOn(setStateObj,'setState'),
                dummyState = {foo:100},
                dummyProp = {baz:'bar'},
                comp = baseComponent(dummyProp)
                
            container.setState(dummyState)
            var retState = container.setState(setStateObj.setState, callbackObj.cb)
            
            expect(spy.calls.length).toBe(1)
            expect(spy.calls[0].arguments).toEqual([dummyState, container.props])
            expect(retState).toBe(container.state)
            expect(spy).toHaveBeenCalled()
            
        })
        
        it('setting state triggers a render when shouldUpdate is true', function(){
            var spy = expect.spyOn(container,'render')
            container.setState({foo:100})
            expect(spy.calls.length).toBe(1)
        })
        
        it('setting props triggers a render when shouldUpdate is true', function(){
            var spy = expect.spyOn(container,'render')
            container.setProps({foo:100})
            expect(spy.calls.length).toBe(1)
            
        })
        
        it('setting state does NOT trigger a render when shouldUpdate is false', function(){
            var spy = expect.spyOn(container,'render')
            container.shouldUpdate(false);
            container.setState({foo:100})
            expect(spy.calls.length).toBe(0)
        })
        
        it('setting props does NOT trigger a render when shouldUpdate is false', function(){
            var spy = expect.spyOn(container,'render')
            container.shouldUpdate(false);
            container.setProps({foo:100})
            expect(spy.calls.length).toBe(0)
            
        })        
        
    })
    
    describe('container functionality', function(){

        var container,dispatch
        
        function onStoreChange(currState) {
            console.log('got here store changed')
            console.log(currState)
        }
        
        function storeSelect(nextState) {
//            console.log('got here store select')
            return nextState.foo
        }
                    
        
        beforeEach(function(){
            store = Redux.createStore(reducer),
            dispatch = function(action) {
                console.log('dispatching..')
                console.log(action)
                store.dispatch(action)
            }
//            container = baseContainer({store: store, 
//                                       storeChange:onStoreChange,
//                                       storeSelect: storeSelect})
                            
        })      
        
        afterEach(function(){
            container.unsubscribe();
        })
        
        
        it('can observe store', function(){
            
            container = baseContainer({store: store, 
                                       storeSelect: storeSelect,
                                       storeChange: onStoreChange})
            
            
            expect(container.props.store).toExist();
            
            dispatch({type:'test'})
            dispatch({type:'test'})
            dispatch({type:'test'})
            dispatch({type:'inc'})
            
            //you should only see one store changed message
            
//            expect(storeSelectSpy.calls.length).toBe(1)
//            expect(spy.calls[0].arguments).toEqual([container.state])

            console.log("foo= " + store.getState().foo)
            
            
        })
        
        it('can update child component state when store changes')        
        
    })
})