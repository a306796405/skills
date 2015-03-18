var jQuery = function(select, context){
    jQuery.fn.init(select, context);
}

var $ = function(select, context){
    return new jQuery(select, context);
}

jQuery.fn = jQuery.prototype;

jQuery.fn.init = function(select, context){
    context = context || document;
    var i = 0,
        ele = context.querySelectorAll(select),
        len = ele.length;
    this.length = len;
    for(;i< len; i++){
        this[i] = ele[i];
    }
    return this;
}

jQuery.fn.hide = function(){
    this.each(function(i, v){
        this.style.display = "none";
    })
    return this;
}

jQuery.fn.show = function(){
    this.each(function(i, v){
        this.style['display'] = "";
    })
    return this;
}

jQuery.fn.each = function(fn){
    var i = 0, len = this.length;
    for(i= 0; i< len; i++){
        fn.call(this[i], i, this[i]);
    }
    return this;
}

jQuery.fn.eachObj = function(o,fn){
    for(var prop in o){
        fn.apply(o,[prop, o[prop]]);
    }
}

jQuery.fn.css = function(cssArray){
    var $this = this;
    jQuery.fn.eachObj(cssArray, function(prop,val){
        $this.each(function(){
            this.style[prop]= val;
        })
    })

}

jQuery.fn.click = function(fn){
    this.each(function(i, v){
        this.onclick = function(){
            fn.apply(this);
        }
    })
}

if ( typeof define === "function" && define.amd && define.amd.jQuery ) {
    define( "jquery", [], function () {
        return $;
    });
}