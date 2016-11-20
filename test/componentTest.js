
describe('components', function(){

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