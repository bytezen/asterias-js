

describe('organism',function(){
    
    it('should be able to add a single gene', function(){
        var organism = createLife({name:'hue', min: 20, max:200})   
        expect(organism.hue).toBe.ok;        
    });
    
    it('should be able to add multiples genes', function() {
        var organism = createLife([{name:'size', min: 10, max: 50}, 
                     {name:'points', min: 4, max: 20}, 
                     {name:'petalSize', min: .1, max: .8}])
        
        expect(organism.size).toBe.ok;
        expect(organism.points).toBe.ok;
        expect(organism.petalSize).toBe.ok;
        
        expect(organism.size).toBe(10);
        expect(organism.points).toBe(4);
        expect(organism.petalSize).toBe(.1);                
    });
    
    it('should be able to access genes by name', function(){
        var organism = createLife({name: 'foo', min:0, max: 100, level: 0.5})
        
        expect(organism.gene('foo')).toBe.ok;
    });
    
    it('can set gene levels', function(){
        var organism = createLife({name: 'foo', min:0, max: 100, level: 0.5})
        
        expect(organism.foo).toBe(50);
        
        organism.fooLevel(0.25);
        expect(organism.foo).toBe(25);
        
    })
    
    it('can get gene levels', function(){
        var organism = createLife({name: 'foo', min:0, max: 100, level: 0.5})
        
        expect(organism.foo).toBe(50);
        
        expect(organism.fooLevel()).toBe(0.5);
        organism.fooLevel(0.25);
        expect(organism.fooLevel()).toBe(0.25);
        
    })    
    
})