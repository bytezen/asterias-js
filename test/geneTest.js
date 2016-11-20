


describe('gene', function() {
    it('can create gene with options', function(){
        var gene= createGene({min:4, max:20, level: 0.5})
        
        expect(gene.min()).toBe(4);
        expect(gene.max()).toBe(20);
        expect(gene.val()).toBe(12.0);
        expect(gene.name()).toBe("geneX");
    })
    
    it('create gene with bad levels clamped', function(){
        var gene= createGene({min:4, max:20, level: 2.0})
        
        expect(gene.min()).toBe(4);
        expect(gene.max()).toBe(20);
        expect(gene.val()).toBe(20.0);
        expect(gene.name()).toBe("geneX");
    })    
    
    it('should have initial minimum value of 0', function(){
        var gene = createGene();        
        expect(gene.min()).toBe(0);
    });
    
    it('should have initial maximum value of 0', function(){
        var gene = createGene();        
        expect(gene.max()).toBe(0);
    });
    
    it('should have initial value of 0', function(){
        var gene = createGene();        
        expect(gene.val()).toBe(0);
    });
        
    
    it('should take a minimum value', function(){
        var gene = createGene();        
        expect(gene.min(1)).toBe(1);
        
        gene.min(10);
        expect(gene.min()).toBe(10);        
    });
    
    it('should take a maximum value', function(){
        var gene = createGene();        
        expect(gene.max(99)).toBe(99);
        
        gene.max(50);
        expect(gene.max()).toBe(50);
    });            
    
    it('clamp negative levels to minimum', function(){
        var gene = createGene();
        gene.min(13);
        gene.level(-1);
        
        expect(gene.val()).toBe(13);
    })
    
    it('clamp levels above 1 to maximum', function(){
        var gene = createGene();
        gene.max(13);
        gene.level(2.0);
        
        expect(gene.val()).toBe(13);
    })
    
    it('should set a value', function(){
        var gene = createGene();
        gene.min(10); gene.max(15);
        gene.level(0.5);
        
        expect(gene.val()).toBe(12.5);
        
    })
    
    it('has default expression level of 0', function(){ 
        var gene = createGene();
        expect(gene.level()).toBe(0);
    })
    
    it('clamps expression level to 0', function(){ 
        var gene = createGene();
        gene.level(-2.0);
        expect(gene.level()).toBe(0);
    })
    
    it('clamps expression level to 1.0', function(){ 
        var gene = createGene();
        gene.level(1.5);
        expect(gene.level()).toBe(1.0);
    })
    
    it('should set and get expression level', function(){ 
        var gene = createGene();
        gene.min(10); gene.max(15);
        gene.level(0.5);
        
        expect(gene.level()).toBe(0.5);
    })
    
    it('should clamp to the minimum', function(){
        var gene = createGene();
        gene.min(0);
        gene.val(-1);
        expect(gene.val()).toBe(0);
        
        gene.min(10);
        expect(gene.val(5)).toBe(10);        
    });    
    
    it('can set name', function(){
        var gene = createGene();
        gene.name('testGene');
        
        expect(gene.name()).toBe('testGene')
    })
    
    
});