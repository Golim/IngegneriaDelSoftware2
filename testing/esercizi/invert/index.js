function k_invert(a, k){
    if(a.constructor !== Array){
        return null;
    }

    if(k > a.length){
        return null;
    }

    for(var i in a){
        if(isNaN(a[i]) || a[i] < 0){
            return null;
        }
    }

    if(isNaN(k) || k < 0){
        return null;
    }

    return a.slice(a.length - k, a.length).concat(a.slice(0, a.length - k));
}

module.exports = { invert: k_invert};