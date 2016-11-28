
describe('Asterias', function() {
    var gene;
    
    var genomeConfig = asteriasAPI.genomeConfig
         
    
    beforeEach(function(){
        
    });
    
    describe('defaults', function(){
        it('has a ring gene', function(){
                var asterias = asteriasAPI.newAsterias();// createAsterias(),
                    geneName = 'ring',
                    min = genomeConfig.ring[0],
                    max = genomeConfig.ring[1]

                expect(asterias.ring).toBe.ok;
                expect(asterias.ring.value).toBe(min);        
            });

        it('has a point gene', function(){
            var asterias = asteriasAPI.newAsterias(),
                geneName = 'point';
                min = genomeConfig.point[0],
                max = genomeConfig.point[1];

            expect(asterias.point).toBe.ok;
            expect(asterias.point.value).toBe(min);      
        });

        it('has a size gene', function(){
            var asterias = asteriasAPI.newAsterias(),
                geneName = 'size';
                min = genomeConfig.size[0],
                max = genomeConfig.size[1];

            expect(asterias.size).toBe.ok;
            expect(asterias.size.value).toBe(min);        
        });

        it('has a pointiness gene', function(){
            var asterias = asteriasAPI.newAsterias(),
                geneName = 'pointiness';
                min = genomeConfig.pointiness[0],
                max = genomeConfig.pointiness[1];

            expect(asterias[geneName]).toBe.ok;
            expect(asterias[geneName].value).toBe(min);  
        });

        it('has a brightness gene', function(){
            var asterias = asteriasAPI.newAsterias(),
                geneName = 'brightness';
                min = genomeConfig.brightness[0],
                max = genomeConfig.brightness[1];

            expect(asterias[geneName]).toBe.ok;
            expect(asterias[geneName].value).toBe(min); 
        });

        it('has a twisty gene', function(){
            var asterias = asteriasAPI.newAsterias(),
                geneName = 'twisty';
                min = genomeConfig.twisty[0],
                max = genomeConfig.twisty[1];

            expect(asterias[geneName]).toBe.ok;
            expect(asterias[geneName].value).toBe(min);      
        });

        it('has a color gene', function(){
            var asterias = asteriasAPI.newAsterias(),
                geneName = 'color';
                min = genomeConfig.color[0],
                max = genomeConfig.color[1];

            expect(asterias[geneName]).toBe.ok;
            expect(asterias[geneName].value).toBe(min);      
        })

        it('has a shadow gene', function(){
            var asterias = asteriasAPI.newAsterias(),
                geneName = 'shadow';
                min = genomeConfig.shadow[0],
                max = genomeConfig.shadow[1];

            expect(asterias[geneName]).toBe.ok;
            expect(asterias[geneName].value).toBe(min);
        });    


    })
    
    
    describe('overrides', function(){
        it('override ring gene values', function(){
                var geneName = 'ring', min = 10, max = 20;
                var asterias = createAsterias({name:geneName, min: min, max: max, level: 0.2})
                
                expect(asterias[geneName]).toBe.ok;

                expect(asterias[geneName]).toBe(12);
            
                asterias[geneName+'Level'](0.0);
                expect(asterias[geneName]).toBe(min); 
            
                asterias[geneName+'Level'](1.0);
                expect(asterias[geneName]).toBe(max); 
            
            });

        it('override point gene values', function(){
                var geneName = 'point', min = 10, max = 20;
                var asterias = createAsterias({name:geneName, min: min, max: max, level: 0.2})
                
                expect(asterias[geneName]).toBe.ok;

                expect(asterias[geneName]).toBe(12);
            
                asterias[geneName+'Level'](0.0);
                expect(asterias[geneName]).toBe(min); 
            
                asterias[geneName+'Level'](1.0);
                expect(asterias[geneName]).toBe(max);  
        });

        it('override size gene values', function(){
                var geneName = 'size', min = 10, max = 20;
                var asterias = createAsterias({name:geneName, min: min, max: max, level: 0.2})
                
                expect(asterias[geneName]).toBe.ok;

                expect(asterias[geneName]).toBe(12);
            
                asterias[geneName+'Level'](0.0);
                expect(asterias[geneName]).toBe(min); 
            
                asterias[geneName+'Level'](1.0);
                expect(asterias[geneName]).toBe(max);       
        });

        it('override pointiness gene values', function(){
                var geneName = 'pointiness', min = 10, max = 20;
                var asterias = createAsterias({name:geneName, min: min, max: max, level: 0.2})
                
                expect(asterias[geneName]).toBe.ok;

                expect(asterias[geneName]).toBe(12);
            
                asterias[geneName+'Level'](0.0);
                expect(asterias[geneName]).toBe(min); 
            
                asterias[geneName+'Level'](1.0);
                expect(asterias[geneName]).toBe(max);        
        });

        it('override brightness gene values', function(){
                var geneName = 'brightness', min = 10, max = 20;
                var asterias = createAsterias({name:geneName, min: min, max: max, level: 0.2})
                
                expect(asterias[geneName]).toBe.ok;

                expect(asterias[geneName]).toBe(12);
            
                asterias[geneName+'Level'](0.0);
                expect(asterias[geneName]).toBe(min); 
            
                asterias[geneName+'Level'](1.0);
                expect(asterias[geneName]).toBe(max);        
        });

        it('override twisty gene values', function(){
                var geneName = 'twisty', min = 10, max = 20;
                var asterias = createAsterias({name:geneName, min: min, max: max, level: 0.2})
                
                expect(asterias[geneName]).toBe.ok;

                expect(asterias[geneName]).toBe(12);
            
                asterias[geneName+'Level'](0.0);
                expect(asterias[geneName]).toBe(min); 
            
                asterias[geneName+'Level'](1.0);
                expect(asterias[geneName]).toBe(max);      
        });

        it('override color gene values', function(){
                var geneName = 'color', min = 10, max = 20;
                var asterias = createAsterias({name:geneName, min: min, max: max, level: 0.2})
                
                expect(asterias[geneName]).toBe.ok;

                expect(asterias[geneName]).toBe(12);
            
                asterias[geneName+'Level'](0.0);
                expect(asterias[geneName]).toBe(min); 
            
                asterias[geneName+'Level'](1.0);
                expect(asterias[geneName]).toBe(max);        
        })

        it('override shadow gene values', function(){
                var geneName = 'shadow', min = 10, max = 20;
                var asterias = createAsterias({name:geneName, min: min, max: max, level: 0.2})
                
                expect(asterias[geneName]).toBe.ok;

                expect(asterias[geneName]).toBe(12);
            
                asterias[geneName+'Level'](0.0);
                expect(asterias[geneName]).toBe(min); 
            
                asterias[geneName+'Level'](1.0);
                expect(asterias[geneName]).toBe(max);   
        });    

    })    
    
    
    describe('custom organism', function(){
        it('set baseline expression levels', function(){               
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
                    {name:'shadow', level: shadowlevel},
                    
                ])

                expect(asterias.ring)
                    .toBe(lerp(genomeConfig.minring,
                             genomeConfig.maxring,
                             ringlevel));
            
                expect(asterias.point)
                    .toBe(lerp(genomeConfig.minpoint,
                             genomeConfig.maxpoint,
                             pointlevel));

                                    
                expect(asterias.size)
                    .toBe(lerp(genomeConfig.minsize,
                             genomeConfig.maxsize,
                             sizelevel));
            
                expect(asterias.pointiness)
                    .toBe(lerp(genomeConfig.minpointiness,
                             genomeConfig.maxpointiness,
                             pointinesslevel));
                        
                expect(asterias.brightness)
                    .toBe(lerp(genomeConfig.minbrightness,
                             genomeConfig.maxbrightness,
                             brightnesslevel));
            
                expect(asterias.twisty)
                    .toBe(lerp(genomeConfig.mintwisty,
                             genomeConfig.maxtwisty,
                             twistylevel));

                expect(asterias.color)
                    .toBe(lerp(genomeConfig.mincolor,
                             genomeConfig.maxcolor,
                             colorlevel));
            
                expect(asterias.shadow)
                    .toBe(lerp(genomeConfig.minshadow,
                             genomeConfig.maxshadow,
                             shadowlevel));
            });
    
        it('extract gene objects for each trait', function(){
                    var geneticCode = [
                        {name:'ring', level: 0.2},
                        {name:'point',level: 0.3},
                        {name:'size', level: 0.4},
                        {name:'pointiness', level: 0.5},
                        {name:'brightness', level: 0.6},
                        {name:'twisty', level: 1.0},
                        {name:'color', level: 0.1},
                        {name:'shadow', level: 0.0},
                    ];

                    var asterias = createAsterias(geneticCode);

                    var gene = asterias.getGene('ring');
                    expect(gene.name()).toBe('ring');
                    expect(gene.level()).toBe(0.2);
                    expect(gene.min()).toBe(genomeConfig.minring);
                    expect(gene.max()).toBe(genomeConfig.maxring);
            
                    var gene = asterias.getGene('point');
                    expect(gene.name()).toBe('point');
                    expect(gene.level()).toBe(0.3);
                    expect(gene.min()).toBe(genomeConfig.minpoint);
                    expect(gene.max()).toBe(genomeConfig.maxpoint);
            
                    var gene = asterias.getGene('size');
                    expect(gene.name()).toBe('size');
                    expect(gene.level()).toBe(0.4);
                    expect(gene.min()).toBe(genomeConfig.minsize);
                    expect(gene.max()).toBe(genomeConfig.maxsize);

                    var gene = asterias.getGene('pointiness');
                    expect(gene.name()).toBe('pointiness');
                    expect(gene.level()).toBe(0.5);
                    expect(gene.min()).toBe(genomeConfig.minpointiness);
                    expect(gene.max()).toBe(genomeConfig.maxpointiness);


                    var gene = asterias.getGene('brightness');
                    expect(gene.name()).toBe('brightness');
                    expect(gene.level()).toBe(0.6);
                    expect(gene.min()).toBe(genomeConfig.minbrightness);
                    expect(gene.max()).toBe(genomeConfig.maxbrightness);

                    var gene = asterias.getGene('twisty');
                    expect(gene.name()).toBe('twisty');
                    expect(gene.level()).toBe(1.0);
                    expect(gene.min()).toBe(genomeConfig.mintwisty);
                    expect(gene.max()).toBe(genomeConfig.maxtwisty);


                    var gene = asterias.getGene('color');
                    expect(gene.name()).toBe('color');
                    expect(gene.level()).toBe(0.1);
                    expect(gene.min()).toBe(genomeConfig.mincolor);
                    expect(gene.max()).toBe(genomeConfig.maxcolor);


                    var gene = asterias.getGene('shadow');
                    expect(gene.name()).toBe('shadow');
                    expect(gene.level()).toBe(0.0);
                    expect(gene.min()).toBe(genomeConfig.minshadow);
                    expect(gene.max()).toBe(genomeConfig.maxshadow);

        })
    
    })
})