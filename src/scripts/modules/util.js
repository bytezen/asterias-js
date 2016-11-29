var bytezenAPI = (function() {
    /**
     * Generate all combination of arguments when given arrays or strings
     * e.g. [['Ben','Jade','Darren'],['Smith','Miller']] to [['Ben','Smith'],[..]]
     * e.g. 'the','cat' to [['t', 'c'],['t', 'a'], ...]
    **/
    function _cartesianProductOf(args) {
        if (arguments.length>1) args=_.toArray(arguments);

        // strings to arrays of letters
//        args=_.map(args, opt=>typeof opt==='string'?_.toArray(opt):opt)
        args=_.map(args, function(opt){
            return typeof opt==='string'?_.toArray(opt):opt
        })
        
        return _.reduce(args, function(a, b) {
            return _.flatten(_.map(a, function(x) {
                return _.map(b, function(y) {
                    return _.concat(x,[y]);
                });
            }), true);
        }, [ [] ]);
    }

    /** Generate all combination of arguments from objects
      *  {Object} opts    - An object or arrays with keys describing options  {firstName:['Ben','Jade','Darren'],lastName:['Smith','Miller']}
      *  {Array}        - An array of objects e.g. [{firstName:'Ben',LastName:'Smith'},{..]
      **/
    function _cartesianProductObj(optObj){
        var keys = _.keys(optObj);
        var opts = _.values(optObj);
        var combs = _cartesianProductOf(opts);
        return _.map(combs,function(comb){
            return _.zipObject(keys,comb);
        });
    }

    /**
     * Generate the cartesian product of input objects, arrays, or strings
     *
     *
     * product('me','hi')
     * // => [["m","h"],["m","i"],["e","h"],["e","i"]]
     *
     * product([1,2,3],['a','b','c']
     * // => [[1,"a"],[1,"b"],[1,"c"],[2,"a"],[2,"b"],[2,"c"],[3,"a"],[3,"b"],[3,"c"]]
     *
     * product({who:['me','you'],say:['hi','by']})
     * // => [{"who":"me","say":"hi"},{"who":"me","say":"by"},{"who":"you","say":"hi"},{"who":"you","say":"by"}]
     *
     * // It also takes in a single array of args
     * product(['me','hi'])
     * // => [["m","h"],["m","i"],["e","h"],["e","i"]]
     */
    function product(opts){
        if (arguments.length===1 && !_.isArray(opts))
            return _cartesianProductObj(opts)
        else if (arguments.length===1)
            return _cartesianProductOf(opts)
        else
            return _cartesianProductOf(arguments)
    }

    /**
     * Generate permutations, in all possible orderings, with no repeat values
     *
     *
     * permutations([1,2,3],2)
     * // => [[1,2],[1,3],[2,1],[2,3],[3,1],[3,2]
     *
     * permutations('cat',2)
     * // => [["c","a"],["c","t"],["a","c"],["a","t"],["t","c"],["t","a"]]
     */
    function permutations(obj, n){
        if (typeof obj=='string') obj = _.toArray(obj)
        n = n?n:obj.length
        // make n copies of keys/indices
        for (var j = 0, nInds=[]; j < n; j++) {nInds.push(_.keys(obj)) }
        // get product of the indices, then filter to remove the same key twice
//        var arrangements = product(nInds).filter(pair=>pair[0]!==pair[1])
        var arrangements = product(nInds).filter(function(pair){pair[0]!==pair[1]})
//        return _.map(arrangements,indices=>_.map(indices,i=>obj[i]))
        return _.map(arrangements,
                     function(indices){
                        return _.map(indices,
                                  function(i) {
                                    obj[i]
                                    }
                                 )
                    })
    }

    
    
    
    function lerp(a,b,t) {
        return (1-t)*a + b*t;
    }
    
    function norm(c,a,b) {
        if( a == b ) return 1.0;

        return (c-a)/(b-a);
    }    

    function map(v,omin,omax,nmin,nmax) {
        var t = norm(v,omin,omax);
        return lerp(nmin,nmax,t);
    }    
    
    return {
        lerp: lerp,
        norm: norm,
        map: map,
        product: product
    }
}())